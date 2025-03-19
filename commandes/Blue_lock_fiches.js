const { zokou } = require('../framework/zokou');
const { getData } = require('../bdd/blue_lock_db');
const s = require("../set");
const dbUrl = s.DB;
const { Pool } = require('pg');

function normalizeText(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

async function add_fiche(nom_zone, zone, db, ep1, ep2, ep3, ep4, ep5, ep6, ep7, ep8) {
    zokou(
        { nomCom: nom_zone, categorie: 'BLUE_LOCK🔷' },
        async (dest, zk, commandeOptions) => {
            const { ms, repondre, arg, superUser } = commandeOptions;
            let client;

            try {
                const data = await getData(db, 1);
                if (!arg.length) {
                    const mesg = `.            *⚽🔷BLUE LOCK NEO🥅*
                  ▔▔▔▔▔▔▔▔▔▔▔▔▔▔■■■ZONE ${zone}
*🛡️Équipe*:  ${ep1}
*👤Player*: ${data.e1}
*💲Fonds*:  ${data.e9}¥
*🏆Coupes*: ${data.e10}
*🎖️Championnats*: ${data.e11}
*✅wins:* ${data.e12}    *🔶draws:* ${data.e13} *❌losses:* ${data.e14}
▔▔▔▔▔▔▔▔▔▔▔▔▱▱▱▱▱▱

*🛡️Équipe*:  ${ep2}
*👤Player*: ${data.e2}
*💲Fonds*:  ${data.e15}¥
*🏆Coupes*: ${data.e16}
*🎖️Championnats*: ${data.e17}
*✅wins:* ${data.e18}    *🔶draws:* ${data.e19} *❌losses:* ${data.e20}
▔▔▔▔▔▔▔▔▔▔▔▔▱▱▱▱▱▱

*🛡️Équipe*:  ${ep3}
*👤Player*: ${data.e3}
*💲Fonds*:  ${data.e21}¥
*🏆Coupes*: ${data.e22}
*🎖️Championnats*: ${data.e23}
*✅wins:* ${data.e24}    *🔶draws:* ${data.e25} *❌losses:* ${data.e26}
▔▔▔▔▔▔▔▔▔▔▔▔▱▱▱▱▱▱

*🛡️Équipe*:  ${ep4}
*👤Player*: ${data.e4}
*💲Fonds*:  ${data.e27}¥
*🏆Coupes*: ${data.e28}
*🎖️Championnats*: ${data.e29}
*✅wins:* ${data.e30}    *🔶draws:* ${data.e31} *❌losses:* ${data.e32}
▔▔▔▔▔▔▔▔▔▔▔▔▱▱▱▱▱▱

*🛡️Équipe*:  ${ep5}
*👤Player*: ${data.e5}
*💲Fonds*:  ${data.e33}¥
*🏆Coupes*: ${data.e34}
*🎖️Championnats*: ${data.e35}
*✅wins:* ${data.e36}    *🔶draws:* ${data.e37} *❌losses:* ${data.e38}
▔▔▔▔▔▔▔▔▔▔▔▔▱▱▱▱▱▱

*🛡️Équipe*:  ${ep6}
*👤Player*: ${data.e6}
*💲Fonds*:  ${data.e39}¥
*🏆Coupes*: ${data.e40}
*🎖️Championnats*: ${data.e41}
*✅wins:* ${data.e42}    *🔶draws:* ${data.e43} *❌losses:* ${data.e44}
▔▔▔▔▔▔▔▔▔▔▔▔▱▱▱▱▱▱

*🛡️Équipe*:  ${ep7}
*👤Player*: ${data.e7}
*💲Fonds*:  ${data.e45}¥
*🏆Coupes*: ${data.e46}
*🎖️Championnats*: ${data.e47}
*✅wins:* ${data.e48}    *🔶draws:* ${data.e49} *❌losses:* ${data.e50}
▔▔▔▔▔▔▔▔▔▔▔▔▱▱▱▱▱▱
*🛡️Équipe*:  ${ep8}
*👤Player*: ${data.e8}
*💲Fonds*:  ${data.e51}¥
*🏆Coupes*: ${data.e52}
*🎖️Championnats*: ${data.e53}
*✅wins:* ${data.e54}    *🔶draws:* ${data.e55} *❌losses:* ${data.e56}

▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
            *⚽🔷BLUE LOCK NEO🥅*▱▱▱`;
                    zk.sendMessage(dest, { image: { url: "https://files.catbox.moe/fykyho.jpg" }, caption: mesg }, { quoted: ms });
                } else {
                    const proConfig = { connectionString: dbUrl, ssl: { rejectUnauthorized: false } };
                    const pool = new Pool(proConfig);
                    client = await pool.connect();

                    if (superUser) {
                        const updates = await processUpdates(arg, client, db, ep1, ep2, ep3, ep4, ep5, ep6, ep7, ep8);
                        await updatePlayerData(updates, client, db);

                        const messages = updates.map(update => {
                            return `⚽Équipe: ${update.teamName}\n🔵Object: ${update.object}\n🟢Valeur: ${update.oldValue} → ${update.newValue}`;
                        }).join('\n\n');
                        await repondre(`Mises à jour:\n\n${messages}`);
                    } else {
                        repondre('Seul les Membres de la NS peuvent modifier cette fiche');
                    }
                }
            } catch (error) {
                console.error("Erreur lors de la mise à jour:", error);
                repondre('Une erreur est survenue. Veuillez réessayer');
            } finally {
                if (client) client.release();
            }
        }
    );
}

async function processUpdates(arg, client, db, ep1, ep2, ep3, ep4, ep5, ep6, ep7, ep8) {
    const equipes = {
        ep1: { player: "e1", fonds: "e9", coupes: "e10", championnats: "e11", wins: "e12", draws: "e13", losses: "e14", name: ep1 },
        ep2: { player: "e2", fonds: "e15", coupes: "e16", championnats: "e17", wins: "e18", draws: "e19", losses: "e20", name: ep2 },
        ep3: { player: "e3", fonds: "e21", coupes: "e22", championnats: "e23", wins: "e24", draws: "e25", losses: "e26", name: ep3 },
        ep4: { player: "e4", fonds: "e27", coupes: "e28", championnats: "e29", wins: "e30", draws: "e31", losses: "e32", name: ep4 },
        ep5: { player: "e5", fonds: "e33", coupes: "e34", championnats: "e35", wins: "e36", draws: "e37", losses: "e38", name: ep5 },
        ep6: { player: "e6", fonds: "e39", coupes: "e40", championnats: "e41", wins: "e42", draws: "e43", losses: "e44", name: ep6 },
        ep7: { player: "e7", fonds: "e45", coupes: "e46", championnats: "e47", wins: "e48", draws: "e49", losses: "e50", name: ep7 },
        ep8: { player: "e8", fonds: "e51", coupes: "e52", championnats: "e53", wins: "e54", draws: "e55", losses: "e56", name: ep8 }
    };

    const equipe = equipes[arg[0]];
    if (!equipe) return [];

    const updates = [];
    let i = 1;
    
    while (i < arg.length) {
        const [object, signe, valeur] = [arg[i], arg[i + 1], arg[i + 2]];
        const colonneObjet = equipe[object];
        let texte = [];
        i += 3;

        while (i < arg.length && !equipe[arg[i]]) {
            texte.push(arg[i]);
            i++;
        }

        if (colonneObjet) {
            const { oldValue, newValue } = await calculateNewValue(colonneObjet, signe, valeur, texte, db, client);
            updates.push({ colonneObjet, newValue, oldValue, object, texte, teamName: equipe.name });
        }
    }
    return updates;
}


async function calculateNewValue(colonneObjet, signe, valeur, texte, db, client) {
    const query = `SELECT ${colonneObjet} FROM ${db} WHERE id = 1`;
    const result = await client.query(query);
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

async function updatePlayerData(updates, client, db) {
    await client.query('BEGIN');
    for (const update of updates) {
        const query = `UPDATE ${db} SET ${update.colonneObjet} = $1 WHERE id = 1`;
        await client.query(query, [update.newValue]);
    }
    await client.query('COMMIT');
}

add_fiche("zonea", "A", "blue_lock_db1", "⚪Real Madrid🇪🇸", "🔵🔴Barcha🇪🇸", "⚫🔴Bastard Munchen🇩🇪", "🔵PXG🇫🇷", "🟡⚫Berserk Dortmund🇩🇪", "⚪⚫Juventus Ubers🇮🇹", "🩵⚪Manshine City🏴", "🔴⚪ARS🏴");
add_fiche("zoneb", "B", "blue_lock_db2", "🔴Liverpool🏴", "🔵⚫Inter Milan🇮🇹", "🔴⚫Milan AC🇮🇹", "⚪🔴RB Leipzig🇩🇪", "⚪🔴Athletico Madrid🇪🇸", "🩵Napoli🇮🇹", "🔴⚫Manshine United🏴", "🔴⚪Ajajax🇳🇱");
add_fiche("zonec", "C", "blue_lock_db3", "🔵Chelsea🏴", "🔴⚪Benfica🇵🇹", "⚪Marseille🇫🇷", "🔴As Roma🇮🇹");
