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

async function createDuelsTable() {
  const client = await pool.connect();
  try {
    // Créez la table northdiv si elle n'existe pas déjà
    await client.query(`
    CREATE TABLE IF NOT EXISTS duels (
      id SERIAL PRIMARY KEY,
  player1 TEXT NOT NULL,
  player2 TEXT NOT NULL,
  vie_player1 INT DEFAULT 100,
  vie_player2 INT DEFAULT 100,
  energie_player1 INT DEFAULT 100,
  energie_player2 INT DEFAULT 100,
  stamina_player1 INT DEFAULT 100,
  stamina_player2 INT DEFAULT 100,
  status TEXT DEFAULT 'en cours'
);
    `);
    console.log('Table duels créée avec succès');
  } catch (error) {
    console.error('Erreur lors de la création de la table duels:', error);
  } finally {
    client.release();
  }
}

async function initDuel(player1, player2) {
  const client = await pool.connect();
  const query = `
    INSERT INTO duels (player1, player2)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const values = [player1, player2];
  try {
    const res = await client.query(query, values);
    return res.rows[0];  // Retourne la ligne du duel initialisé
  } catch (err) {
    console.error(err);
  }
}

async function updateStats(duelId, player, stat, value) {
  const client = await pool.connect();
  const column = `${stat}_player${player === 'player1' ? 1 : 2}`;
  const query = `
    UPDATE duels
    SET ${column} = $1
    WHERE id = $2
    RETURNING *;
  `;
  const values = [value, duelId];
  try {
    const res = await client.query(query, values);
    return res.rows[0];  // Retourne la ligne du duel mis à jour
  } catch (err) {
    console.error(err);
  }
}

async function getDuel(duelId) {
  const client = await pool.connect();
  const query = `
    SELECT * FROM duels WHERE id = $1;
  `;
  const values = [duelId];
  try {
    const res = await client.query(query, values);
    return res.rows[0];  // Retourne la ligne du duel
  } catch (err) {
    console.error(err);
  }
}

async function endDuel(duelId) {
const client = await pool.connect();
  const query = `
    UPDATE duels
    SET status = 'terminé'
    WHERE id = $1
    RETURNING *;
  `;
  const values = [duelId];
  try {
    const res = await client.query(query, values);
    return res.rows[0];  // Retourne la ligne du duel terminé
  } catch (err) {
    console.error(err);
  }
}


createDuelsTable()

module.exports = {
    initDuel,
    updateStats,
    getDuel,
    endDuel
};
