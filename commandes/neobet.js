const { zokou } = require('../framework/zokou');
const { getData, calculerStatutFinal, updatePlayerData, supprimerFiche, supprimerToutesLesFiches } = require('../bdd/neobet');
const s = require('../set');

// Fonction pour normaliser le texte
function normalizeText(text) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Fonction pour calculer les gains possibles
function calculerGains(mise, cotes) {
  return mise * cotes.reduce((total, cote) => total + cote, 0);
}

// Fonction pour afficher la fiche de pari
async function afficherFiche(parieur) {
  const fiche = await getData(parieur);
  if (!fiche) return 'Aucune fiche de pari trouvée pour ce parieur.';

  const gains = calculerGains(fiche.mise, [fiche.cote1, fiche.cote2, fiche.cote3]);

  return `
⌬𝗡Ξ𝗢𝘃𝗲𝗿𝘀𝗲 𝗕𝗘𝗧🎰 ▔▔▔▔▔▔▔▔▔▔▔▔▔░▒▒▒▒░░▒░
👥Parieur: ${fiche.parieur}
🛡️Modérateur: ${fiche.modo}
💰Somme misée: ${fiche.mise}🧭

📜 Liste des paris placés:
➤ ${fiche.statut1} ${fiche.pari1} × ${fiche.cote1}
➤ ${fiche.statut2} ${fiche.pari2} × ${fiche.cote2}
➤ ${fiche.statut3} ${fiche.pari3} × ${fiche.cote3}

🏧Gains Possibles: ${gains}

⌬Statut Final: ${fiche.statut_final}

═══════════░▒▒▒▒░░▒░ 🔷𝗡Ξ𝗢𝗚𝗮𝗺𝗶𝗻𝗴 2025🎮
    `;
}

// Fonction pour analyser les arguments
function analyserArguments(arg) {
  const [action, parieur, operation, valeur] = arg;

  if (action === 'parieur' && operation === '=') {
    return { action, parieur: valeur };
  } else if (action === 'modo' && operation === '=') {
    return { action, parieur, modo: valeur };
  } else if (action === 'mise' && (operation === '+' || operation === '-' || operation === '=')) {
    return { action, parieur, signe: operation, montant: parseFloat(valeur) };
  } else if (action.startsWith('pari')) {
    const pariNum = action.replace('pari', '');
    const [pari, cote] = valeur.split(' ');
    return { action: 'pari', parieur, pariNum, pari, cote: parseFloat(cote) };
  } else if (action === 'statut') {
    const [pariNum, statut] = operation.split('');
    return { action, parieur, pariNum, statut };
  } else {
    return { action: 'afficher', parieur: action };
  }
}

// Commande neobet
zokou(
  { 
    nomCom: "neobet", 
    reaction: "🎰", 
    categorie: "NEO_GAMES🎰" 
  },
  async (dest, zk, { repondre, arg, ms, superUser }) => {
    if (!arg || arg.length === 0) return repondre('Format: neobet <parieur> <operation> <valeur>');

    const args = analyserArguments(arg);

    try {
      if (args.action === 'parieur') {
        await updatePlayerData([{ colonneObjet: 'parieur', newValue: args.parieur }], args.parieur);
        repondre(`Parieur ${args.parieur} ajouté avec succès.`);
      } else if (args.action === 'modo') {
        await updatePlayerData([{ colonneObjet: 'modo', newValue: args.modo }], args.parieur);
        repondre(`Modérateur ${args.modo} ajouté pour ${args.parieur}.`);
      } else if (args.action === 'mise') {
        const query = args.signe === '=' ? 'UPDATE neobet SET mise = $1 WHERE parieur = $2' : `UPDATE neobet SET mise = mise ${args.signe} $1 WHERE parieur = $2`;
        await updatePlayerData([{ colonneObjet: 'mise', newValue: args.montant }], args.parieur);
        repondre(`Mise de ${args.parieur} mise à jour.`);
      } else if (args.action === 'pari') {
        await updatePlayerData(
          [
            { colonneObjet: `pari${args.pariNum}`, newValue: args.pari },
            { colonneObjet: `cote${args.pariNum}`, newValue: args.cote },
          ],
          args.parieur
        );
        repondre(`Pari ${args.pariNum} de ${args.parieur} mis à jour.`);
      } else if (args.action === 'statut') {
        await updatePlayerData([{ colonneObjet: `statut${args.pariNum}`, newValue: args.statut === 'victoire' ? '✅' : '❌' }], args.parieur);
        repondre(`Statut du pari ${args.pariNum} de ${args.parieur} mis à jour.`);
      } else if (args.action === 'afficher') {
        const fiche = await afficherFiche(args.parieur);
        repondre(fiche);
      } else {
        repondre('Commande non reconnue.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'exécution de la commande:', error);
      repondre('Une erreur est survenue.');
    }
  }
);

// Commande clear_bet
zokou(
  { 
    nomCom: "clear_bet", 
    reaction: "🧹", 
    categorie: "Other" 
  },
  async (dest, zk, { repondre, arg, ms, auteurMessage }) => {
    if (arg.length < 1) return repondre('Format: clear_bet <nom_du_parieur> ou "all" pour supprimer toutes les fiches.');

    const parieur = arg[0].trim();

    // Demande de confirmation
    await zk.sendMessage(dest, { text: 'Êtes-vous sûr de vouloir supprimer cette fiche de pari ? Répondez par "oui" ou "non".' }, { quoted: ms });

    const rep = await zk.awaitForMessage({
      sender: auteurMessage,
      chatJid: dest,
      timeout: 60000,
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

    try {
      if (parieur.toLowerCase() === 'all') {
        await supprimerToutesLesFiches();
        repondre('✅ Toutes les fiches de pari ont été supprimées.');
      } else {
        await supprimerFiche(parieur);
        repondre(`✅ Fiche de pari de ${parieur} supprimée.`);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      repondre('Une erreur est survenue lors de la suppression.');
    }
  }
);
