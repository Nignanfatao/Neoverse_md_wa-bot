const { zokou } = require('../framework/zokou');
const { getData, calculerStatutFinal, updatePlayerData, supprimerFiche, supprimerToutesLesFiches, pool } = require('../bdd/neobet');
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
  console.log('Arguments reçus:', arg); // Log pour déboguer

  if (arg.includes('=')) {
    const [action, valeur] = arg.split('=').map(part => part.trim());
    console.log('Action et valeur:', action, valeur); // Log pour déboguer
    if (action === 'parieur') {
      return { action, parieur: valeur };
    } else if (action === 'modo') {
      return { action, parieur: null, modo: valeur };
    }
  }

  const [action, parieur, operation, valeur] = arg.split(' ');
  console.log('Arguments analysés:', action, parieur, operation, valeur); // Log pour déboguer

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

// Commande neobet
zokou(
  { 
    nomCom: "neobet", 
    reaction: "🎰", 
    categorie: "NEO_GAMES🎰" 
  },
  async (dest, zk, { repondre, arg, ms, superUser }) => {
    if (!arg || arg.length === 0) return repondre('Format: neobet <parieur> <operation> <valeur>');

    console.log('Commande neobet appelée avec les arguments:', arg); // Log pour déboguer

    const args = analyserArguments(arg.join(' ')); // Convertir les arguments en une chaîne unique
    console.log('Arguments analysés:', args); // Log pour déboguer

    try {
      if (args.action === 'parieur') {
        console.log('Tentative d\'ajout du parieur:', args.parieur); // Log pour déboguer
        // Insérer un nouveau parieur dans la base de données
        await pool.query('INSERT INTO neobet (parieur) VALUES ($1) ON CONFLICT (parieur) DO NOTHING', [args.parieur]);
        console.log('Parieur ajouté avec succès:', args.parieur); // Log pour déboguer
        repondre(`🎰 Parieur ${args.parieur} ajouté avec succès.`);
      } else if (args.action === 'modo') {
        console.log('Tentative d\'ajout du modérateur:', args.modo); // Log pour déboguer
        await updatePlayerData([{ colonneObjet: 'modo', newValue: args.modo }], args.parieur);
        console.log('Modérateur ajouté avec succès:', args.modo); // Log pour déboguer
        repondre(`🎰 Modérateur ${args.modo} ajouté pour ${args.parieur}.`);
      } else if (args.action === 'mise') {
        console.log('Tentative de mise à jour de la mise:', args.montant); // Log pour déboguer
        const query = args.signe === '=' ? 'UPDATE neobet SET mise = $1 WHERE parieur = $2' : `UPDATE neobet SET mise = mise ${args.signe} $1 WHERE parieur = $2`;
        await updatePlayerData([{ colonneObjet: 'mise', newValue: args.montant }], args.parieur);
        console.log('Mise mise à jour avec succès:', args.montant); // Log pour déboguer
        repondre(`🎰 Mise de ${args.parieur} mise à jour.`);
      } else if (args.action === 'pari') {
        console.log('Tentative d\'ajout du pari:', args.pari, args.cote); // Log pour déboguer
        await updatePlayerData(
          [
            { colonneObjet: `pari${args.pariNum}`, newValue: args.pari },
            { colonneObjet: `cote${args.pariNum}`, newValue: args.cote },
          ],
          args.parieur
        );
        console.log('Pari ajouté avec succès:', args.pari, args.cote); // Log pour déboguer
        repondre(`🎰 Pari ${args.pariNum} de ${args.parieur} mis à jour.`);
      } else if (args.action === 'statut') {
        console.log('Tentative de mise à jour du statut:', args.statut); // Log pour déboguer
        await updatePlayerData([{ colonneObjet: `statut${args.pariNum}`, newValue: args.statut === 'victoire' ? '✅' : '❌' }], args.parieur);
        console.log('Statut mis à jour avec succès:', args.statut); // Log pour déboguer
        repondre(`🎰 Statut du pari ${args.pariNum} de ${args.parieur} mis à jour.`);
      } else if (args.action === 'afficher') {
        console.log('Tentative d\'affichage de la fiche:', args.parieur); // Log pour déboguer
        const fiche = await afficherFiche(args.parieur);
        repondre(fiche);
      } else {
        console.log('Commande non reconnue:', args.action); // Log pour déboguer
        repondre('Commande non reconnue.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'exécution de la commande:', error); // Log pour déboguer
      repondre('Une erreur est survenue.');
    }
  }
);
