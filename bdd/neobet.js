const { Pool } = require('pg');
const s = require("../set");

const dbUrl = s.DB;
const proConfig = {
  connectionString: dbUrl,
  ssl: { rejectUnauthorized: false },
};

const pool = new Pool(proConfig);

async function createNeobetTable() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS neobet (
        id SERIAL PRIMARY KEY,
        parieur TEXT NOT NULL,
        moderateur TEXT DEFAULT 'aucun',
        mise INTEGER DEFAULT 0,
        pari1 JSONB DEFAULT '{"valeur": "aucun", "cote": 0, "statut": ""}',
        pari2 JSONB DEFAULT '{"valeur": "aucun", "cote": 0, "statut": ""}',
        pari3 JSONB DEFAULT '{"valeur": "aucun", "cote": 0, "statut": ""}'
      );
    `);
    console.log('Table neobet créée avec succès.');
  } catch (error) {
    console.error('Erreur lors de la création de la table neobet:', error);
  } finally {
    client.release();
  }
}

async function getBetData(identifier) {
  const client = await pool.connect();
  try {
    let query;
    let values;

    if (!isNaN(identifier)) {
      query = 'SELECT * FROM neobet WHERE id = $1';
      values = [identifier];
    } else {
      query = 'SELECT * FROM neobet WHERE parieur = $1';
      values = [identifier];
    }

    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
  } finally {
    client.release();
  }
}

async function updateBetData(id, updates) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const query = `
      UPDATE neobet
      SET ${Object.keys(updates).map((key, i) => `${key} = $${i + 1}`).join(', ')}
      WHERE id = $${Object.keys(updates).length + 1}
    `;
    await client.query(query, [...Object.values(updates), id]);
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Erreur lors de la mise à jour des données:', error);
  } finally {
    client.release();
  }
}

async function clearBetData(target) {
  const client = await pool.connect();
  try {
    if (target === 'all') {
      await client.query('DELETE FROM neobet');
    } else {
      if (!isNaN(target)) {
        await client.query('DELETE FROM neobet WHERE id = $1', [target]);
      } else {
        await client.query('DELETE FROM neobet WHERE parieur = $1', [target]);
      }
    }
  } catch (error) {
    console.error('Erreur lors de la suppression des données:', error);
  } finally {
    client.release();
  }
}

async function addBetData(parieur, moderateur, mise) {
  const client = await pool.connect();
  try {
    const query = `
      INSERT INTO neobet (parieur, moderateur, mise)
      VALUES ($1, $2, $3)
      RETURNING id;
    `;
    const values = [parieur, moderateur, mise];
    const result = await client.query(query, values);
    return result.rows[0].id;
  } catch (error) {
    console.error('Erreur lors de l\'ajout du parieur:', error);
  } finally {
    client.release();
  }
}

createNeobetTable();

module.exports = { getBetData, updateBetData, clearBetData, addBetData };
