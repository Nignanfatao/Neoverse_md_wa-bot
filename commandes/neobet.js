const { zokou } = require('../framework/zokou');
const { getBetData, updateBetData, clearBetData, addBetData } = require('../bdd/neobet');
const s = require("../set");
const dbUrl = s.DB;
const { Pool } = require('pg');

zokou(
  { nomCom: 'neobet', reaction: '🎰', categorie: 'NEO_GAMES🎰' },
  async (dest, zk, { repondre, arg, ms, superUser }) => {
    const [action, parieur, operation, ...values] = arg;

    try {
      if (!action) {
        return repondre('Format: neobet [nom du parieur] [action] [valeurs]');
      }

      if (action === 'add') {
        const newId = await addBetData(parieur, 'aucun', 0);
        return repondre(`Nouveau parieur ajouté avec l'ID : ${newId}`);
      }

      if (action === 'get') {
        const data = await getBetData(parieur);
        if (!data) return repondre('Aucune fiche de pari trouvée pour ce parieur.');

        const gainsPossibles = data.pari1.cote * data.mise + data.pari2.cote * data.mise + data.pari3.cote * data.mise;

        const mesg = `.        *⌬𝗡Ξ𝗢𝘃𝗲𝗿𝘀𝗲 𝗕𝗘𝗧🎰*
          ▔▔▔▔▔▔▔▔▔▔▔▔▔░▒▒▒▒░░▒░
          *👥Parieur*: ${data.parieur}
          *🛡️Modérateur*: ${data.moderateur}
          *💰Somme misée*: ${data.mise}🧭

          📜 Liste des paris placés :
          ➤ ${data.pari1.statut || ''} ${data.pari1.valeur} × ${data.pari1.cote}
          ➤ ${data.pari2.statut || ''} ${data.pari2.valeur} × ${data.pari2.cote}
          ➤ ${data.pari3.statut || ''} ${data.pari3.valeur} × ${data.pari3.cote}

          *💰Gains Possibles*: ${gainsPossibles}🧭
          ▔▔▔▔▔▔▔▔▔▔▔▔▔░▒▒▒▒░░▒░      *🔷𝗡Ξ𝗢𝗚𝗮𝗺𝗶𝗻𝗴🎮*
        `;

        return zk.sendMessage(dest, { text: mesg }, { quoted: ms });
      }

      if (operation === '=' || operation === '+' || operation === '-') {
        if (!superUser) return repondre('Seuls les modérateurs peuvent modifier les fiches de pari.');

        const updates = {};
        switch (action) {
          case 'parieur':
            updates.parieur = values.join(' ');
            break;
          case 'modo':
            updates.moderateur = values.join(' ');
            break;
          case 'mise':
            updates.mise = eval(`${data.mise || 0} ${operation} ${values[0]}`);
            break;
          case 'pari1':
          case 'pari2':
          case 'pari3':
            updates[action] = { valeur: values[0], cote: values[1] };
            break;
          case 'statut':
            updates[values[0]] = { statut: values[1] === 'victoire' ? '✅' : '❌' };
            break;
          default:
            return repondre('Action non reconnue.');
        }

        await updateBetData(parieur, updates);
        return repondre('Fiche de pari mise à jour avec succès.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      repondre('Une erreur est survenue.');
    }
  }
);

zokou(
  { nomCom: 'clear_bet', reaction: '🧹', categorie: 'Other' },
  async (dest, zk, { repondre, arg, ms, auteurMessage }) => {
    if (arg.length < 1) return repondre('Format: clear_bet [nom du parieur ou ID] ou "all" pour tout supprimer.');

    const target = arg[0].trim();

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

    if (!rep || confirmation.toLowerCase() !== 'oui') {
      return repondre('Suppression annulée.');
    }

    if (target.toLowerCase() === 'all') {
      await clearBetData('all');
      return repondre('✅ Toutes les fiches de pari ont été supprimées.');
    } else {
      await clearBetData(target);
      return repondre(`✅ Fiche de pari de ${target} supprimée.`);
    }
  }
);
