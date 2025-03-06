const { zokou } = require('../framework/zokou');
const { insertParieur, updateModerateur, updateSommeMisee, addPari, getData, deleteData, deleteAllData } = require('../bdd/paris');

const Groupe_ID = 'votre_groupe_id_ici';

function calculerGains(sommeMisee, cotes) {
    return cotes.reduce((total, cote) => total + sommeMisee * cote, 0);
}

function afficherFiche(parieur, data) {
    const { moderateur, somme_misee, paris_places } = data;
    const listeParis = paris_places.map((p, index) => {
        const statut = p.statut === "victoire" ? "✅" : p.statut === "échec" ? "❌" : "";
        return `➤ ${statut} ${p.nom} ×${p.cote}`;
    }).join("\n");

    const gainsPossibles = calculerGains(somme_misee, paris_places.map(p => p.cote));

    return `
        *⌬𝗡Ξ𝗢𝘃𝗲𝗿𝘀𝗲 𝗕𝗘𝗧🎰*
▔▔▔▔▔▔▔▔▔▔▔▔▔░▒▒▒▒░░▒░
*👥Parieur*: ${parieur}
*🛡️Modérateur*: ${moderateur}
*💰Somme misée*: ${somme_misee}

📜 Liste des paris placés :
${listeParis}

*🏧Gains Possibles*: ${gainsPossibles}

═══════════░▒▒▒▒░░▒░
       *🔷𝗡Ξ𝗢𝗚𝗮𝗺𝗶𝗻𝗴 2025🎮*
    `;
}

zokou(
  { 
    nomCom: "neobet", 
    reaction: "🎰", 
    categorie: "NEO_GAMES🎰" 
  },
    async (dest, zk, { repondre, arg, ms, auteurMessage }) => {
        if (dest !== Groupe_ID) {
            return repondre('Cette commande est uniquement disponible dans un groupe spécifique.');
        }

        if (arg.length < 1) return repondre('Format: neobet <parieur|modo|mise|pari> [valeurs]');

        const commande = arg[0].toLowerCase();
        const parieur = arg[1];

        if (commande === 'parieur') {
            const nomParieur = arg.slice(2).join(' ');
            await insertParieur(nomParieur);
            repondre(`Parieur ${nomParieur} ajouté.`);
        } else if (commande === 'modo') {
            const nomModerateur = arg.slice(2).join(' ');
            await updateModerateur(parieur, nomModerateur);
            repondre(`Modérateur ${nomModerateur} ajouté pour ${parieur}.`);
        } else if (commande === 'mise') {
            const sommeMisee = parseFloat(arg[2]);
            await updateSommeMisee(parieur, sommeMisee);
            repondre(`Somme misée ${sommeMisee} ajoutée pour ${parieur}.`);
        } else if (commande === 'pari') {
            const nomPari = arg.slice(2, -1).join(' ');
            const cote = parseFloat(arg[arg.length - 1]);
            await addPari(parieur, nomPari, cote);
            repondre(`Pari ${nomPari} ×${cote} ajouté pour ${parieur}.`);
        } else if (commande === 'clear_bet') {
            await zk.sendMessage(dest, { text: 'Êtes-vous sûr de vouloir supprimer ce(s) pari(s) ? Répondez par "oui" ou "non".' }, { quoted: ms });
            const rep = await zk.awaitForMessage({
                sender: auteurMessage,
                chatJid: dest,
                timeout: 60000
            });

            let confirmation;
            try {
                confirmation = rep.message.extendedTextMessage.text;
            } catch {
                confirmation = rep.message.conversation;
            }

            if (!rep) {
                return repondre('Temps écoulé. Suppression annulée.');
            }

            if (confirmation.toLowerCase() !== 'oui') {
                return repondre('Suppression annulée.');
            }

            if (parieur.toLowerCase() === 'all') {
                await deleteAllData();
                repondre('✅ Tous les paris ont été supprimés.');
            } else {
                await deleteData(parieur);
                repondre(`✅ Pari de ${parieur} a été supprimé.`);
            }
        } else {
            const data = await getData(parieur);
            if (!data) return repondre('Aucun pari trouvé pour ce parieur.');
            repondre(afficherFiche(parieur, data));
        }
    }
);
