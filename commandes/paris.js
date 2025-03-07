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

async function processUpdates(arg, nomParieur) {
    const updates = [];
    let i = 0;

    while (i < arg.length) {
        const [object, signe, valeur] = [arg[i], arg[i + 1], arg[i + 2]];
        let texte = [];
        i += 2;

        while (i < arg.length && !['modo', 'mise', 'pari'].includes(arg[i])) {
            texte.push(arg[i]);
            i++;
        }

        const newValue = await calculateNewValue(object, signe, valeur, texte, nomParieur);
        updates.push({ object, newValue });
    }

    return updates;
}

async function calculateNewValue(object, signe, valeur, texte, nomParieur) {
    const data = await getData(nomParieur);
    let newValue;

    if (object === 'modo') {
        if (signe === '=') {
            newValue = texte.join(' ');
            await updateModerateur(nomParieur, newValue);
        } else {
            throw new Error('Opération non supportée pour le modérateur.');
        }
    } else if (object === 'mise') {
        const sommeMisee = data.somme_misee || 0;
        if (signe === '+') {
            newValue = sommeMisee + parseFloat(valeur);
        } else if (signe === '-') {
            newValue = sommeMisee - parseFloat(valeur);
        } else if (signe === '=') {
            newValue = parseFloat(valeur);
        } else {
            throw new Error('Opération non supportée pour la mise.');
        }
        await updateSommeMisee(nomParieur, newValue);
    } else if (object === 'pari') {
        const nomPari = texte.join(' ');
        const cote = parseFloat(valeur);
        await addPari(nomParieur, nomPari, cote);
        newValue = `Pari ${nomPari} ×${cote} ajouté`;
    } else {
        throw new Error('Commande non reconnue.');
    }

    return newValue;
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

        if (arg.length < 1) return repondre('Format: neobet <parieur> [modo <opération> <valeur>] [mise <opération> <valeur>] [pari <nom_du_pari> <cote>]');

        const nomParieur = arg[0];
        const commandes = arg.slice(1);

        if (commandes.length === 0) {
            const data = await getData(nomParieur);
            if (!data) return repondre(`Aucun pari trouvé pour le parieur ${nomParieur}.`);
            repondre(afficherFiche(nomParieur, data));
            return;
        }

        try {
            const updates = await processUpdates(commandes, nomParieur);
            const messages = updates.map(update => `⚙ ${update.object}: ${update.newValue}`).join('\n');
            repondre(`Données mises à jour pour ${nomParieur}:\n${messages}`);
        } catch (error) {
            repondre(`Erreur: ${error.message}`);
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
