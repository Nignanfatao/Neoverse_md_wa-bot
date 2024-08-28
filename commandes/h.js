const { zokou } = require('../framework/zokou');
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
            // Vérifier si c'est une commande pour arrêter le combat
            if (arg[0] === 'combat' && arg[1] === 'terminé') {
                const idDuel = `${arg[2]}-${arg[3]}`;
                if (duels.has(idDuel)) {
                    duels.delete(idDuel);  // Arrêter le combat
                    repondre(`Le combat entre ${arg[2]} et ${arg[3]} est terminé.`);
                } else {
                    repondre(`Aucun combat trouvé avec les joueurs ${arg[2]} et ${arg[3]}.`);
                }
                return;
            }

            // Commencer un nouveau duel avec deux noms de joueurs
            if (arg.length === 2) {
                const [joueur1, joueur2] = arg;
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
                
                repondre(`Le combat entre ${joueur1} et ${joueur2} commence !\n\n${afficherStats(idDuel)}`);
                return;
            }

            // Mise à jour des statistiques pendant le duel (ex: "joueur1 vie - 10")
            if (arg.length >= 4) {
                const idDuel = `${arg[0]}-${arg[1]}`;
                if (duels.has(idDuel)) {
                    const duel = duels.get(idDuel);
                    
                    // Parcourir les stats à mettre à jour
                    for (let i = 2; i < arg.length; i += 3) {
                        const joueur = arg[i].includes("joueur1") ? 'joueur1' : 'joueur2';
                        const statName = arg[i + 1].toLowerCase();
                        const operation = arg[i + 2];

                        if (['stamina', 'energie', 'vie'].includes(statName)) {
                            if (operation.startsWith("-")) {
                                duel.stats[joueur][statName] -= parseInt(operation.slice(1));
                            } else if (operation.startsWith("+")) {
                                duel.stats[joueur][statName] += parseInt(operation.slice(1));
                            }

                            // Mettre à jour le duel dans la map
                            duels.set(idDuel, duel);
                        } else {
                            repondre(`Statistique invalide : ${statName}. Utilisez 'stamina', 'energie' ou 'vie'.`);
                            return;
                        }
                    }

                    // Envoyer la mise à jour des stats
                    repondre(afficherStats(idDuel));
                } else {
                    repondre(`Aucun combat trouvé avec les joueurs ${arg[0]} et ${arg[1]}.`);
                }
                return;
            }
        } else {
            repondre("Commande invalide. Utilisez 'duel joueur1 joueur2' pour commencer un duel ou 'combat terminé joueur1 joueur2' pour terminer un duel.");
        }
    }
);
