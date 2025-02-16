const { zokou } = require("../framework/zokou");

const arenes = [
    { nom: 'Plaine vide', image: 'https://i.ibb.co/3h71nT1/image.jpg' },
    { nom: 'Desert', image: 'https://i.ibb.co/z2gwsMQ/image.jpg' },
    { nom: 'Zone de glace', image: 'https://i.ibb.co/3F0mK1s/image.jpg' },
    { nom: 'Vallée de la fin', image: 'https://i.ibb.co/VqFgGzF/image.jpg' },
    { nom: 'Au-delà', image: 'https://i.ibb.co/4Wkr6mT/image.jpg' },
    { nom: 'Budokai tenkaichi', image: 'https://i.ibb.co/B429M3M/image.jpg' },
    { nom: 'Ville de jour', image: 'https://i.ibb.co/LRDRH9k/image.jpg' },
    { nom: 'Ville détruite', image: 'https://i.ibb.co/80R07hR/image.jpg' }
];

const duelsEnCours = {};
let lastArenaIndex = -1;

function tirerAr() {
    let index;
    do {
        index = Math.floor(Math.random() * arenes.length);
    } while (index === lastArenaIndex);
    lastArenaIndex = index;
    return arenes[index];
}

// Fonction pour générer la fiche de duel
function generateFicheDuel(duel) {
    return `*🆚𝗩𝗘𝗥𝗦𝗨𝗦 𝗔𝗥𝗘𝗡𝗔 𝗕𝗔𝗧𝗧𝗟𝗘🏆🎮*
░░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
🔷 *${duel.equipe1[0].nom}*: 🫀:${duel.equipe1[0].stats.sta}% 🌀:${duel.equipe1[0].stats.energie}% ❤️:${duel.equipe1[0].stats.vie}%
                                   ~  *🆚*  ~
🔷 *${duel.equipe2[0].nom}*: 🫀:${duel.equipe2[0].stats.sta}% 🌀:${duel.equipe2[0].stats.energie}% ❤️:${duel.equipe2[0].stats.vie}%
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

*🌍𝐀𝐫𝐞̀𝐧𝐞*: ${duel.arene.nom}
*🚫𝐇𝐚𝐧𝐝𝐢𝐜𝐚𝐩𝐞*: Boost 1 fois chaque 2 tours!
*⚖️𝐒𝐭𝐚𝐭𝐬*: ${duel.statsCustom}
*🏞️ 𝐀𝐢𝐫 𝐝𝐞 𝐜𝐨𝐦𝐛𝐚𝐭*: illimitée
*🦶🏼𝐃𝐢𝐬𝐭𝐚𝐧𝐜𝐞 𝐢𝐧𝐢𝐭𝐢𝐚𝐥𝐞*📌: 5m
*⌚𝐋𝐚𝐭𝐞𝐧𝐜𝐞*: 6mins+ 1⚠️
*⭕𝐏𝐨𝐫𝐭𝐞́𝐞*: 10m
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

*⚠️Vous avez 🔟 tours max pour finir votre Adversaire! Sinon la victoire sera donnée par décision selon celui qui a dominé le combat ou qui a été le plus offensif !*`;
}

zokou(
    { nomCom: 'duel', categorie: 'Other' },
    async (dest, zk, { repondre, arg, ms }) => {
        if (!arg[0]) {
            return repondre('Format: +duel joueur1 vs joueur2 / stats. Ex: +duel Hakuji vs Damian / Hakuji +2');
        }

        try {
            const input = arg.join(' ');
            const [joueursInput, statsCustom] = input.split('/').map(p => p.trim());
            const [equipe1Str, equipe2Str] = joueursInput.split('vs').map(p => p.trim());

            if (!equipe1Str || !equipe2Str) return repondre('Erreur de format !');

            const equipe1 = equipe1Str.split(',').map(n => ({ nom: n.trim(), stats: { sta: 100, energie: 100, vie: 100 } }));
            const equipe2 = equipe2Str.split(',').map(n => ({ nom: n.trim(), stats: { sta: 100, energie: 100, vie: 100 } }));
            const areneT = tirerAr();

            const duelKey = `${equipe1Str} vs ${equipe2Str}`;
            duelsEnCours[duelKey] = { equipe1, equipe2, statsCustom, arene: areneT };

            const ficheDuel = generateFicheDuel(duelsEnCours[duelKey]);
            await zk.sendMessage(dest, { image: { url: areneT.image }, caption: ficheDuel }, { quoted: ms });

        } catch (error) {
            console.error('Erreur lors du duel:', error);
            repondre('Une erreur est survenue.');
        }
    }
);

// Commande pour modifier les stats d'un joueur en duel
zokou(
    { nomCom: 'duel_stats', categorie: 'Other' },
    (dest, zk, { repondre, arg, ms }) => {
        if (arg.length < 4) return repondre('Format: @NomDuJoueur stat +/- valeur');

        const [joueurId, stat, signe, valeurStr] = arg;
        const valeur = parseInt(valeurStr);
        if (isNaN(valeur)) return repondre('Valeur invalide.');

        const duelKey = Object.keys(duelsEnCours).find(key => key.includes(joueurId));
        if (!duelKey) return repondre('Joueur non trouvé.');

        const duel = duelsEnCours[duelKey];
        const joueur = duel.equipe1.find(j => j.nom === joueurId) || duel.equipe2.find(j => j.nom === joueurId);
        if (!joueur || !['sta', 'energie', 'vie'].includes(stat)) return repondre('Stat invalide.');

        joueur.stats[stat] += (signe === '-' ? -valeur : valeur);
        const ficheDuel = generateFicheDuel(duel);

        zk.sendMessage(dest, { image: { url: duel.arene.image }, caption: ficheDuel }, { quoted: ms });
    }
);
