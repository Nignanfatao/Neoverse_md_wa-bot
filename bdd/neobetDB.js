const { Pool } = require('pg');
const s = require("../set");

const dbUrl = s.DB;
const proConfig = {
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false },
};
const pool = new Pool(proConfig);

async function createNeoBetsTable() {
    const client = await pool.connect();
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS neobets (
                id SERIAL PRIMARY KEY,
                parieur TEXT NOT NULL,
                moderateur TEXT DEFAULT 'aucun',
                mise INTEGER DEFAULT 0,
                paris JSONB DEFAULT '[]',
                gains_possibles INTEGER DEFAULT 0
            );
        `);
        console.log('Table neobets créée avec succès.');
    } catch (error) {
        console.error('Erreur lors de la création de la table neobets:', error);
    } finally {
        client.release();
    }
}

function normalizeText(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

async function addOrUpdateBet(parieur, moderateur, mise, paris) {
    const client = await pool.connect();
    try {
        const gains = paris.reduce((acc, pari) => acc * pari.cote, mise);
        const existingBet = await client.query('SELECT * FROM neobets WHERE parieur = $1', [parieur]);
        if (existingBet.rows.length > 0) {
            await client.query(`
                UPDATE neobets
                SET moderateur = $1, mise = $2, paris = $3, gains_possibles = $4
                WHERE parieur = $5
            `, [moderateur, mise, JSON.stringify(paris), gains, parieur]);
        } else {
            await client.query(`
                INSERT INTO neobets (parieur, moderateur, mise, paris, gains_possibles)
                VALUES ($1, $2, $3, $4, $5)
            `, [parieur, moderateur, mise, JSON.stringify(paris), gains]);
        }
    } catch (error) {
        console.error('Erreur lors de l\'ajout ou de la mise à jour du pari:', error);
    } finally {
        client.release();
    }
}

async function getBet(parieur) {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM neobets WHERE parieur = $1', [parieur]);
        return result.rows[0];
    } catch (error) {
        console.error('Erreur lors de la récupération du pari:', error);
    } finally {
        client.release();
    }
}

async function updateTextValue(parieur, colonne, signe, texte) {
    const client = await pool.connect();
    try {
        const bet = await getBet(parieur);
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

        await client.query(`UPDATE neobets SET ${colonne} = $1 WHERE parieur = $2`, [newValue, parieur]);
        return `✅ ${colonne} mis à jour : ${oldValue} → ${newValue}.`;
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la valeur:', error);
    } finally {
        client.release();
    }
}

async function updateNumericValue(parieur, colonne, signe, valeur) {
    const client = await pool.connect();
    try {
        const bet = await getBet(parieur);
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

        await client.query(`UPDATE neobets SET ${colonne} = $1 WHERE parieur = $2`, [newValue, parieur]);
        return `✅ ${colonne} mis à jour : ${oldValue} → ${newValue}.`;
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la valeur:', error);
    } finally {
        client.release();
    }
}

async function updatePari(parieur, pariIndex, valeur, cote, statut) {
    const client = await pool.connect();
    try {
        const bet = await getBet(parieur);
        if (!bet) return 'Aucun pari trouvé pour ce parieur.';

        const paris = bet.paris;
        if (pariIndex < 0 || pariIndex >= paris.length) return 'Index de pari invalide.';

        if (valeur) paris[pariIndex].valeur = parseFloat(valeur);
        if (cote) paris[pariIndex].cote = parseFloat(cote);
        if (statut) paris[pariIndex].statut = statut;

        await client.query('UPDATE neobets SET paris = $1 WHERE parieur = $2', [JSON.stringify(paris), parieur]);
        return `✅ Pari ${pariIndex + 1} mis à jour.`;
    } catch (error) {
        console.error('Erreur lors de la mise à jour du pari:', error);
    } finally {
        client.release();
    }
}

async function clearBet(parieur) {
    const client = await pool.connect();
    try {
        if (parieur.toLowerCase() === 'all') {
            await client.query('DELETE FROM neobets');
            return '✅ Tous les paris ont été supprimés.';
        } else {
            await client.query('DELETE FROM neobets WHERE parieur = $1', [parieur]);
            return `✅ Le pari de ${parieur} a été supprimé.`;
        }
    } catch (error) {
        console.error('Erreur lors de la suppression du pari:', error);
    } finally {
        client.release();
    }
}

module.exports = {
    createNeoBetsTable,
    addOrUpdateBet,
    getBet,
    updateTextValue,
    updateNumericValue,
    updatePari,
    clearBet
};
