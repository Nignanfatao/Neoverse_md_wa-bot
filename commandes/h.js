const duels = new Map();  // Stocke les duels en cours

zokou(
    {
        nomCom: 'dul',
        categorie: 'Other'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        const afficherStats = (idDuel) => {
            const duel = duels.get(idDuel);
            return `*🆚𝗩𝗘𝗥𝗦𝗨𝗦 𝗔𝗥𝗘𝗡𝗔 𝗕𝗔𝗧𝗧𝗟𝗘🏆🎮*       
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
🔷   *${duel.joueur1}*: 🫀:${duel.stats.joueur1.stamina}%  🌀:${duel.stats.joueur1.energie}% ❤️:${duel.stats.joueur1.vie}%            
                                   ~  *🆚*  ~
🔷  *${duel.joueur2}*: 🫀:${duel.stats.joueur2.stamina}%  🌀:${duel.stats.joueur2.energie}% ❤️:${duel.stats.joueur2.vie}%.                            
 ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
  *🌍𝐀𝐫𝐞̀𝐧𝐞*: 
 *🚫𝐇𝐚𝐧𝐝𝐢𝐜𝐚𝐩𝐞*: Boost 1 fois chaques 2 tours! 
 *⚖️𝐒𝐭𝐚𝐭𝐬*: 
 *🏞️ 𝐀𝐢𝐫 𝐝𝐞 𝐜𝐨𝐦𝐛𝐚𝐭*: 50m max
 *🦶🏼𝐃𝐢𝐬𝐭𝐚𝐧𝐜𝐞 𝐢𝐧𝐢𝐭𝐢𝐚𝐥𝐞*📌: 5m
 *⌚𝐋𝐚𝐭𝐞𝐧𝐜𝐞*: 6mins+ 1⚠️
 *⭕𝐏𝐨𝐫𝐭𝐞́𝐞*:  10m
 *🌍𝐄𝐧𝐯𝐢𝐫𝐨𝐧𝐧𝐞𝐦𝐞𝐧𝐭*: 
 
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
  *⚠️Vous avez 🔟 tours max pour finir votre Adversaire! Sinon la victoire sera donnée par décision selon celui qui a dominer le combat où qui a été le plus à l'offensive !*`;
        };

        // Gérer l'initialisation d'un nouveau duel
        if (arg && arg.length > 0) {
            const args = arg.split(" ");
            
            // Vérifier si c'est une commande pour arrêter le combat
            if (args[0] === 'combat') {
                const idDuel = args[2];
                if (duels.has(idDuel)) {
                    duels.delete(idDuel);  // Arrêter le combat
                    repondre(`Le combat ${idDuel} est terminé.`);
                } else {
                    repondre(`Aucun combat trouvé avec l'identifiant ${idDuel}.`);
                }
                return;
            }

            // Commencer un nouveau duel avec deux noms de joueurs
            if (args.length === 2) {
                const [joueur1, joueur2] = args;
                const idDuel = `${joueur1}-${joueur2}`;
                
                // Créer un nouveau duel
                duels.set(idDuel, {
                    joueur1: joueur1,
                    joueur2: joueur2,
                    stats: {
                        joueur1: { stamina: 100, energie: 100, vie: 100 },
                        joueur2: { stamina: 100, energie: 100, vie: 100 }
                    }
                });
                
                repondre(`Le combat entre ${joueur1} et ${joueur2} commence !\n\n` + afficherStats(idDuel));
                return;
            }

            // Mise à jour des statistiques pendant le duel (ex: "stamina - 50 joueur1-joueur2")
            if (args.length === 4) {
                const [stat, operation, valeur, idDuel] = args;

                if (duels.has(idDuel)) {
                    const duel = duels.get(idDuel);

                    const joueur = operation.includes("joueur1") ? 'joueur1' : 'joueur2';
                    const statName = stat.toLowerCase();

                    if (['stamina', 'energie', 'vie'].includes(statName)) {
                        if (operation.includes("-")) {
                            duel.stats[joueur][statName] -= parseInt(valeur);
                        } else if (operation.includes("+")) {
                            duel.stats[joueur][statName] += parseInt(valeur);
                        }

                        // Mettre à jour le duel dans la map
                        duels.set(idDuel, duel);

                        // Envoyer la mise à jour des stats
                        repondre(afficherStats(idDuel));
                    } else {
                        repondre("Statistique invalide. Utilisez 'stamina', 'energie' ou 'vie'.");
                    }
                } else {
                    repondre(`Aucun combat trouvé avec l'identifiant ${idDuel}.`);
                }
                return;
            }
        } else {
            repondre("Commande invalide. Utilisez 'duel joueur1 joueur2' pour commencer un duel ou 'duel combat terminé idDuel' pour terminer un duel.");
        }
    }
);
