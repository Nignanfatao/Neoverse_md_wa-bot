const { zokou } = require('../framework/zokou');
const { getData } = require('../bdd/Blue_lock_Individuel_fiche');
const s = require("../set");
const dbUrl = s.DB;
const { Pool } = require('pg');

function normalizeText(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function add_fiche(nom_joueur, data_id, image_oc) {
    zokou(
        { nomCom: nom_joueur, categorie: 'BLUE_LOCK🔷' },
        async (dest, zk, commandeOptions) => {
            const { ms, repondre, arg, superUser } = commandeOptions;
            let client;

            try {
                const data = await getData('Blue_lock_Individuel_fiche', data_id);

                if (!arg.length) {
                    const mesg = `*⚽🔷BLUE LOCK NEO🥅*
▔▔▔▔▔▔▔▔▔▔▔▔■■■
*👤Joueur:* ${data.e1}
*📊Note:* ${data.e2}
*👣Pieds fort*:  ${data.e3}
*🥅Position:*  ${data.e4}
*🥅Classement:*  ${data.e5}
*🛡️Team:* ${data.e6}
*⬆️points d'Exp:* ${data.e7}
*🅿️Points compétences*: ${data.e8} PC

▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
⚽ *Buts*: ${data.e9}   🎯 *Passes*:  ${data.e10}  🛡️ *Duels*: ${data.e11}
 🏆 *Ballon D'or*: ${data.e12}  *🏆Trophées*: ${data.e13}

▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*🔷⚽Tir: ${data.e14}  ▱▱▱▬▬▬
*🔷⚽passe: ${data.e15} ▱▱▱▬▬▬
*🔷⚽Dribbles: ${data.e16} ▱▱▱▬▬▬
*🔷⚽Acceleration: ${data.e17} ▱▱▱▬▬▬
*🔷⚽physique: ${data.e18} ▱▱▱▬▬▬
*🔷⚽reflexes: ${data.e19} ▱▱▱▬▬▬
*🔷⚽defense : ${data.e20} ▱▱▱▬▬▬

*🔷⚽SKILLS🥅*:
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
💠 ${data.e21}

▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
            *⚽🔷BLUE LOCK NEO🥅*▱▱▱`;
                    zk.sendMessage(dest, { image: { url: image_oc }, caption: mesg }, { quoted: ms });
                } else {
                    const proConfig = { connectionString: dbUrl, ssl: { rejectUnauthorized: false } };
                    const pool = new Pool(proConfig);
                    client = await pool.connect();

                    if (superUser) {
                        const updates = await processUpdates(arg, data_id, client);
                        await updatePlayerData(updates, client, data_id);

                        const messages = updates.map(update => {
                            return `🔵Object: ${update.object}\n🟢Valeur: ${update.oldValue} → ${update.newValue}`;
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

async function processUpdates(arg, data_id, client) {
    const colonnesJoueur = {
        joueur: "e1", note: "e2", pieds_fort: "e3", position: "e4", classement: "e5", 
        team: "e6", exp: "e7", competences: "e8", buts: "e9", passe: "e10",duels: "e11", 
        ballon_or: "e12", trophees: "e13", tir: "e14", passe: "e15", dribbles: "e16",
        aceleration: "e17", physique: "e18", reflexes: "e19", defense: "e20", skills: "e21"
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

        const { oldValue, newValue } = await calculateNewValue(colonneObjet, signe, valeur, texte, data_id, client);
        updates.push({ colonneObjet, newValue, oldValue, object, texte });
    }

    return updates;
}

async function calculateNewValue(colonneObjet, signe, valeur, texte, data_id, client) {
    const query = `SELECT ${colonneObjet} FROM Blue_lock_Individuel_fiche WHERE id = ${data_id}`;
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

async function updatePlayerData(updates, client, data_id) {
    await client.query('BEGIN');
    for (const update of updates) {
        const query = `UPDATE Blue_lock_Individuel_fiche SET ${update.colonneObjet} = $1 WHERE id = ${data_id}`;
        await client.query(query, [update.newValue]);
    }
    await client.query('COMMIT');
}


//add_fiche(nom_joueur, data_id, image_oc)
