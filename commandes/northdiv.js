const { zokou } = require('../framework/zokou');
const { getData } = require('../bdd/northdiv');
const s = require("../set");
const dbUrl = s.DB;
const { Pool } = require('pg');

function normalizeText(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function add_fiche(nom_joueur, data_id, image_oc) {
    zokou(
        { nomCom: nom_joueur, categorie: 'NORTH🐺🔴' },
        async (dest, zk, commandeOptions) => {
            const { ms, repondre, arg, superUser } = commandeOptions;
            let client;

            try {
                const data = await getData(data_id);
                const [joueur, object, signe, valeur, ...texte] = arg;

                if (!arg.length) {
                    const mesg = `░▒▒▒▒░░▒░ \`JOUEUR\`👤
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
◇ *Pseudo👤*: ${data.e1}
◇ *Position Continentale🌍:* ${data.e23}
◇ *Division🛡️*: ${data.e2}
◇ *Rang 🎖️*: ${data.e4}
◇ *Classe🏆*: ${data.e3}
▔▔▔▔▔▔▔▔▔▔▔░▒▒▒▒░░▒░
◇ *Golds🧭*: ${data.e5}G🧭
◇ *NΞOcoins🔹*: ${data.e6}🔷
◇ *NΞO points🔸*:  ${data.e9}🔸 
◇ *Coupons🎟*:  ${data.e8}🎟
                    
░▒▒▒▒░░▒░ \`PALMARÈS\`🏆 
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*✭Records*: ${data.e12} Victoires✅-${data.e13} Défaites❌
*🏆Trophées*: ${data.e14}  *🌟 TOS*: ${data.e15}
*💫Neo Awards*: ${data.e16}   *🎖️Globes*: ${data.e22}

░▒▒▒▒░░▒░ \`STATS\`📊 
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
⌬ *\`Talent\`* ▒▒▒▒▒▒▨▨▧■■■: ${data.e24}
⌬ *\`Force\`* ▒▒▒▒▒▒▨▨▧■■■: ${data.e25}
⌬ *\`Close Combat\`* ▒▒▒▨▨▧■■■: ${data.e26}
⌬ *\`Precision\`* ▒▒▨▨▧■■■: ${data.e27} 
⌬ *\`Speed\`*▒▨▨▧■■■: ${data.e28}

░▒▒▒▒░░▒░ \`CARDS\`🎴 [ 15 ]
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔                                      
${data.e17}
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
                                       *🔷𝗡Ξ𝗢🔝*`;
                    zk.sendMessage(dest, { image: { url: image_oc }, caption: mesg }, { quoted: ms });
                } else {
                    const proConfig = { connectionString: dbUrl, ssl: { rejectUnauthorized: false } };
                    const pool = new Pool(proConfig);
                    client = await pool.connect();

                    if (superUser) {
                        const updates = await processUpdates(arg, data_id, client);
                        await updatePlayerData(updates, client, data_id);

                        const messages = updates.map(update => `⚙ Object: ${update.object}\n💵 Ancienne Valeur: ${update.oldValue}\n💵 Nouvelle Valeur: ${update.newValue}`).join('\n\n');
                        await repondre(`Données du joueur mises à jour:\n\n${messages}`);
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
        pseudo: "e1", division: "e2", classe: "e3", rang: "e4", golds: "e5", 
        neocoins: "e6", gift_box: "e7", coupons: "e8", np: "e9", talent: "e10",
        victoires: "e12", defaites: "e13", trophees: "e14", tos: "e15", awards: "e16",
        cards: "e17", globes: "e22", pos: "e23", talent: "e24", force: "e25", 
        close_combat: "e26", precision: "e27", speed: "e28"
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
    const query = `SELECT ${colonneObjet} FROM northdiv WHERE id = ${data_id}`;
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
        const query = `UPDATE northdiv SET ${update.colonneObjet} = $1 WHERE id = ${data_id}`;
        await client.query(query, [update.newValue]);
    }
    await client.query('COMMIT');
}


//add_fiche(nom_joueur, data_id, image_oc)
add_fiche('northdamian👤', '1', 'https://files.catbox.moe/6ywtez.jpg');
//add_fiche('northlily👤', '2', 'https://files.catbox.moe/lnd2qg.jpg');
//add_fiche('northadorieru👤', '3', 'https://telegra.ph/file/33d75752a2f4d645f836a.jpg');
//add_fiche('norththanatos👤', '4', 'https://files.catbox.moe/i0zsrp.jpg');
add_fiche('northkazuta👤', '5', 'https://files.catbox.moe/9fv70i.jpg');
add_fiche('northomnimoh👤', '6', 'https://files.catbox.moe/lvs0ek.jpg');
//add_fiche('northkanzen👤', '7', 'https://telegra.ph/file/e521acd5939414d8d12c5.jpg');
add_fiche('northainz👤', '8', 'https://files.catbox.moe/69zjvs.jpg');
add_fiche('northaizen👤', '9', 'https://files.catbox.moe/5j00wn.jpg');
//add_fiche('northrukia👤', '10', 'https://telegra.ph/file/1979a11043529f6ce2bc5.jpg');
//add_fiche('northor👤', '11', 'https://files.catbox.moe/7795py.jpg');
add_fiche('northakashi👤', '12', 'https://files.catbox.moe/7l84zf.jpg');
add_fiche('northeoza👤', '13', 'https://files.catbox.moe/dmzuki.jpg');
add_fiche('northregulus👤', '14', 'https://files.catbox.moe/le0ws1.jpg');
