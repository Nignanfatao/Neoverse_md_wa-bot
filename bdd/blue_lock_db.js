const { Pool } = require("pg");
const s = require("../set");

const pool = new Pool({
  connectionString: s.DB,
  ssl: { rejectUnauthorized: false },
});

async function createTable() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS blue_lock_db1 (
        id SERIAL PRIMARY KEY,
        e1 TEXT DEFAULT 'aucun', e2 TEXT DEFAULT 'aucun', e3 TEXT DEFAULT 'aucun', e4 TEXT DEFAULT 'aucun',
        e5 INTEGER DEFAULT 0, e6 INTEGER DEFAULT 0, e7 INTEGER DEFAULT 0, e8 INTEGER DEFAULT 0,
        ${Array.from({ length: 50 }, (_, i) => `e${i + 9} INTEGER DEFAULT 0`).join(",\n        ")}
      );
    `);
    console.log('Table créée avec succès');
  } catch (error) {
    console.error('Erreur création table:', error);
  } finally {
    client.release();
  }
}

async function getData(id) {
  const client = await pool.connect();
  try {
    let query = `SELECT * FROM blue_lock_db1 WHERE id = $1`;
    let result = await client.query(query, [id]);

    // Si aucune donnée trouvée, insérer une ligne par défaut
    if (result.rows.length === 0) {
      await client.query(`INSERT INTO blue_lock_db1 DEFAULT VALUES`);
      result = await client.query(`SELECT * FROM blue_lock_db1 ORDER BY id DESC LIMIT 1`);
    }

    return result.rows[0];
  } catch (error) {
    console.error('Erreur récupération données:', error);
  } finally {
    client.release();
  }
}

createTable();

module.exports = { getData };
