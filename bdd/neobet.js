const { Pool } = require("pg");
const s = require("../set");

const dbUrl = s.DB;
const proConfig = {
    connectionString: dbUrl,
    ssl: {
        rejectUnauthorized: false,
    },
};

const pool = new Pool(proConfig);

// Créer la table pour les paris
async function createBetTable() {
    const client = await pool.connect();
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS neobet (
                parieur TEXT PRIMARY KEY,
                moderateur TEXT DEFAULT 'Aucun',
                mise INTEGER DEFAULT 0,
                paris JSONB DEFAULT '[]'
            );
        `);
        console.log('Table neobet créée avec succès.');
    } catch (error) {
        console.error('Erreur lors de la création de la table:', error);
    } finally {
        client.release();
    }
}

// Récupérer les données d'un parieur
async function getBetData(parieur) {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM neobet WHERE parieur = $1';
        const result = await client.query(query, [parieur]);
        return result.rows[0];
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    } finally {
        client.release();
    }
}

// Mettre à jour les données d'un parieur
async function updateBetData(parieur, data) {
    const client = await pool.connect();
    try {
        const query = `
            INSERT INTO neobet (parieur, moderateur, mise, paris)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (parieur)
            DO UPDATE SET moderateur = $2, mise = $3, paris = $4;
        `;
        await client.query(query, [data.parieur, data.moderateur, data.mise, JSON.stringify(data.paris)]);
    } catch (error) {
        console.error('Erreur lors de la mise à jour des données:', error);
    } finally {
        client.release();
    }
}

// Supprimer les données d'un parieur ou toutes les données
async function clearBetData(parieur) {
    const client = await pool.connect();
    try {
        if (parieur === 'all') {
            await client.query('DELETE FROM neobet');
        } else {
            await client.query('DELETE FROM neobet WHERE parieur = $1', [parieur]);
        }
    } catch (error) {
        console.error('Erreur lors de la suppression des données:', error);
    } finally {
        client.release();
    }
}

// Initialiser la table
createBetTable();

module.exports = {
    getBetData,
    updateBetData,
    clearBetData
};
