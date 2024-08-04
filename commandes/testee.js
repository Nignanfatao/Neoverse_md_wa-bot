const { zokou } = require('../framework/zokou');
const { getData } = require('../bdd/northdiv');
const s = require("../set");

const dbUrl = s.DB;

// Fonction pour normaliser le texte en supprimant les accents
function normalizeText(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

zokou(
  {
    nomCom: 'northainz👤',
    categorie: 'NORTH🐺🔴'
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg, superUser } = commandeOptions;
    let client;
    try {
        const data = await getData('8');
        if (!arg || arg.length === 0) {
            // Affichage des données de l'utilisateur
            const mesg = `◇ *Pseudo👤*: ${data.e1}
◇ *Division🛡️*: ${data.e2}
◇ *Classe🏆*: ${data.e3}
◇ *Rang XP🔰*: ${data.e4}
◇ *Golds🧭*: ${data.e5}🧭
◇ *NΞOcoins🔹*: ${data.e6}🔷
◇ *Gift Box🎁*: ${data.e7}🎁
◇ *Coupons🎟*: ${data.e8}🎟
◇ *NΞO PASS🔸*: ${data.e9}🔸 
*❯❯▓▓▓▓▓▓▓▓▓▓▓▓▓▓*
*Points de talent: ${data.e10}⭐* 
*✅Clean games*:  ${data.e18}  *❌Mauvais PA:* ${data.e19}                        
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*✭Records*: ${data.e12} Victoires✅/ ${data.e13} Défaites❌
*🏆Trophées*: ${data.e14}  *🌟 TOS*: ${data.e15}  
*💫Neo Awards*: ${data.e16}   *🎖️Globes*: ${data.e22}
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*🎴Cards*: ${data.e17} 
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*🔷𝗡Ξ𝗢 SUPERLEAGUE🏆🔝*`;
            zk.sendMessage(dest, { image: { url: 'https://telegra.ph/file/c9a177ecb800fe17c8e88.jpg' }, caption: mesg }, { quoted: ms });
        } else {
            const proConfig = {
                connectionString: dbUrl,
                ssl: {
                    rejectUnauthorized: false,
                },
            };

            const { Pool } = require('pg');
            const pool = new Pool(proConfig);
            client = await pool.connect();

            if (superUser) {
                let colonnesJoueur = {
                    pseudo: "e1",
                    division: "e2",
                    classe: "e3",
                    rang_exp: "e4",
                    golds: "e5",
                    neocoins: "e6",
                    gift_box: "e7",
                    coupons: "e8",
                    neopass: "e9",
                    talent: "e10",
                    victoires: "e12",
                    defaites: "e13",
                    trophees: "e14",
                    tos: "e15",
                    awards: "e16",
                    cards: "e17",
                    Clean_games: "e18",
                    Mauvais_pa: "e19",
                    Close_combat: "e20",
                    Attaques: "e21",
                    globes: "e22"
                };

                let updates = [];
                let i = 0;

                while (i < arg.length) {
                    let object = arg[i];
                    let signe = arg[i + 1];
                    let valeur = arg[i + 2];
                    let texte = [];
                    i += 2;

                    // Collecte tout le texte jusqu'à ce qu'un mot clé soit rencontré
                    while (i < arg.length && !colonnesJoueur[arg[i]]) {
                        texte.push(arg[i]);
                        i++;
                    }

                    let colonneObjet = colonnesJoueur[object];
                    let newValue;
                    let oldValue;

                    if (signe === '=' || signe === '+' || signe === '-') {
                        const query = `SELECT ${colonneObjet} FROM northdiv WHERE id = 8`; 
                        const result = await client.query(query);
                        oldValue = result.rows[0][colonneObjet];
                        newValue = eval(`${oldValue} ${signe} ${valeur}`);
                    } else if (signe === 'add' || signe === 'supp') {
                        const query = `SELECT ${colonneObjet} FROM northdiv WHERE id = 8`; 
                        const result = await client.query(query);
                        oldValue = result.rows[0][colonneObjet];
                        if (signe === 'add') {
                            newValue = `${oldValue} ${texte.join(' ')}`;
                        } else if (signe === 'supp') {
                            const regex = new RegExp(`\\b${normalizeText(texte.join(' '))}\\b`, 'gi');
                            newValue = normalizeText(oldValue).replace(regex, '').trim();
                        }
                    } else {
                        console.log("Signe invalide.");
                        repondre('Une erreur est survenue. Veuillez entrer correctement les données.');
                        return;
                    }

                    updates.push({ colonneObjet, newValue, oldValue, object });
                }

                try {
                    await client.query('BEGIN');

                    for (const update of updates) {
                        const query = `UPDATE northdiv SET ${update.colonneObjet} = $1 WHERE id = 8`;
                        await client.query(query, [update.newValue]);
                    }

                    await client.query('COMMIT');

                    const messages = updates.map(update => `⚙ Object: ${update.object}\n💵 Ancienne Valeur: ${update.oldValue}\n💵 Nouvelle Valeur: ${update.newValue}`).join('\n\n');
                    await repondre(`Données du joueur mises à jour pour:\n\n${messages}`);
                } catch (error) {
                    await client.query('ROLLBACK');
                    console.error("Erreur lors de la mise à jour des données de l'utilisateur:", error);
                    repondre('Une erreur est survenue lors de la mise à jour des données. Veuillez réessayer');
                } finally {
                    client.release();
                }
            } else {
                repondre('Seul les Membres de la NS ont le droit de modifier cette fiche');
            }
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour des données de l'utilisateur:", error);
        repondre('Une erreur est survenue. Veuillez réessayer');
    } finally {
        if (client) {
            client.release();
        }
    }
  }
);
