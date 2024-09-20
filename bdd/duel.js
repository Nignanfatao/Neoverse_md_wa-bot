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

// Fonction pour créer la table duels
async function createDuelsTable() {
  const client = await pool.connect();
  try {
    // Crée la table duels si elle n'existe pas déjà
    await client.query(`
      CREATE TABLE IF NOT EXISTS duels (
        id SERIAL PRIMARY KEY,           
        team1 TEXT[],                    
        team2 TEXT[],                    
        vie_team1 INT[],                 
        vie_team2 INT[],                 
        energie_team1 INT[],             
        energie_team2 INT[],             
        stamina_team1 INT[],        
        stamina_team2 INT[],             
        status TEXT DEFAULT 'open'
      );
    `);
    console.log('Table duels créée avec succès');
  } catch (error) {
    console.error('Erreur lors de la création de la table duels:', error);
  } finally {
    client.release();
  }
}

// Fonction pour initialiser un duel entre deux joueurs
async function initDuel(team1, team2) {
  const client = await pool.connect();
  const defaultStats = Array(team1.length).fill(100);  // Vie, énergie, et stamina initialisées à 100 pour chaque joueur
  const query = `
    INSERT INTO duels (team1, team2, vie_team1, vie_team2, energie_team1, energie_team2, stamina_team1, stamina_team2)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
  `;
  const values = [team1, team2, defaultStats, defaultStats, defaultStats, defaultStats, defaultStats, defaultStats];
  try {
    const res = await client.query(query, values);
    return res.rows[0];  // Retourne le duel initialisé avec les équipes
  } catch (err) {
    console.error(err);
  }
}

async function updatePlayerStat(duelId, team, playerIndex, stat, value) {
  const client = await pool.connect();
  const column = `${stat}_team${team === 'team1' ? 1 : 2}`;
  const query = `
    UPDATE duels
    SET ${column}[$1] = $2
    WHERE id = $3
    RETURNING *;
  `;
  const values = [playerIndex + 1, value, duelId];  // Les index SQL commencent à 1
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
    const duel = res.rows[0];
    if (duel) {
      duel.team1.forEach((player, index) => {
         });
      duel.team2.forEach((player, index) => {
        });
    }
    return duel;
  } catch (err) {
    console.error(err);
  }
}


async function endDuel(duelId) {
const client = await pool.connect();
  const query = 
    UPDATE duels
    SET status = 'close'
    WHERE id = $1
    RETURNING *;
  ;
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
    updatePlayerStat,
    getDuel,
    endDuel
};
