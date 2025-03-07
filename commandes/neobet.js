const { zokou } = require('../framework/zokou');
const { getBetData, updateBetData, clearBetData } = require('../bdd/neobet');
const s = require("../set");
const dbUrl = s.DB;
const { Pool } = require('pg');

function normalizeText(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Fonction pour calculer les gains possibles
function calculateGainsPossibles(mise, paris) {
    let totalGains = 0;
    paris.forEach(pari => {
        totalGains += mise * pari.cote;
    });
    return totalGains;
}

// Fonction pour afficher la fiche de pari
function generateBetMessage(data) {
    return `
⌬𝗡Ξ𝗢𝘃𝗲𝗿𝘀𝗲 𝗕𝗘𝗧🎰
▔▔▔▔▔▔▔▔▔▔▔▔▔░▒▒▒▒░░▒░
👥Parieur: ${data.parieur}
🛡️Modérateur: ${data.moderateur}
💰Somme misée: ${data.mise}🧭

📜 Liste des paris placés:
${data.paris.map((pari, index) => `➤ ${pari.statut || ''} ${pari.valeur} × ${pari.cote}`).join('\n')}

🏧Gains Possibles: ${calculateGainsPossibles(data.mise, data.paris)}🔷

═══════════░▒▒▒▒░░▒░
🔷𝗡Ξ𝗢𝗚𝗮𝗺𝗶𝗻𝗴 2025🎮
    `;
}

// Commande principale pour gérer les paris
zokou(
    { nomCom: 'neobet', reaction: '🎰', categorie: 'NEO_GAMES🎰' },
    async (dest, zk, { repondre, arg, ms, superUser }) => {
        const [action, parieur, operation, ...values] = arg;

        if (!action || !parieur) {
            return repondre('Format: neobet <parieur> [action] [valeur]');
        }

        try {
            let data = await getBetData(parieur);

            if (!data) {
                data = {
                    parieur: parieur,
                    moderateur: 'Aucun',
                    mise: 0,
                    paris: []
                };
            }

            switch (operation) {
                case 'modo':
                    data.moderateur = values.join(' ');
                    break;

                case 'mise':
                    const [signe, valeur] = values;
                    if (signe === '+') {
                        data.mise += parseInt(valeur);
                    } else if (signe === '-') {
                        data.mise -= parseInt(valeur);
                    } else if (signe === '=') {
                        data.mise = parseInt(valeur);
                    }
                    break;

                case 'pari1':
                case 'pari2':
                case 'pari3':
                    const [type, valeurPari, cote] = values;
                    const indexPari = parseInt(operation.replace('pari', '')) - 1;
                    data.paris[indexPari] = {
                        valeur: valeurPari,
                        cote: parseFloat(cote),
                        statut: ''
                    };
                    break;

                case 'statut':
                    const [pariIndex, statut] = values;
                    const pariStatutIndex = parseInt(pariIndex) - 1;
                    if (data.paris[pariStatutIndex]) {
                        data.paris[pariStatutIndex].statut = statut === 'victoire' ? '✅' : '❌';
                    }
                    break;

                default:
                    return repondre(generateBetMessage(data));
            }

            await updateBetData(parieur, data);
            repondre(generateBetMessage(data));
        } catch (error) {
            console.error('Erreur:', error);
            repondre('Une erreur est survenue.');
        }
    }
);

// Commande pour supprimer les fiches de pari
zokou(
    { nomCom: 'clear_bet', reaction: '🧹', categorie: 'Other' },
    async (dest, zk, { repondre, arg, ms, auteurMessage }) => {
        if (arg.length < 1) return repondre('Format: clear_bet <parieur> ou "all" pour tout supprimer.');

        const parieur = arg[0].trim();

        await zk.sendMessage(dest, { text: 'Êtes-vous sûr de vouloir supprimer cette fiche de pari ? Répondez par "oui" ou "non".' }, { quoted: ms });

        const rep = await zk.awaitForMessage({
            sender: auteurMessage,
            chatJid: dest,
            timeout: 60000
        });

        let confirmation;
        try {
            confirmation = rep.message.extendedTextMessage.text;
        } catch {
            confirmation = rep.message.conversation;
        }

        if (!rep) {
            return repondre('Temps écoulé. Suppression annulée.');
        }

        if (confirmation.toLowerCase() !== 'oui') {
            return repondre('Suppression annulée.');
        }

        if (parieur.toLowerCase() === 'all') {
            await clearBetData('all');
            repondre('✅ Toutes les fiches de pari ont été supprimées.');
        } else {
            await clearBetData(parieur);
            repondre(`✅ La fiche de pari de ${parieur} a été supprimée.`);
        }
    }
);
