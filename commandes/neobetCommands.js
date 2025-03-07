const { zokou } = require('../framework/zokou');
const { createNeoBetsTable, addOrUpdateBet, getBet, updateTextValue, updateNumericValue, updatePari, clearBet } = require('./neobetDB');

createNeoBetsTable();

zokou({ nomCom: 'neobet', reaction: '🎰', categorie: 'NEO_GAMES🎰' }, async (dest, zk, { repondre, arg, ms }) => {
    if (arg.length < 3) return repondre('Format: neobet parieur =/add/supp <nom_parieur>');

    const [_, signe, ...texte] = arg;
    const result = await updateTextValue(texte.join(' '), 'parieur', signe, texte);
    repondre(result);
});

zokou({ nomCom: 'neobet', reaction: '🎰', categorie: 'NEO_GAMES🎰' }, async (dest, zk, { repondre, arg, ms }) => {
    if (arg.length < 4) return repondre('Format: neobet <nom_parieur> modo =/add/supp <nom_moderateur>');

    const [parieur, _, signe, ...texte] = arg;
    const result = await updateTextValue(parieur, 'moderateur', signe, texte);
    repondre(result);
});

zokou({ nomCom: 'neobet', reaction: '🎰', categorie: 'NEO_GAMES🎰' }, async (dest, zk, { repondre, arg, ms }) => {
    if (arg.length < 4) return repondre('Format: neobet <nom_parieur> mise =/+/- <montant>');

    const [parieur, _, signe, valeur] = arg;
    const result = await updateNumericValue(parieur, 'mise', signe, valeur);
    repondre(result);
});

zokou({ nomCom: 'neobet', reaction: '🎰', categorie: 'NEO_GAMES🎰' }, async (dest, zk, { repondre, arg, ms }) => {
    if (arg.length < 5) return repondre('Format: neobet <nom_parieur> pari1 =/add/supp <valeur> <cote>');

    const [parieur, pariIndexStr, signe, valeur, cote] = arg;
    const pariIndex = parseInt(pariIndexStr.replace('pari', '')) - 1;

    const result = await updatePari(parieur, pariIndex, valeur, cote);
    repondre(result);
});

zokou({ nomCom: 'neobet', reaction: '🎰', categorie: 'NEO_GAMES🎰' }, async (dest, zk, { repondre, arg, ms }) => {
    if (arg.length < 5) return repondre('Format: neobet <nom_parieur> pari1 statut =/add/supp echec/victoire');

    const [parieur, pariIndexStr, _, signe, statut] = arg;
    const pariIndex = parseInt(pariIndexStr.replace('pari', '')) - 1;

    const result = await updatePari(parieur, pariIndex, null, null, statut);
    repondre(result);
});

zokou({ nomCom: 'neobet', reaction: '🎰', categorie: 'NEO_GAMES🎰' }, async (dest, zk, { repondre, arg, ms }) => {
    if (arg.length < 1) return repondre('Format: neobet <nom_parieur>');

    const parieur = arg[0].trim();
    const bet = await getBet(parieur);
    if (!bet) return repondre('Aucun pari trouvé pour ce parieur.');

    const parisList = bet.paris.map((p, i) => {
        const statut = p.statut ? (p.statut === 'victoire' ? '✅' : '❌') : '';
        return `➤ ${statut} ${p.valeur} × ${p.cote}`;
    }).join('\n');

    const message = `.        *⌬𝗡Ξ𝗢𝘃𝗲𝗿𝘀𝗲 𝗕𝗘𝗧🎰*
        ▔▔▔▔▔▔▔▔▔▔▔▔▔░▒▒▒▒░░▒░
        *👥Parieur*: ${bet.parieur}
        *🛡️Modérateur*: ${bet.moderateur}
        *💰Somme misée*: ${bet.mise}🧭

        📜 Liste des paris placés :
        ${parisList}

        *💰Gains Possibles*: ${bet.gains_possibles}🧭
        ═══════════░▒▒▒▒░░▒░        *🔷𝗡Ξ𝗢𝗚𝗮𝗺𝗶𝗻𝗴🎮*`;
    repondre(message);
});

zokou({ nomCom: 'clear_bet', reaction: '🧹', categorie: 'Other' }, async (dest, zk, { repondre, arg, ms, auteurMessage }) => {
    if (arg.length < 1) return repondre('Format: clear_bet <nom_parieur> ou clear_bet all');

    const parieur = arg[0].trim();
    await zk.sendMessage(dest, { text: 'Êtes-vous sûr de vouloir supprimer ce(s) pari(s) ? Répondez par "oui" ou "non".' }, { quoted: ms });

    const rep = await zk.awaitForMessage({ sender: auteurMessage, chatJid: dest, timeout: 60000 });
    let confirmation;
    try {
        confirmation = rep.message.extendedTextMessage.text;
    } catch {
        confirmation = rep.message.conversation;
    }

    if (!rep || confirmation.toLowerCase() !== 'oui') {
        return repondre('Suppression annulée.');
    }

    const result = await clearBet(parieur);
    repondre(result);
});
