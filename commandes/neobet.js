const { zokou } = require('../framework/zokou');
const { getData, calculerStatutFinal, updatePlayerData, supprimerFiche, supprimerToutesLesFiches, pool } = require('../bdd/neobet');
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
  // Si l'argument contient "=", on le divise en deux parties
  if (arg.includes('=')) {
    const [action, valeur] = arg.split('=').map(part => part.trim());
    if (action === 'parieur') {
      return { action, parieur: valeur };
    } else if (action === 'modo') {
      return { action, parieur: null, modo: valeur };
    }
  }

  // Sinon, on traite les arguments normalement
  const [action, parieur, operation, valeur] = arg;

  if (action === 'mise' && (operation === '+' || operation === '-' || operation === '=')) {
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

// Fonction pour traiter les mises à jour
async function processUpdates(arg, parieur) {
  const colonnesJoueur = {
    parieur: "parieur", modo: "modo", mise: "mise",
    pari1: "pari1", cote1: "cote1", statut1: "statut1",
    pari2: "pari2", cote2: "cote2", statut2: "statut2",
    pari3: "pari3", cote3: "cote3", statut3: "statut3"
  };

  const updates = [];
  let i = 0;

  while (i < arg.length) {
    const [object, signe, valeur] = [arg[i], arg[i+1], arg[i+2]];
    const colonneObjet = colonnesJoueur[object];
    let texte = [];
    i += 2;

    while (i < arg.length && !colonnesJoueur[arg[i]]) {
      texte.push(arg[i]);
      i++;
    }

    const { oldValue, newValue } = await calculateNewValue(colonneObjet, signe, valeur, texte, parieur);
    updates.push({ colonneObjet, newValue, oldValue, object, texte });
  }

  return updates;
}

// Fonction pour calculer la nouvelle valeur
async function calculateNewValue(colonneObjet, signe, valeur, texte, parieur) {
  const query = `SELECT ${colonneObjet} FROM neobet WHERE parieur = $1`;
  const result = await pool.query(query, [parieur]);
  const oldValue = result.rows[0][colonneObjet];
  let newValue;

  if (signe === '+' || signe === '-') {
    newValue = eval(`${oldValue} ${signe} ${valeur}`);
  } else if (signe === '=' || signe === 'add' || signe === 'supp') {
    if (signe === '=') newValue = texte.join(' ');
    else if (signe === 'add') newValue = oldValue + ' ' + texte.join(' ');
    else if (signe === 'supp') newValue = oldValue.replace(new RegExp(`\\b${normalizeText(texte.join(' '))}\\b`, 'gi'), '').trim();
  }

  return { oldValue, newValue };
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

    const args = analyserArguments(arg.join(' ')); // Convertir les arguments en une chaîne unique

    try {
      if (args.action === 'parieur') {
        await updatePlayerData([{ colonneObjet: 'parieur', newValue: args.parieur }], args.parieur);
        repondre(`🎰 Parieur ${args.parieur} ajouté avec succès.`);
      } else if (args.action === 'modo') {
        await updatePlayerData([{ colonneObjet: 'modo', newValue: args.modo }], args.parieur);
        repondre(`🎰 Modérateur ${args.modo} ajouté pour ${args.parieur}.`);
      } else if (args.action === 'mise') {
        const query = args.signe === '=' ? 'UPDATE neobet SET mise = $1 WHERE parieur = $2' : `UPDATE neobet SET mise = mise ${args.signe} $1 WHERE parieur = $2`;
        await updatePlayerData([{ colonneObjet: 'mise', newValue: args.montant }], args.parieur);
        repondre(`🎰 Mise de ${args.parieur} mise à jour.`);
      } else if (args.action === 'pari') {
        await updatePlayerData(
          [
            { colonneObjet: `pari${args.pariNum}`, newValue: args.pari },
            { colonneObjet: `cote${args.pariNum}`, newValue: args.cote },
          ],
          args.parieur
        );
        repondre(`🎰 Pari ${args.pariNum} de ${args.parieur} mis à jour.`);
      } else if (args.action === 'statut') {
        await updatePlayerData([{ colonneObjet: `statut${args.pariNum}`, newValue: args.statut === 'victoire' ? '✅' : '❌' }], args.parieur);
        repondre(`🎰 Statut du pari ${args.pariNum} de ${args.parieur} mis à jour.`);
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
        repondre('🧹 ✅ Toutes les fiches de pari ont été supprimées.');
      } else {
        await supprimerFiche(parieur);
        repondre(`🧹 ✅ Fiche de pari de ${parieur} supprimée.`);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      repondre('Une erreur est survenue lors de la suppression.');
    }
  }
);
