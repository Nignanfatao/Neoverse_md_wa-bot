const { zokou } = require('../framework/zokou');
const duels = new Map();  // Stocke les duels en cours

zokou(
    {
        nomCom: 'dul',
        categorie: 'Other'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        // Fonction pour afficher les stats du duel
        const afficherStats = (idDuel) => {
            const duel = duels.get(idDuel);
            return `*🆚𝗩𝗘𝗥𝗦𝗨𝗦 𝗔𝗥𝗘𝗡𝗔 𝗕𝗔𝗧𝗧𝗟𝗘🏆🎮*       
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
🔷   *${duel.joueur1}*: 🫀:${duel.stats.joueur1.stamina}%  🌀:${duel.stats.joueur1.energie}% ❤️:${duel.stats.joueur1.vie}%            
                                   ~  *🆚*  ~
🔷  *${duel.joueur2}*: 🫀:${duel.stats.joueur2.stamina}%  🌀:${duel.stats.joueur2.energie}% ❤️:${duel.stats.joueur2.vie}%.
 ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
 *🌍𝐀𝐫𝐞̀𝐧𝐞*: ...`;
        };

        // Initialiser un duel ou arrêter un duel
        if (arg && arg.length > 0) {
            const args = arg.split(" ");

            // Arrêter le combat avec la commande "dul combat terminé"
            if (args[0] === 'combat' && args[1] === 'terminé') {
                const idDuel = args[2];
                if (duels.has(idDuel)) {
                    duels.delete(idDuel);
                    repondre(`Le combat entre ${idDuel.split('-').join(' et ')} est terminé.`);
                } else {
                    repondre(`Aucun combat trouvé avec l'identifiant ${idDuel}.`);
                }
                return;
            }

            // Démarrer un nouveau duel avec deux noms de joueurs
            if (args.length === 2) {
                const [joueur1, joueur2] = args;
                const idDuel = `${joueur1}-${joueur2}`;

                // Vérifier si le duel existe déjà
                if (!duels.has(idDuel)) {
                    duels.set(idDuel, {
                        joueur1,
                        joueur2,
                        stats: {
                            joueur1: { stamina: 100, energie: 100, vie: 100 },
                            joueur2: { stamina: 100, energie: 100, vie: 100 }
                        }
                    });

                    repondre(`Le combat entre ${joueur1} et ${joueur2} commence !\n\n` + afficherStats(idDuel));
                } else {
                    repondre(`Le combat entre ${joueur1} et ${joueur2} est déjà en cours.`);
                }
                return;
            }

            // Mettre à jour les statistiques du duel
            const statRegex = /(\w+)\s*([+-])\s*(\d+)\s*(joueur1|joueur2)/g;
            const idDuel = Array.from(duels.keys()).find(id => id.includes(args[0]) && id.includes(args[1]));

            if (idDuel && statRegex.test(args.join(" "))) {
                let duel = duels.get(idDuel);
                let modifs = [];
                
                // Appliquer toutes les modifications dans un même appel
                let matches;
                while ((matches = statRegex.exec(args.join(" "))) !== null) {
                    const [_, stat, op, valeur, joueur] = matches;
                    const statName = stat.toLowerCase();

                    if (['stamina', 'energie', 'vie'].includes(statName)) {
                        const change = parseInt(valeur);
                        duel.stats[joueur][statName] += (op === '+' ? change : -change);
                        modifs.push(`${joueur}: ${statName} ${op}${valeur}`);
                    }
                }

                // Mettre à jour les statistiques et renvoyer le résultat
                duels.set(idDuel, duel);
                repondre(`Modifications effectuées: ${modifs.join(', ')}\n\n` + afficherStats(idDuel));
            } else {
                repondre("Commande invalide ou duel introuvable.");
            }
        } else {
            repondre("Commande invalide. Utilisez 'dul joueur1 joueur2' pour commencer un duel, ou 'dul combat terminé joueur1-joueur2' pour terminer un duel.");
        }
    }
);
