/*const { zokou } = require('../framework/zokou');
const duels = new Map(); // Stocke les duels en cours

// Liste des arènes
const arenes = [
    { nom: 'plaine vide', image: 'https://i.ibb.co/3h71nT1/image.jpg' },
    { nom: 'Desert', image: 'https://i.ibb.co/z2gwsMQ/image.jpg' },
    { nom: 'Zone de glace', image: 'https://i.ibb.co/3F0mK1s/image.jpg' },
    { nom: 'Vallée de la fin', image: 'https://i.ibb.co/VqFgGzF/image.jpg' },
    { nom: 'Au dela', image: 'https://i.ibb.co/4Wkr6mT/image.jpg' },
    { nom: 'Budokai tenkaichi', image: 'https://i.ibb.co/B429M3M/image.jpg' },
    { nom: 'ville de jour', image: 'https://i.ibb.co/LRDRH9k/image.jpg' },
    { nom: 'Ville detruite', image: 'https://i.ibb.co/80R07hR/image.jpg' }
];

// Fonction pour tirer une arène aléatoire
function tirerAr() {
    return arenes[Math.floor(Math.random() * arenes.length)];
}

// Génère un ID unique à partir de deux chiffres
function genererID() {
    let id;
    do {
        id = Math.floor(Math.random() * 21); // Génère un nombre entre 10 et 99
    } while (duels.has(id)); // S'assure que l'ID n'est pas déjà utilisé
    return id;
}

// Fonction pour supprimer un duel
function supprimerDuel(id) {
    duels.delete(id);
}

// Fonction pour récupérer un récapitulatif des duels en cours
function recupDuel() {
    if (duels.size === 0) return "Aucun duel en cours.";
    let recap = "*🔹 Duels en cours :*\n";
    duels.forEach((_, id) => {
        recap += `- Duel ID: ${id}\n`;
    });
    return recap;
}

zokou(
    {
        nomCom: 'duel',
        categorie: 'Other'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (arg[0] === "del") {
            // Suppression d'un duel
            const id = parseInt(arg[1], 10);
            if (duels.has(id)) {
                supprimerDuel(id);
                await repondre(`Le duel ID: ${id} a été supprimé.`);
            } else {
                await repondre("Aucun duel trouvé avec cet ID.");
            }
            return;
        } else if (arg[0] === "list") {
            // Récapitulatif des duels en cours
            const recap = recupDuel();
            await repondre(recap);
            return;
        } else if (!isNaN(arg[0])) {
            // Gestion de la récupération d'un duel par ID
            const duelID = parseInt(arg[0], 10);
            if (duels.has(duelID)) {
                const duel = duels.get(duelID);
                let ficheDuel = `*🆚𝗩𝗘𝗥𝗦𝗨𝗦 𝗔𝗥𝗘𝗡𝗔 𝗕𝗔𝗧𝗧𝗟𝗘🏆🎮*
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n`;
                
                // Ajouter les joueurs de l'équipe 1 avec leurs statistiques
                duel.equipe1.forEach((joueur) => {
                    ficheDuel += `🔷 *${joueur}*: 🫀:100% 🌀:100% ❤️:100%\n`;
                });

                ficheDuel += `                                   ~  *🆚*  ~\n`;

                // Ajouter les joueurs de l'équipe 2 avec leurs statistiques
                duel.equipe2.forEach((joueur) => {
                    ficheDuel += `🔷 *${joueur}*: 🫀:100% 🌀:100% ❤️:100%\n`;
                });

                // Ajouter les infos sur l'arène tirée
                ficheDuel += `▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n
*🌍𝐀𝐫𝐞̀𝐧𝐞*: ${duel.arene.nom}
*🚫𝐇𝐚𝐧𝐝𝐢𝐜𝐚𝐩𝐞*: Boost 1 fois chaque 2 tours!
*⚖️𝐒𝐭𝐚𝐭𝐬*: ${duel.stats}
*🏞️ 𝐀𝐢𝐫 𝐝𝐞 𝐜𝐨𝐦𝐛𝐚𝐭*: illimitée
*🦶🏼𝐃𝐢𝐬𝐭𝐚𝐧𝐜𝐞 𝐢𝐧𝐢𝐭𝐢𝐚𝐥𝐞*📌: 5m
*⌚𝐋𝐚𝐭𝐞𝐧𝐜𝐞*: 6mins+ 1⚠️
*⭕𝐏𝐨𝐫𝐭𝐞́𝐞*: 10m\n▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n
*⚠️Vous avez 🔟 tours max pour finir votre Adversaire! Sinon la victoire sera donnée par décision selon celui qui a dominé le combat ou qui a été le plus offensif !*
`;

                // Envoyer l'image avec le texte de la fiche de duel
                await zk.sendMessage(dest, { image: { url: duel.arene.image }, caption: ficheDuel }, { quoted: ms });
            } else {
                await repondre(`Aucun duel trouvé avec l'ID : ${duelID}`);
            }
            return;
        }

        // Gestion d'un nouveau duel
        const input = arg.join(' ');
        const [joueursInput, statsCustom] = input.split('/').map(part => part.trim());
        const [joueursAvantVs, joueursApresVs] = joueursInput.split('vs').map(part => part.trim());

        const equipe1 = joueursAvantVs.split(',').map(joueur => joueur.trim());
        const equipe2 = joueursApresVs.split(',').map(joueur => joueur.trim());

        // Tirer une arène aléatoire
       const areneT = tirerAr();

        // Générer un ID unique pour le duel
        const duelID = genererID();
        repondre(`🔑 Votre clé d'accès au duel est : *${duelID}*`);

        // Stocker le duel en cours
        duels.set(duelID, { equipe1, equipe2, arene: areneT, stats: statsCustom });

        // Générer la fiche de duel
        let ficheDuel = `*🆚𝗩𝗘𝗥𝗦𝗨𝗦 𝗔𝗥𝗘𝗡𝗔 𝗕𝗔𝗧𝗧𝗟𝗘🏆🎮*
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n`;
        equipe1.forEach((joueur) => {
            ficheDuel += `🔷 *${joueur}*: 🫀:100% 🌀:100% ❤️:100%\n`;
        });

        ficheDuel += `                                   ~  *🆚*  ~\n`;
        equipe2.forEach((joueur) => {
            ficheDuel += `🔷 *${joueur}*: 🫀:100% 🌀:100% ❤️:100%\n`;
        });

        ficheDuel += `▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n
*🌍𝐀𝐫𝐞̀𝐧𝐞*: ${areneT.nom}
*🚫𝐇𝐚𝐧𝐝𝐢𝐜𝐚𝐩𝐞*: Boost 1 fois chaque 2 tours!
*⚖️𝐒𝐭𝐚𝐭𝐬*: ${statsCustom}
*🏞️ 𝐀𝐢𝐫 𝐝𝐞 𝐜𝐨𝐦𝐛𝐚𝐭*: illimitée
*🦶🏼𝐃𝐢𝐬𝐭𝐚𝐧𝐜𝐞 𝐢𝐧𝐢𝐭𝐢𝐚𝐥𝐞*📌: 5m
*⌚𝐋𝐚𝐭𝐞𝐧𝐜𝐞*: 6mins+ 1⚠️
*⭕𝐏𝐨𝐫𝐭𝐞́𝐞*: 10m\n▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n
*⚠️Vous avez 🔟 tours max pour finir votre Adversaire! Sinon la victoire sera donnée par décision selon celui qui a dominé le combat ou qui a été le plus offensif !*
`;

        await zk.sendMessage(dest, { image: { url: areneT.image }, caption: ficheDuel }, { quoted: ms });
    }
);*/







// bot.js
const { zokou } = require('../framework/zokou');
const { sauvegarderDuel, restaurerDuels, supprimerDuel } = require('../bdd/duel');
const duels = new Map(); // Stocke les duels en cours

// Liste des arènes
const arenes = [
    { nom: 'plaine vide', image: 'https://i.ibb.co/3h71nT1/image.jpg' },
    { nom: 'Desert', image: 'https://i.ibb.co/z2gwsMQ/image.jpg' },
    { nom: 'Zone de glace', image: 'https://i.ibb.co/3F0mK1s/image.jpg' },
    { nom: 'Vallée de la fin', image: 'https://i.ibb.co/VqFgGzF/image.jpg' },
    { nom: 'Au dela', image: 'https://i.ibb.co/4Wkr6mT/image.jpg' },
    { nom: 'Budokai tenkaichi', image: 'https://i.ibb.co/B429M3M/image.jpg' },
    { nom: 'ville de jour', image: 'https://i.ibb.co/LRDRH9k/image.jpg' },
    { nom: 'Ville detruite', image: 'https://i.ibb.co/80R07hR/image.jpg' }
];

// Fonction pour tirer une arène aléatoire
function tirerAr() {
    return arenes[Math.floor(Math.random() * arenes.length)];
}

// Génère un ID unique à partir de deux chiffres
function genererID() {
    let id;
    do {
        id = Math.floor(Math.random() * 10000); // Génère un nombre entre 0 et 9999
    } while (duels.has(id)); // S'assure que l'ID n'est pas déjà utilisé
    return id;
}

// Fonction pour récupérer un récapitulatif des duels en cours
function recupDuel() {
    if (duels.size === 0) return "Aucun duel en cours.";
    let recap = "*🔹 Duels en cours :*\n";
    duels.forEach((_, id) => {
        recap += `- Duel ID: ${id}\n`;
    });
    return recap;
}

// Fonction pour mettre à jour les statistiques d'un joueur
function modifierStats(joueur, statsModifications) {
    statsModifications.forEach(({ stat, operation, valeur }) => {
        joueur.stats[stat] = operation === '+' 
            ? joueur.stats[stat] + valeur
            : joueur.stats[stat] - valeur;
    });
}

// Fonction pour extraire les modifications de statistiques
function extraireModifications(args) {
    const modifications = [];
    for (let i = 0; i < args.length; i += 3) {
        const joueur = args[i];
        const stat = args[i + 1];
        const operationValeur = args[i + 2];
        const operation = operationValeur[0];
        const valeur = parseInt(operationValeur.slice(1), 10);
        modifications.push({ joueur, stat, operation, valeur });
    }
    return modifications;
}

zokou(
    {
        nomCom: 'duel',
        categorie: 'Other'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;
        let client;
        if (arg[0] === "del") {
            // Suppression d'un duel
            const id = parseInt(arg[1], 10);
            if (duels.has(id)) {
                duels.delete(id);
                await supprimerDuel(id);
                await repondre(`Le duel ID: ${id} a été supprimé.`);
            } else {
                await repondre("Aucun duel trouvé avec cet ID.");
            }
            return;
        } else if (arg[0] === "list") {
            // Récapitulatif des duels en cours
            const recap = recupDuel();
            await repondre(recap);
            return;
        } else if (!isNaN(arg[arg.length - 1])) {
            // Gestion de la mise à jour des statistiques par ID
            const duelID = parseInt(arg[arg.length - 1], 10);
            if (duels.has(duelID)) {
                const duel = duels.get(duelID);

                // Extraire les modifications de statistiques
                const modifications = extraireModifications(arg.slice(0, arg.length - 1));

                // Appliquer les modifications aux joueurs concernés
                modifications.forEach(({ joueur, stat, operation, valeur }) => {
                    let cible = duel.equipe1.find(j => j.nom === joueur) || duel.equipe2.find(j => j.nom === joueur);
                    if (cible) {
                        modifierStats(cible, [{ stat, operation, valeur }]);
                    }
                });

                // Générer la fiche de duel mise à jour
                let ficheDuel = `*🆚𝗩𝗘𝗥𝗦𝗨𝗦 𝗔𝗥𝗘𝗡𝗔 𝗕𝗔𝗧𝗧𝗟𝗘🏆🎮*\n`;
                
                duel.equipe1.forEach(joueur => {
                    ficheDuel += `🔷 *${joueur.nom}*: 🫀:${joueur.stats.sta}% 🌀:${joueur.stats.energie}% ❤️:${joueur.stats.vie}%\n`;
                });

                ficheDuel += `                                   ~  *🆚*  ~\n`;

                duel.equipe2.forEach(joueur => {
                    ficheDuel += `🔷 *${joueur.nom}*: 🫀:${joueur.stats.sta}% 🌀:${joueur.stats.energie}% ❤️:${joueur.stats.vie}%\n`;
                });

                ficheDuel += `▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n
*🌍𝐀𝐫𝐞̀𝐧𝐞*: ${duel.arene.nom}
*🚫𝐇𝐚𝐧𝐝𝐢𝐜𝐚𝐩𝐞*: Boost 1 fois chaque 2 tours!
*⚖️𝐒𝐭𝐚𝐭𝐬*: ${statsCustom}
*🏞️ 𝐀𝐢𝐫 𝐝𝐞 𝐜𝐨𝐦𝐛𝐚𝐭*: illimitée
*🦶🏼𝐃𝐢𝐬𝐭𝐚𝐧𝐜𝐞 𝐢𝐧𝐢𝐭𝐢𝐚𝐥𝐞*📌: 5m
*⌚𝐋𝐚𝐭𝐞𝐧𝐜𝐞*: 6mins+ 1⚠️
*⭕𝐏𝐨𝐫𝐭𝐞́𝐞*: 10m\n▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n
*⚠️Vous avez 🔟 tours max pour finir votre Adversaire! Sinon la victoire sera donnée par décision selon celui qui a dominé le combat ou qui a été le plus offensif !*
`;
                // Envoyer la fiche de duel mise à jour
                await zk.sendMessage(dest, { image: { url: duel.arene.image }, caption: ficheDuel }, { quoted: ms });
            } else {
                await repondre(`Aucun duel trouvé avec l'ID : ${duelID}`);
            }
            return;
        }

        // Gestion d'un nouveau duel
        const input = arg.join(' ');
        const [joueursInput, statsCustom] = input.split('/').map(part => part.trim());
        const [joueursAvantVs, joueursApresVs] = joueursInput.split('vs').map(part => part.trim());

        const equipe1 = joueursAvantVs.split(',').map(joueur => ({ nom: joueur.trim(), stats: { sta: 100, energie: 100, vie: 100 } }));
        const equipe2 = joueursApresVs.split(',').map(joueur => ({ nom: joueur.trim(), stats: { sta: 100, energie: 100, vie: 100 } }));
        // Tirer une arène aléatoire
const areneT = tirerAr();

// Générer un ID unique pour le duel
const duelID = genererID();
repondre(`🔑 Votre clé d'accès au duel est : *${duelID}*`);

// Stocker le duel en cours
duels.set(duelID, { equipe1, equipe2, arene: areneT, stats: statsCustom });

// Générer la fiche de duel initiale
let ficheDuel = `*🆚𝗩𝗘𝗥𝗦𝗨𝗦 𝗔𝗥𝗘𝗡𝗔 𝗕𝗔𝗧𝗧𝗟𝗘🏆🎮*
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n`;

equipe1.forEach(joueur => {
    ficheDuel += `🔷 *${joueur.nom}*: 🫀:${joueur.stats.sta}% 🌀:${joueur.stats.energie}% ❤️:${joueur.stats.vie}%\n`;
});

ficheDuel += `                                   ~  *🆚*  ~\n`;

equipe2.forEach(joueur => {
    ficheDuel += `🔷 *${joueur.nom}*: 🫀:${joueur.stats.sta}% 🌀:${joueur.stats.energie}% ❤️:${joueur.stats.vie}%\n`;
});

ficheDuel += `▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n
*🌍𝐀𝐫𝐞̀𝐧𝐞*: ${areneT.nom}
*🚫𝐇𝐚𝐧𝐝𝐢𝐜𝐚𝐩𝐞*: Boost 1 fois chaque 2 tours!
*⚖️𝐒𝐭𝐚𝐭𝐬*: ${statsCustom}
*🏞️ 𝐀𝐢𝐫 𝐝𝐞 𝐜𝐨𝐦𝐛𝐚𝐭*: illimitée
*🦶🏼𝐃𝐢𝐬𝐭𝐚𝐧𝐜𝐞 𝐢𝐧𝐢𝐭𝐢𝐚𝐥𝐞*📌: 5m
*⌚𝐋𝐚𝐭𝐞𝐧𝐜𝐞*: 6mins+ 1⚠️
*⭕𝐏𝐨𝐫𝐭𝐞́𝐞*: 10m\n▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n
*⚠️Vous avez 🔟 tours max pour finir votre Adversaire! Sinon la victoire sera donnée par décision selon celui qui a dominé le combat ou qui a été le plus offensif !*
`;

// Envoyer la fiche de duel initiale
await zk.sendMessage(dest, { image: { url: areneT.image }, caption: ficheDuel }, { quoted: ms });

// Connexion à la base de données PostgreSQL
const { Pool } = require("pg");

const s = require("../set");

var dbUrl = s.DB;
const proConfig = {
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool(proConfig);

client = await pool.connect();

// Enregistrement des détails du duel dans la base de données
const queryText = `
    INSERT INTO duels (duel_id, equipe1, equipe2, arene)
    VALUES ($1, $2, $3, $4)
`;
const values = [duelID, JSON.stringify(equipe1), JSON.stringify(equipe2), areneT.nom];

try {
    await client.query(queryText, values);
    console.log(`Duel ${duelID} enregistré dans la base de données`);
} catch (err) {
    console.error('Erreur lors de l\'enregistrement du duel:', err);
} finally {
    client.release(); // Libérer la connexion proprement
}
    });
