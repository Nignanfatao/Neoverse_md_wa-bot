const activeLocations = {};

function formatDistance(distance) {
    if (distance <= 10) {
        return "très proche";
    } else if (distance <= 50) {
        return "proche";
    } else if (distance <= 100) {
        return "à une certaine distance";
    } else {
        return "loin";
    }
}

async function handleLocation({ zk, texte, origineMessage }) {
    const neoTexte = texte.toLowerCase();

    const positionMatch = neoTexte.match(/🌏position\s*:\s*(\d+)km/i);

    if (positionMatch) {
        const distance = parseInt(positionMatch[1], 10); 

        if (!isNaN(distance)) {
            const distanceText = formatDistance(distance);

            await zk.sendMessage(origineMessage, {
                text: `🌏 Bienvenue à Chinatown ! Vous êtes ${distanceText}. (Distance : ${distance} km)`,
            });
        } else {
            await zk.sendMessage(origineMessage, {
                text: "⚠️ Format de distance invalide. Utilisez '🌏position : Xkm'.",
            });
        }
    }
}

module.exports = handleLocation;
