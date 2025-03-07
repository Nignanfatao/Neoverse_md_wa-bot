const { zokou } = require('../framework/zokou');
const { getData, calculerStatutFinal, updatePlayerData, supprimerFiche, supprimerToutesLesFiches } = require('../bdd/neobet');
const s = require('../set');

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

  return `.
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

zokou(
  { 
    nomCom: "neobet", 
    reaction: "🎰", 
    categorie: "NEO_GAMES🎰" 
  },
async (dest, zk, { repondre, arg, ms, superUser }) => {
  const [action, parieur, operation, valeur] = arg;

  if (!action) return repondre('Format: neobet <parieur> <operation> <valeur>');

  try {
    if (action === 'parieur') {
      await updatePlayerData([{ colonneObjet: 'parieur', newValue: valeur }], valeur);
      repondre(`Parieur ${valeur} ajouté avec succès.`);
    } else if (action === 'modo') {
      await updatePlayerData([{ colonneObjet: 'modo', newValue: valeur }], parieur);
      repondre(`Modérateur ${valeur} ajouté pour ${parieur}.`);
    } else if (action === 'mise') {
      const [signe, montant] = [operation, parseFloat(valeur)];
      const query = signe === '=' ? 'UPDATE neobet SET mise = $1 WHERE parieur = $2' : `UPDATE neobet SET mise = mise ${signe} $1 WHERE parieur = $2`;
      await updatePlayerData([{ colonneObjet: 'mise', newValue: montant }], parieur);
      repondre(`Mise de ${parieur} mise à jour.`);
    } else if (action.startsWith('pari')) {
      const pariNum = action.replace('pari', '');
      const [pari, cote] = valeur.split(' ');
      await updatePlayerData([{ colonneObjet: `pari${pariNum}`, newValue: pari }, { colonneObjet: `cote${pariNum}`, newValue: parseFloat(cote) }], parieur);
      repondre(`Pari ${pariNum} de ${parieur} mis à jour.`);
    } else if (action === 'statut') {
      const [pariNum, statut] = operation.split('');
      await updatePlayerData([{ colonneObjet: `statut${pariNum}`, newValue: statut === 'victoire' ? '✅' : '❌' }], parieur);
      repondre(`Statut du pari ${pariNum} de ${parieur} mis à jour.`);
    } else {
      const fiche = await afficherFiche(action);
      repondre(fiche);
    }
  } catch (error) {
    console.error('Erreur lors de l\'exécution de la commande:', error);
    repondre('Une erreur est survenue.');
  }
});

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
});
