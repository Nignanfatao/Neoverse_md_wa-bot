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
    console.log('Duel initialisé avec succès');
    return res.rows[0];  // Retourne le duel initialisé
  } catch (err) {
    console.error('Erreur lors de l\'initialisation du duel:', err);
  } finally {
    client.release();
  }
}

// Fonction pour mettre à jour les statistiques d'un joueur
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
    console.log(`Statistique ${stat} du ${player} mise à jour`);
    return res.rows[0];  // Retourne le duel mis à jour
  } catch (err) {
    console.error(`Erreur lors de la mise à jour des statistiques de ${player}:`, err);
  } finally {
    client.release();
  }
}

// Fonction pour récupérer un duel spécifique
async function getDuel(duelId) {
  const client = await pool.connect();
  const query = `
    SELECT * FROM duels WHERE id = $1;
  `;
  const values = [duelId];
  try {
    const res = await client.query(query, values);
    console.log(`Duel ID ${duelId} récupéré avec succès`);
    return res.rows[0];  // Retourne les informations du duel
  } catch (err) {
    console.error(`Erreur lors de la récupération du duel ID ${duelId}:`, err);
  } finally {
    client.release();
  }
}

// Fonction pour terminer un duel
async function endDuel(duelId) {
  const client = await pool.connect();
  const query = `
    UPDATE duels
    SET status = 'close'
    WHERE id = $1
    RETURNING *;
  `;
  const values = [duelId];
  try {
    const res = await client.query(query, values);
    console.log(`Duel ID ${duelId} terminé avec succès`);
    return res.rows[0];  // Retourne le duel terminé
  } catch (err) {
    console.error(`Erreur lors de la terminaison du duel ID ${duelId}:`, err);
  } finally {
    client.release();
  }
}

// Créer la table duels au démarrage
createDuelsTable();

module.exports = {
  initDuel,
  updateStats,
  getDuel,
  endDuel,
};
