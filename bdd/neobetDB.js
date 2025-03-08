const { Pool } = require('pg');
const s = require("../set");

const dbUrl = s.DB;
const proConfig = {
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false },
};
const pool = new Pool(proConfig);

// Créer les tables au démarrage
async function createTables() {
    const client = await pool.connect();
    try {
        // Table pour les parieurs
        await client.query(`
            CREATE TABLE IF NOT EXISTS parieurs (
                id SERIAL PRIMARY KEY,
                nom TEXT NOT NULL UNIQUE
            );
        `);

        // Table pour les paris
        await client.query(`
            CREATE TABLE IF NOT EXISTS neobets (
                id SERIAL PRIMARY KEY,
                parieur_id INTEGER REFERENCES parieurs(id),
                moderateur TEXT DEFAULT 'aucun',
                mise INTEGER DEFAULT 0,
                paris JSONB DEFAULT '[]',
                gains_possibles INTEGER DEFAULT 0
            );
        `);
    } catch (error) {
        console.error('Erreur lors de la création des tables:', error);
    } finally {
        client.release();
    }
}

// Normaliser le texte (supprimer les accents)
function normalizeText(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Ajouter ou mettre à jour un pari
async function addOrUpdateBet(parieurNom, moderateur, mise, paris) {
    const client = await pool.connect();
    try {
        // Vérifier si le parieur existe
        let parieur = await client.query('SELECT id FROM parieurs WHERE nom = $1', [parieurNom]);
        if (parieur.rows.length === 0) {
            // Créer un nouveau parieur s'il n'existe pas
            parieur = await client.query('INSERT INTO parieurs (nom) VALUES ($1) RETURNING id', [parieurNom]);
        } else {
            parieur = parieur.rows[0];
        }

        const parieurId = parieur.id;

        // Calculer les gains possibles
        const gains = paris.reduce((acc, pari) => acc * pari.cote, mise);

        // Vérifier si le pari existe déjà
        const existingBet = await client.query('SELECT * FROM neobets WHERE parieur_id = $1', [parieurId]);
        if (existingBet.rows.length > 0) {
            // Mettre à jour le pari existant
            await client.query(`
                UPDATE neobets
                SET moderateur = $1, mise = $2, paris = $3, gains_possibles = $4
                WHERE parieur_id = $5
            `, [moderateur, mise, JSON.stringify(paris), gains, parieurId]);
        } else {
            // Ajouter un nouveau pari
            await client.query(`
                INSERT INTO neobets (parieur_id, moderateur, mise, paris, gains_possibles)
                VALUES ($1, $2, $3, $4, $5)
            `, [parieurId, moderateur, mise, JSON.stringify(paris), gains]);
        }
    } catch (error) {
        console.error('Erreur lors de l\'ajout ou de la mise à jour du pari:', error);
    } finally {
        client.release();
    }
}

// Récupérer les informations d'un pari
async function getBet(parieurNom) {
    const client = await pool.connect();
    try {
        const result = await client.query(`
            SELECT neobets.*, parieurs.nom AS parieur
            FROM neobets
            JOIN parieurs ON neobets.parieur_id = parieurs.id
            WHERE parieurs.nom = $1
        `, [parieurNom]);
        return result.rows[0];
    } catch (error) {
        console.error('Erreur lors de la récupération du pari:', error);
    } finally {
        client.release();
    }
}

// Mettre à jour une valeur textuelle
async function updateTextValue(parieurNom, colonne, signe, texte) {
    const client = await pool.connect();
    try {
        const bet = await getBet(parieurNom);
        if (!bet) return 'Aucun pari trouvé pour ce parieur.';

        const oldValue = bet[colonne];
        let newValue;

        if (signe === '=') {
            newValue = texte.join(' ');
        } else if (signe === 'add') {
            newValue = oldValue + ' ' + texte.join(' ');
        } else if (signe === 'supp') {
            newValue = oldValue.replace(new RegExp(`\\b${normalizeText(texte.join(' '))}\\b`, 'gi'), '').trim();
        } else {
            return 'Signe non reconnu. Utilisez =, add, ou supp.';
        }

        await client.query(`UPDATE neobets SET ${colonne} = $1 WHERE parieur_id = $2`, [newValue, bet.parieur_id]);
        return `✅ ${colonne} mis à jour : ${oldValue} → ${newValue}.`;
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la valeur:', error);
        return 'Erreur lors de la mise à jour de la valeur.';
    } finally {
        client.release();
    }
}

// Mettre à jour une valeur numérique
async function updateNumericValue(parieurNom, colonne, signe, valeur) {
    const client = await pool.connect();
    try {
        const bet = await getBet(parieurNom);
        if (!bet) return 'Aucun pari trouvé pour ce parieur.';

        const oldValue = bet[colonne];
        let newValue;

        if (signe === '=') {
            newValue = parseFloat(valeur);
        } else if (signe === '+') {
            newValue = oldValue + parseFloat(valeur);
        } else if (signe === '-') {
            newValue = oldValue - parseFloat(valeur);
        } else {
            return 'Signe non reconnu. Utilisez =, +, ou -.';
        }

        await client.query(`UPDATE neobets SET ${colonne} = $1 WHERE parieur_id = $2`, [newValue, bet.parieur_id]);
        return `✅ ${colonne} mis à jour : ${oldValue} → ${newValue}.`;
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la valeur:', error);
        return 'Erreur lors de la mise à jour de la valeur.';
    } finally {
        client.release();
    }
}

// Mettre à jour un pari
async function updatePari(parieurNom, pariIndex, valeur, cote, statut) {
    const client = await pool.connect();
    try {
        const bet = await getBet(parieurNom);
        if (!bet) return 'Aucun pari trouvé pour ce parieur.';

        const paris = bet.paris;
        if (pariIndex < 0 || pariIndex >= paris.length) return 'Index de pari invalide.';

        if (valeur) paris[pariIndex].valeur = parseFloat(valeur);
        if (cote) paris[pariIndex].cote = parseFloat(cote);
        if (statut) paris[pariIndex].statut = statut;

        await client.query('UPDATE neobets SET paris = $1 WHERE parieur_id = $2', [JSON.stringify(paris), bet.parieur_id]);
        return `✅ Pari ${pariIndex + 1} mis à jour.`;
    } catch (error) {
        console.error('Erreur lors de la mise à jour du pari:', error);
        return 'Erreur lors de la mise à jour du pari.';
    } finally {
        client.release();
    }
}

// Supprimer un pari
async function clearBet(parieurNom) {
    const client = await pool.connect();
    try {
        if (parieurNom.toLowerCase() === 'all') {
            await client.query('DELETE FROM neobets');
            return '✅ Tous les paris ont été supprimés.';
        } else {
            const parieur = await client.query('SELECT id FROM parieurs WHERE nom = $1', [parieurNom]);
            if (parieur.rows.length === 0) return 'Aucun parieur trouvé.';

            await client.query('DELETE FROM neobets WHERE parieur_id = $1', [parieur.rows[0].id]);
            return `✅ Le pari de ${parieurNom} a été supprimé.`;
        }
    } catch (error) {
        console.error('Erreur lors de la suppression du pari:', error);
        return 'Erreur lors de la suppression du pari.';
    } finally {
        client.release();
    }
}

module.exports = {
    createTables,
    addOrUpdateBet,
    getBet,
    updateTextValue,
    updateNumericValue,
    updatePari,
    clearBet
};
