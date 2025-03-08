const { zokou } = require('../framework/zokou');

zokou({ nomCom: 'ticket_bet', reaction: '🎫', categorie: 'NEO_GAMES🎰' }, async (dest, zk, { repondre }) => {
    const ticket = `.            *⌬𝗡Ξ𝗢𝘃𝗲𝗿𝘀𝗲 𝗕𝗘𝗧🎰*
▔▔▔▔▔▔▔▔▔▔▔▔▔░▒▒▒▒░░▒░

*👥Parieur*: [Nom du parieur]
*🛡️Modérateur*: [Nom du modérateur]
*💰Somme misée*: [Montant de la mise]🧭

*📜Liste des paris placés*:
 ➤ [Valeur du pari 1] × [Cote du pari 1]
➤ [Valeur du pari 2] × [Cote du pari 2]
➤ [Valeur du pari 3] × [Cote du pari 3]


*💰Gains Possibles*: [Montant des gains possibles]🧭
═══════════░▒▒▒▒░░▒░
                  *🔷𝗡Ξ𝗢𝗚𝗮𝗺𝗶𝗻𝗴🎮*`;

    repondre(ticket);
});
