const { zokou } = require('../framework/zokou');
const { createTables, addOrUpdateBet, getBet, updateTextValue, updateNumericValue, updatePari, clearBet } = require('../bdd/neobetDB');

// Créer les tables au démarrage
createTables();

// Commande principale pour gérer les paris
zokou({ nomCom: 'neobet', reaction: '🎰', categorie: 'NEO_GAMES🎰' }, async (dest, zk, { repondre, arg, ms }) => {
    if (arg.length < 1) {
        return repondre(`Format: neobet <sous-commande> [arguments]
        
Sous-commandes disponibles :
• parieur add/supp <nom_parieur> : Gérer les parieurs
• modo <nom_parieur> =/add/supp <nom_moderateur> : Gérer les modérateurs
• mise <nom_parieur> =/+/- <montant> : Gérer les mises
• pari <nom_parieur> pari1 =/add/supp <valeur> <cote> : Gérer les paris
• statut <nom_parieur> pari1 =/add/supp echec/victoire : Gérer le statut des paris
• afficher <nom_parieur> : Afficher les détails d'un pari`);
    }

    const [sousCommande, ...args] = arg;

    switch (sousCommande) {
        case 'parieur': {
    if (args.length < 2) return repondre('Format: neobet parieur add/supp/update <nom_parieur> [nouveau_nom]');
    const [action, nomParieur, nouveauNom] = args;
    try {
        if (action === 'add') {
            // Ajouter un nouveau parieur avec un pari par défaut
            await addOrUpdateBet(nomParieur, 'aucun', 0, []);
            repondre(`✅ Parieur ${nomParieur} ajouté avec un pari par défaut.`);
        } else if (action === 'supp') {
            await clearBet(nomParieur);
            repondre(`✅ Parieur ${nomParieur} supprimé.`);
        } else if (action === 'update') {
            if (!nouveauNom) return repondre('Format: neobet parieur update <ancien_nom> <nouveau_nom>');
            const result = await updateParieurName(nomParieur, nouveauNom);
            repondre(result);
        } else {
            repondre('Action non reconnue. Utilisez add, supp, ou update.');
        }
    } catch (error) {
        repondre('Erreur lors de la gestion du parieur.');
    }
    break;
}
        case 'modo': {
            if (args.length < 3) return repondre('Format: neobet modo <nom_parieur> =/add/supp <nom_moderateur>');
            const [parieurModo, signeModo, ...texteModo] = args;
            try {
                const result = await updateTextValue(parieurModo, 'moderateur', signeModo, texteModo);
                repondre(result);
            } catch (error) {
                repondre('Erreur lors de la mise à jour du modérateur.');
            }
            break;
        }

        case 'mise': {
            if (args.length < 3) return repondre('Format: neobet mise <nom_parieur> =/+/- <montant>');
            const [parieurMise, signeMise, valeurMise] = args;
            try {
                const result = await updateNumericValue(parieurMise, 'mise', signeMise, valeurMise);
                repondre(result);
            } catch (error) {
                repondre('Erreur lors de la mise à jour de la mise.');
            }
            break;
        }

        case 'pari': {
            if (args.length < 4) return repondre('Format: neobet pari <nom_parieur> pari1 =/add/supp <valeur> <cote>');
            const [parieurPari, pariIndexStr, signePari, valeurPari, cotePari] = args;
            const pariIndex = parseInt(pariIndexStr.replace('pari', '')) - 1;
            try {
                const result = await updatePari(parieurPari, pariIndex, valeurPari, cotePari);
                repondre(result);
            } catch (error) {
                repondre('Erreur lors de la mise à jour du pari.');
            }
            break;
        }

        case 'statut': {
            if (args.length < 4) return repondre('Format: neobet statut <nom_parieur> pari1 =/add/supp echec/victoire');
            const [parieurStatut, pariIndexStrStatut, signeStatut, statut] = args;
            const pariIndexStatut = parseInt(pariIndexStrStatut.replace('pari', '')) - 1;
            try {
                const result = await updatePari(parieurStatut, pariIndexStatut, null, null, statut);
                repondre(result);
            } catch (error) {
                repondre('Erreur lors de la mise à jour du statut du pari.');
            }
            break;
        }

        case 'afficher': {
            if (args.length < 1) return repondre('Format: neobet afficher <nom_parieur>');
            const parieurAfficher = args[0].trim();
            try {
                const bet = await getBet(parieurAfficher);
                if (!bet) return repondre('Aucun pari trouvé pour ce parieur.');

                const parisList = bet.paris.map((p, i) => {
                    const statut = p.statut ? (p.statut === 'victoire' ? '✅' : '❌') : '';
                    return `➤ ${statut} ${p.valeur} × ${p.cote}`;
                }).join('\n');

                const message = `.            *⌬𝗡Ξ𝗢𝘃𝗲𝗿𝘀𝗲 𝗕𝗘𝗧🎰*
▔▔▔▔▔▔▔▔▔▔▔▔▔░▒▒▒▒░░▒░

*👥Parieur*: ${bet.parieur}
*🛡️Modérateur*: ${bet.moderateur}
*💰Somme misée*: ${bet.mise}🧭

*📜Liste des paris placés*:
${parisList}

*💰Gains Possibles*: ${bet.gains_possibles}🧭
═══════════░▒▒▒▒░░▒░
                  *🔷𝗡Ξ𝗢𝗚𝗮𝗺𝗶𝗻𝗴🎮*`;
                repondre(message);
            } catch (error) {
                repondre('Erreur lors de la récupération des informations du pari.');
            }
            break;
        }

        default:
            repondre('Sous-commande non reconnue. Utilisez "neobet" pour voir les sous-commandes disponibles.');
            break;
    }
});

// Commande indépendante pour supprimer un pari
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

    try {
        const result = await clearBet(parieur);
        repondre(result);
    } catch (error) {
        repondre('Erreur lors de la suppression du pari.');
    }
});
