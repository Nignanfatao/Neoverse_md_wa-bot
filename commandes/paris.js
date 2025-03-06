const { zokou } = require('../framework/zokou');
const { insertParieur, updateModerateur, updateSommeMisee, addPari, getData, deleteData, deleteAllData } = require('../bdd/paris');

const Groupe_ID = '120363024647909493@g.us';

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
*💰Somme misée*: ${somme_misee}🧭

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

        if (arg.length < 1) return repondre('Format: neobet <parieur = |modo = |mise = |pari1 = |pari2 = |...> [valeurs] ou neobet <nom_du_parieur>');

        const commandes = arg.join(' ').split(/(?<!\w)\s*=\s*/); // Sépare les commandes et les valeurs
        const nomParieur = commandes[0].trim(); // Le premier élément est toujours le nom du parieur

        if (commandes.length === 1) {
            const data = await getData(nomParieur);
            if (!data) return repondre(`Aucun pari trouvé pour le parieur ${nomParieur}.`);
            repondre(afficherFiche(nomParieur, data));
            return;
        }

        for (let i = 1; i < commandes.length; i++) {
            const [cmd, valeur] = commandes[i].split(/\s+(.*)/); // Sépare la commande et la valeur
            const cmdNormalisee = cmd.trim().toLowerCase();

            if (cmdNormalisee === 'parieur') {
                const nomParieur = valeur.trim();
                await insertParieur(nomParieur);
                repondre(`Parieur ${nomParieur} ajouté.`);
            } else if (cmdNormalisee === 'modo') {
                const nomModerateur = valeur.trim();
                await updateModerateur(nomParieur, nomModerateur);
                repondre(`Modérateur ${nomModerateur} ajouté pour ${nomParieur}.`);
            } else if (cmdNormalisee === 'mise') {
                const sommeMisee = parseFloat(valeur.trim());
                await updateSommeMisee(nomParieur, sommeMisee);
                repondre(`Somme misée ${sommeMisee} ajoutée pour ${nomParieur}.`);
            } else if (cmdNormalisee.startsWith('pari')) {
                const [nomPari, cote] = valeur.trim().split(/\s+(.*)/);
                await addPari(nomParieur, nomPari, parseFloat(cote));
                repondre(`Pari ${nomPari} ×${cote} ajouté pour ${nomParieur}.`);
            } else {
                repondre(`Commande "${cmdNormalisee}" non reconnue.`);
            }
        }
    }
);

zokou(
  { 
    nomCom: "clear_bet", 
    reaction: "🧹", 
    categorie: "Other" 
  },
    async (dest, zk, { repondre, arg, ms, auteurMessage }) => {
        if (dest !== Groupe_ID) {
            return repondre('Cette commande est uniquement disponible dans un groupe spécifique.');
        }

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

        if (arg[0] && arg[0].toLowerCase() === 'all') {
            await deleteAllData();
            repondre('✅ Tous les paris ont été supprimés.');
        } else {
            const parieur = arg[0];
            if (!parieur) return repondre('Veuillez spécifier un parieur ou utiliser "clear_bet all".');
            await deleteData(parieur);
            repondre(`✅ Pari de ${parieur} a été supprimé.`);
        }
    }
);
