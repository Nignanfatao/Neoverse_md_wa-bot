const { Pool } = require('pg');
const s = require("../set");

const dbUrl = s.DB;
const proConfig = {
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false },
};
const pool = new Pool(proConfig);

async function createParisTable() {
    const client = await pool.connect();
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS paris(
                parieur TEXT PRIMARY KEY,
                moderateur TEXT DEFAULT '',
                somme_misee NUMERIC DEFAULT 0,
                paris_places JSONB DEFAULT '[]'
            );
        `);
        console.log('Table paris créée avec succès.');
    } catch (error) {
        console.error('Erreur lors de la création de la table paris:', error);
    } finally {
        client.release();
    }
}

async function insertParieur(parieur) {
    const client = await pool.connect();
    try {
        const query = `
            INSERT INTO paris(parieur)
            VALUES ($1)
        `;
        await client.query(query, [parieur]);
        console.log(`Parieur ${parieur} ajouté.`);
    } catch (error) {
        console.error("Erreur lors de l'insertion du parieur:", error);
    } finally {
        client.release();
    }
}

async function updateModerateur(parieur, moderateur) {
    const client = await pool.connect();
    try {
        const query = `UPDATE paris SET moderateur = $1 WHERE parieur = $2`;
        await client.query(query, [moderateur, parieur]);
        console.log(`Modérateur ${moderateur} ajouté pour ${parieur}.`);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du modérateur:', error);
    } finally {
        client.release();
    }
}

async function updateSommeMisee(parieur, sommeMisee) {
    const client = await pool.connect();
    try {
        const query = `UPDATE paris SET somme_misee = $1 WHERE parieur = $2`;
        await client.query(query, [sommeMisee, parieur]);
        console.log(`Somme misée ${sommeMisee} ajoutée pour ${parieur}.`);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la somme misée:', error);
    } finally {
        client.release();
    }
}

async function addPari(parieur, nomPari, cote) {
    const client = await pool.connect();
    try {
        const data = await getData(parieur);
        const parisPlaces = data.paris_places || [];
        parisPlaces.push({ nom: nomPari, cote, statut: '' });

        const query = `UPDATE paris SET paris_places = $1 WHERE parieur = $2`;
        await client.query(query, [JSON.stringify(parisPlaces), parieur]);
        console.log(`Pari ${nomPari} ×${cote} ajouté pour ${parieur}.`);
    } catch (error) {
        console.error('Erreur lors de l\'ajout du pari:', error);
    } finally {
        client.release();
    }
}

async function getData(parieur) {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM paris WHERE parieur = $1';
        const result = await client.query(query, [parieur]);
        return result.rows[0];
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    } finally {
        client.release();
    }
}

async function deleteData(parieur) {
    const client = await pool.connect();
    try {
        const query = 'DELETE FROM paris WHERE parieur = $1';
        await client.query(query, [parieur]);
        console.log(`Données de ${parieur} supprimées.`);
    } catch (error) {
        console.error('Erreur lors de la suppression des données:', error);
    } finally {
        client.release();
    }
}

async function deleteAllData() {
    const client = await pool.connect();
    try {
        await client.query('DELETE FROM paris');
        console.log('Tous les paris ont été supprimés.');
    } catch (error) {
        console.error('Erreur lors de la suppression de tous les paris:', error);
    } finally {
        client.release();
    }
}

createParisTable();

module.exports = {
    insertParieur,
    updateModerateur,
    updateSommeMisee,
    addPari,
    getData,
    deleteData,
    deleteAllData,
};
