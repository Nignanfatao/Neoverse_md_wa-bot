const activeCountdowns = {};

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

// Fonction pour arrêter manuellement un décompte
async function stopCountdown(zk, origineMessage) {
    if (activeCountdowns[origineMessage]) {
        clearInterval(activeCountdowns[origineMessage]);
        delete activeCountdowns[origineMessage];
        await zk.sendMessage(origineMessage, { text: "⏹️ Décompte arrêté manuellement." });
    } else {
        await zk.sendMessage(origineMessage, { text: "⚠️ Aucun décompte actif à arrêter." });
    }
}

async function latence({ zk, texte, origineMessage }) {
    const neoTexte = texte.toLowerCase();

    // Vérifie si l'utilisateur veut arrêter un décompte
    if (neoTexte === "stop" || neoTexte.startsWith(`.     ░▒▒░░ *⌬controller📱*░▒▒░░`)) {
        await stopCountdown(zk, origineMessage);
        return;
    }

    // Vérifie si le message commence par "@" et se termine par "next", "nx" ou "nxt"
    const nextWords = ['next', 'nx', 'nxt'];
    if (!(neoTexte.startsWith('@') && nextWords.some(word => neoTexte.endsWith(word)))) {
        return;
    }

    if (activeCountdowns[origineMessage]) {
        await zk.sendMessage(origineMessage, { text: "⚠️ Un décompte est déjà actif ici." });
        return;
    }

    // Initialisation du décompte
    let countdownTime = 6 * 60; // 6 minutes en secondes
    let extraTime = false; // Indicateur pour le temps supplémentaire

    const userMatch = texte.match(/@(\d+)/);
    const user = userMatch ? `${userMatch[1]}@s.whatsapp.net` : null;

    await zk.sendMessage(origineMessage, { text: "⏱️ Début de la latence." });

    activeCountdowns[origineMessage] = setInterval(async () => {
        countdownTime--;

        // Envoie un message lorsqu'il reste 2 minutes
        if (countdownTime === 120 && !extraTime && user) {
            await zk.sendMessage(origineMessage, { text: `⚠️ @${userMatch[1]} il ne reste plus que 2 minutes.`, mentions: [user] });
        }

        // Gestion du temps initial écoulé
        if (countdownTime <= 0 && !extraTime) {
            extraTime = true;
            countdownTime = 60; // Ajoute 1 minute supplémentaire
            await zk.sendMessage(origineMessage, { text: "⚠️ Temps écoulé +1 min" });
        }

        if (countdownTime <= 0 && extraTime) {
            clearInterval(activeCountdowns[origineMessage]);
            delete activeCountdowns[origineMessage];
            await zk.sendMessage(origineMessage, { text: "⚠️ Latence Out" });
        }
    }, 1000);
}

module.exports = latence;
