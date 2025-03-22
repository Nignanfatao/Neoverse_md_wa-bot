const { Pool } = require("pg");
const s = require("../set");

const pool = new Pool({
  connectionString: s.DB,
  ssl: { rejectUnauthorized: false },
});

// 📌 Création de la table
async function createTable() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS blue_lock_stats (
        id TEXT PRIMARY KEY,
        nom TEXT NOT NULL,
        ${[...Array(15).keys()].map(i => `joueur${i + 1} TEXT DEFAULT 'aucun'`).join(", ")},
        ${[...Array(10).keys()].map(i => `stat${i + 1} INTEGER DEFAULT 100`).join(", ")}
      );
    `);
    console.log("✅ Table créée avec succès");
  } catch (error) {
    console.error("❌ Erreur création table:", error);
  } finally {
    client.release();
  }
}
createTable()

// 📌 Sauvegarde d'un utilisateur
async function saveUser(id, nom) {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM blue_lock_stats WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      await client.query("INSERT INTO blue_lock_stats (id, nom) VALUES ($1, $2)", [id, nom]);
      return "✅ Joueur enregistré avec succès.";
    }
    return "⚠️ Ce joueur est déjà enregistré.";
  } catch (error) {
    console.error("❌ Erreur lors de l'enregistrement:", error);
    return "❌ Une erreur est survenue lors de l'enregistrement.";
  } finally {
    client.release();
  }
}

// 📌 Récupération des données d'un joueur
async function getUserData(id) {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM blue_lock_stats WHERE id = $1", [id]);
    return result.rows[0] || null;
  } catch (error) {
    console.error("❌ Erreur récupération données:", error);
    return null;
  } finally {
    client.release();
  }
}

// 📌 Mise à jour des joueurs
async function updatePlayers(userId, updates) {
  const client = await pool.connect();
  try {
    const existingData = await getUserData(userId);
    if (!existingData) return "⚠️ Joueur introuvable.";

    const updateFields = Object.keys(updates);
    const updateValues = Object.values(updates);
    const setQuery = updateFields.map((key, i) => `${key} = $${i + 2}`).join(", ");

    await client.query(`UPDATE blue_lock_stats SET ${setQuery} WHERE id = $1`, [userId, ...updateValues]);
    return `✅ Mises à jour effectuées pour ${existingData.nom}`;
  } catch (error) {
    console.error("❌ Erreur mise à jour joueurs:", error);
    return "❌ Une erreur est survenue lors de la mise à jour.";
  } finally {
    client.release();
  }
}

// 📌 Mise à jour d'une statistique spécifique
async function updateStats(userId, statKey, signe, newValue) {
  const client = await pool.connect();
  try {
    const existingData = await getUserData(userId);
    if (!existingData) return "⚠️ Joueur introuvable.";

    const oldValue = existingData[statKey] || 0; // Prend 0 si aucune valeur existante
    const updatedValue = signe === "+" ? oldValue + newValue : oldValue - newValue;

    await client.query(`UPDATE blue_lock_stats SET ${statKey} = $2 WHERE id = $1`, [userId, updatedValue]);

    return `✅ ${statKey.replace("stat", "Statistique ")} mise à jour : ${oldValue} ${signe} ${newValue} = ${updatedValue} pour ${existingData.nom}`;
  } catch (error) {
    console.error("❌ Erreur mise à jour stats:", error);
    return "❌ Une erreur est survenue lors de la mise à jour.";
  } finally {
    client.release();
  }
}

// 📌 Réinitialisation des statistiques
async function resetStats(userId) {
  const client = await pool.connect();
  try {
    const existingData = await getUserData(userId);
    if (!existingData) return "⚠️ Joueur introuvable.";

    await client.query(
      `UPDATE blue_lock_stats SET ${[...Array(10).keys()].map(i => `stat${i + 1} = 100`).join(", ")} WHERE id = $1`,
      [userId]
    );
    return `✅ Toutes les stats ont été remises à 100 pour ${existingData.nom}!`;
  } catch (error) {
    console.error("❌ Erreur réinitialisation stats:", error);
    return "❌ Une erreur est survenue lors de la réinitialisation.";
  } finally {
    client.release();
  }
}

module.exports = {
  saveUser,
  getUserData,
  updatePlayers,
  updateStats,
  resetStats,
};
