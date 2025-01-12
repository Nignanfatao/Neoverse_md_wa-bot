const { Pool } = require('pg');
const users = require('../Id_ext/northdiv');
const s = require("../set");
const dbUrl = s.DB;

async function stats(command, repondre) {
    const texte = command.toLowerCase();
    if (texte[4]) {
        console.log('texte reçu');
        const [key, mention, operation, valueStr] = texte;

        const validKeys = [
            "force",  "talent", "precision", "speed", "close_combat"
        ];
        if (validKeys.includes(key)) {
            const userId = mention.includes("@") 
                ? `${mention.replace("@", "")}@s.whatsapp.net`
                : null;

            console.log('key validé');
            if (userId) {
                const user = users.find(item => item.id === userId);
console.log("userid:", userId);
                if (user) {
                    console.log('user trouvé');
                    if (["+", "-"].includes(operation)) {
                        console.log('signe ok');
                        
                            const proConfig = {
                                connectionString: dbUrl,
                                ssl: {
                                    rejectUnauthorized: false,
                                },
                            };

                            const pool = new Pool(proConfig);
                            const client = await pool.connect();

                            try {
                                const result = await client.query(user[`get_${key}`]);
                                const oldValue = parseInt(result.rows[0][user[`cln_${key}`]]);

                                const newValue = eval(`${oldValue} ${operation} ${value}`);

                                await client.query(user[`upd_${key}`], [newValue]);

                                const message = `🔄 Mise à jour pour *${user.nom}*:\n\n`
                                    + `⚙ Object: *${key}*\n`
                                    + `💵 Ancienne Valeur: *${oldValue}*\n`
                                    + `💵 Nouvelle Valeur: *${newValue}*`;

                                console.log(message);
                                await repondre(message);
                            } catch (error) {
                                console.error("❌ Erreur lors de la mise à jour de la base de données :", error);
                            } finally {
                                client.release();
                            }
                        }
                    }
                }
            }
        }
}

module.exports = stats;
