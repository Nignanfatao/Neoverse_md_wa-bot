const { Pool } = require('pg');
const s = require('../set');

const pool = new Pool({
  connectionString: s.DB,
  ssl: { rejectUnauthorized: false },
});

// Fonction pour créer la table neobet
async function createNeobetTable() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS neobet (
        id SERIAL PRIMARY KEY,
        parieur TEXT DEFAULT 'aucun',
        modo TEXT DEFAULT 'aucun',
        mise INTEGER DEFAULT 0,
        pari1 TEXT DEFAULT 'aucun',
        cote1 NUMERIC DEFAULT 0,
        statut1 TEXT DEFAULT 'aucun',
        pari2 TEXT DEFAULT 'aucun',
        cote2 NUMERIC DEFAULT 0,
        statut2 TEXT DEFAULT 'aucun',
        pari3 TEXT DEFAULT 'aucun',
        cote3 NUMERIC DEFAULT 0,
        statut3 TEXT DEFAULT 'aucun',
        statut_final TEXT DEFAULT 'aucun'
      );
    `);
    console.log('Table neobet créée avec succès.');
  } catch (error) {
    console.error('Erreur lors de la création de la table neobet:', error);
  } finally {
    client.release();
  }
}

// Fonction pour récupérer les données d'un parieur
async function getData(parieur) {
  const client = await pool.connect();
  try {
    const query = 'SELECT * FROM neobet WHERE parieur = $1';
    console.log(`Exécution de la requête : ${query} avec la valeur : [${parieur}]`);
    const result = await client.query(query, [parieur]);
    return result.rows[0];
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    return null;
  } finally {
    client.release();
  }
}

// Fonction pour mettre à jour les données d'un parieur
async function updatePlayerData(updates, parieur) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const update of updates) {
      const query = `UPDATE neobet SET ${update.colonneObjet} = $1 WHERE parieur = $2`;
      console.log(`Exécution de la requête : ${query} avec les valeurs : [${update.newValue}, ${parieur}]`);
      await client.query(query, [update.newValue, parieur]);
    }
    await client.query('COMMIT');
    console.log(`Données mises à jour pour le parieur : ${parieur}`);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Erreur lors de la mise à jour des données:', error);
  } finally {
    client.release();
  }
}

// Fonction pour supprimer une fiche de pari
async function supprimerFiche(parieur) {
  const client = await pool.connect();
  try {
    await client.query('DELETE FROM neobet WHERE parieur = $1', [parieur]);
    console.log(`Fiche de pari de ${parieur} supprimée.`);
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
  } finally {
    client.release();
  }
}

// Fonction pour supprimer toutes les fiches de pari
async function supprimerToutesLesFiches() {
  const client = await pool.connect();
  try {
    await client.query('DELETE FROM neobet');
    console.log('Toutes les fiches de pari ont été supprimées.');
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
  } finally {
    client.release();
  }
}

module.exports = {
  createNeobetTable,
  getData,
  updatePlayerData,
  supprimerFiche,
  supprimerToutesLesFiches,
  pool,
};
