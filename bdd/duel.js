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
const client = await pool.connect();

async function createDuelsTable() {
  try {
    // Créez la table northdiv si elle n'existe pas déjà
    await client.query(`
    CREATE TABLE IF NOT EXISTS duels (
    id SERIAL PRIMARY KEY,
    equipe1 JSONB NOT NULL,
    equipe2 JSONB NOT NULL,
    arene JSONB NOT NULL,
    stats JSONB,
    duel_id INTEGER UNIQUE NOT NULL
);
    `);
    console.log('Table duels créée avec succès');
  } catch (error) {
    console.error('Erreur lors de la création de la table duels:', error);
  } finally {
    client.release();
  }
}


// Sauvegarder ou mettre à jour un duel dans la base de données
async function sauvegarderDuel(duel) {
    const query = `
        INSERT INTO duels(duel_id, equipe1, equipe2, arene, stats)
        VALUES($1, $2, $3, $4, $5)
        ON CONFLICT (duel_id)
        DO UPDATE SET equipe1 = $2, equipe2 = $3, arene = $4, stats = $5
    `;
    const values = [
        duel.duel_id,
        JSON.stringify(duel.equipe1),
        JSON.stringify(duel.equipe2),
        duel.arene,
        JSON.stringify(duel.stats)
    ];

    try {
        await client.query(query, values);
        console.log(`Duel ${duel.duel_id} sauvegardé avec succès.`);
    } catch (err) {
        console.error('Erreur lors de la sauvegarde du duel:', err);
    }
}

// Restaurer tous les duels depuis la base de données
async function restaurerDuels() {
    const query = `SELECT * FROM duels`;
    try {
        const result = await client.query(query);
        const duels = result.rows.map(row => ({
            duel_id: row.duel_id,
            equipe1: JSON.parse(row.equipe1),
            equipe2: JSON.parse(row.equipe2),
            arene: row.arene,
            stats: JSON.parse(row.stats)
        }));
        return duels;
    } catch (err) {
        console.error('Erreur lors de la restauration des duels:', err);
        return [];
    }
}

// Supprimer un duel en fonction de son duel_id
async function supprimerDuel(id) {
    const query = `DELETE FROM duels WHERE duel_id = $1`;
    try {
        await client.query(query, [id]);
        console.log(`Duel ${id} supprimé avec succès.`);
    } catch (err) {
        console.error('Erreur lors de la suppression du duel:', err);
    }
}

createDuelsTable()

module.exports = {
    sauvegarderDuel,
    restaurerDuels,
    supprimerDuel
};
