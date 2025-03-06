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

        if (arg.length < 1) return repondre('Format: neobet <parieur=|modo=|mise=|pari=> [valeurs]');

        const commande = arg[0].toLowerCase();

        if (!commande.includes('=')) {
            return repondre('Format incorrect. Utilisez "=" pour séparer la commande des valeurs. Exemple: neobet parieur=JohnDoe');
        }

        const [cmd, valeur] = commande.split('=');

        if (cmd === 'parieur') {
            const nomParieur = valeur.trim();
            await insertParieur(nomParieur);
            repondre(`Parieur ${nomParieur} ajouté.`);
        } else if (cmd === 'modo') {
            const nomModerateur = valeur.trim();
            await updateModerateur(arg[1], nomModerateur);
            repondre(`Modérateur ${nomModerateur} ajouté pour ${arg[1]}.`);
        } else if (cmd === 'mise') {
            const sommeMisee = parseFloat(valeur.trim());
            await updateSommeMisee(arg[1], sommeMisee);
            repondre(`Somme misée ${sommeMisee} ajoutée pour ${arg[1]}.`);
        } else if (cmd === 'pari') {
            const [nomPari, cote] = valeur.trim().split(' ');
            await addPari(arg[1], nomPari, parseFloat(cote));
            repondre(`Pari ${nomPari} ×${cote} ajouté pour ${arg[1]}.`);
        } else {
            const data = await getData(arg[1]);
            if (!data) return repondre('Aucun pari trouvé pour ce parieur.');
            repondre(afficherFiche(arg[1], data));
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
