const { zokou } = require('../framework/zokou');
const { initDuel, updatePlayerStat, getDuel, endDuel } = requiere('bdd/duel');
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
        let client;

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
        id =  Math.floor(Math.random() * 20); // Génère un nombre entre 0 et 20
    } while (duels.has(id)); // S'assure que l'ID n'est pas déjà utilisé
    return id;
}

async function recupDuel() {
  client = await pool.connect(); // Connexion à la base de données
  const query = `
    SELECT id FROM duels WHERE status = 'open';
    `;
  
  try {
    const res = await client.query(query);  // Exécute la requête SQL
    const duels = res.rows;

    if (duels.length === 0) {
      return "Aucun duel en cours.";
    }

    let recap = "*🔹 Duels en cours :*\n";
    duels.forEach((duel) => {
      recap += `- Duel ID: ${duel.id}\n`;
    });

    return recap;
  } catch (err) {
    console.error(err);
    return "Erreur lors de la récupération des duels.";
  } finally {
    client.release();  // Libération de la connexion à la base de données
  }
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
          let duels = getDuel(id)
                    if (duels.length === 0) {
                await repondre("Aucun duel trouvé avec cet ID.");
             } else {
                        await endDuel(id);
                await repondre(`Le duel ID: ${id} a été supprimé.`);
                 }
            return;
        } else if (arg[0] === "list") {
            // Récapitulatif des duels en cours
            const recap = recupDuel();
            await repondre(recap);
            return;
        } else if (!isNaN(arg[arg.length - 1])) {
        // Récupérer l'ID du duel à partir des arguments
        const duelID = parseInt(arg[arg.length - 1], 10);
        const duel = getDuel(duelID);
           if (duel) {
                 const modifications = extraireModifications(arg.slice(0, arg.length - 1));
                for (let { joueur, stat, operation, valeur } of modifications) {
                    let cible = duel.equipe1.find(j => j.nom === joueur) || duel.equipe2.find(j => j.nom === joueur);
                    if (cible) {
                          const updateQuery = `
                            UPDATE joueurs
                            SET stats = stats || jsonb_build_object($1, (stats->$1)::int + $2)
                            WHERE nom = $3 AND (equipe1_id = $4 OR equipe2_id = $4);
                        `;
                        const updateValues = [stat, operation === '+' ? valeur : -valeur, joueur, duelID];
                        await client.query(updateQuery, updateValues);
                    }
                }
                let ficheDuel = `*🆚𝗩𝗘𝗥𝗦𝗨𝗦 𝗔𝗥𝗘𝗡𝗔 𝗕𝗔𝗧𝗧𝗟𝗘🏆🎮*
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n`;

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

                // 5. Envoyer la fiche de duel mise à jour
                await zk.sendMessage(dest, { image: { url: duel.arene.image }, caption: ficheDuel }, { quoted: ms });

            } else {
                await repondre(`Aucun duel trouvé avec l'ID : ${duelID}`);
            }
        } catch (err) {
            console.error('Erreur lors de la mise à jour du duel :', err);
        } finally {
            // Libérer la connexion à la base de données
            client.release();
        }
    }
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

client = await pool.connect();

// Enregistrement des détails du duel dans la base de données
const queryText = `
    INSERT INTO duels (duel_id, equipe1, equipe2, areneN, areneI, det)
    VALUES ($1, $2, $3, $4, $5, $6)
`;
const values = [duelID, equipe1, equipe2, areneT.nom, areneT.image, statsCustom];

try {
    await client.query(queryText, values);
    console.log(`Duel ${duelID} enregistré dans la base de données`);
} catch (err) {
    console.error('Erreur lors de l\'enregistrement du duel:', err);
} finally {
    client.release(); // Libérer la connexion proprement
}
    });

