const { Pool } = require("pg");
const s = require("../set");

const pool = new Pool({
  connectionString: s.DB,
  ssl: { rejectUnauthorized: false },
});

// 📌 Fonction générique pour créer une table
async function createTable(tableName, columnCount = 50) {
  const client = await pool.connect();
  try {
    const columns = `
      id SERIAL PRIMARY KEY,
      e1 TEXT DEFAULT 'aucun', e2 TEXT DEFAULT 'aucun', e3 TEXT DEFAULT 'aucun', e4 TEXT DEFAULT 'aucun',
      e5 TEXT DEFAULT 'aucun', e6 TEXT DEFAULT 'aucun', e7 TEXT DEFAULT 'aucun', e8 TEXT DEFAULT 'aucun',
      ${Array.from({ length: columnCount }, (_, i) => `e${i + 9} INTEGER DEFAULT 0`).join(",\n      ")}
    `;

    await client.query(`CREATE TABLE IF NOT EXISTS ${tableName} (${columns});`);
    console.log(`✅ Table '${tableName}' créée avec succès`);
  } catch (error) {
    console.error(`❌ Erreur création table '${tableName}':`, error);
  } finally {
    client.release();
  }
}

// 📌 Fonction générique pour récupérer des données et insérer une ligne par défaut si nécessaire
async function getData(tableName, id) {
  const client = await pool.connect();
  try {
    let query = `SELECT * FROM ${tableName} WHERE id = $1`;
    let result = await client.query(query, [id]);

    // Si aucune donnée trouvée, insérer une ligne par défaut
    if (result.rows.length === 0) {
      await client.query(`INSERT INTO ${tableName} DEFAULT VALUES`);
      result = await client.query(`SELECT * FROM ${tableName} ORDER BY id DESC LIMIT 1`);
    }

    return result.rows[0];
  } catch (error) {
    console.error(`❌ Erreur récupération données de '${tableName}':`, error);
  } finally {
    client.release();
  }
}

// 📌 Création et exécution pour plusieurs tables
async function init() {
  await createTable("blue_lock_db1", 50);
  await createTable("blue_lock_db2", 50);
  await createTable("blue_lock_db3", 50);
}

init();

module.exports = { getData };
