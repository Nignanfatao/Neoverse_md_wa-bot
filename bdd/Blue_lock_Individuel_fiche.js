const { Pool } = require("pg");
const s = require("../set");

const pool = new Pool({
  connectionString: s.DB,
  ssl: { rejectUnauthorized: false },
});

// 📌 Fonction générique pour créer une table avec plusieurs IDs
async function createTable(tableName, columnCount = 50) {
  const client = await pool.connect();
  try {
    const columns = `
      id SERIAL PRIMARY KEY,
      e1 TEXT DEFAULT 'aucun', e2 TEXT DEFAULT 'aucun', e3 TEXT DEFAULT 'aucun', e4 TEXT DEFAULT 'aucun',
      e5 TEXT DEFAULT 'aucun', e6 TEXT DEFAULT 'aucun', e7 INTEGER DEFAULT 0, e8 INTEGER DEFAULT 0,
      e9 INTEGER DEFAULT 0, e10 INTEGER DEFAULT 0, e11 INTEGER DEFAULT 0, e12 INTEGER DEFAULT 0,
      e13 INTEGER DEFAULT 0, e14 INTEGER DEFAULT 10, e15 INTEGER DEFAULT 10, e16 INTEGER DEFAULT 10,
      e17 INTEGER DEFAULT 10, e18 INTEGER DEFAULT 10, e19 INTEGER DEFAULT 10, e20 INTEGER DEFAULT 10,
      e21 TEXT DEFAULT 'aucun'
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

// 📌 Création et exécution pour la table Blue_lock_Individuel_fiche
async function init() {
  await createTable("Blue_lock_Individuel_fiche", 50); // Par défaut, 50 ids
}

init();

module.exports = { getData };
