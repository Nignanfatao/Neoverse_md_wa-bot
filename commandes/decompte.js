const activeCountdowns = {};

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

async function latence({ zk, texte, origineMessage }) {
    const neoTexte = texte.toLowerCase();

    // Gestion de la commande "stop"
    if (neoTexte === "stop" || neoTexte.startsWith(`.     ░▒▒░░ *⌬controller📱*░▒▒░░`)) {
        if (activeCountdowns[origineMessage]) {
            clearInterval(activeCountdowns[origineMessage]);
            delete activeCountdowns[origineMessage];
            //await zk.sendMessage(origineMessage, { text: "⏹️ Décompte arrêté." });
        } else {
            //await zk.sendMessage(origineMessage, { text: "⚠️ Aucun décompte actif à arrêter." });
        }
        return;
    }

    // Vérifie si le message commence par "@" et se termine par "next", "nx" ou "nxt"
    const nextWords = ['next', 'nx', 'nxt'];
    if (!(neoTexte.startsWith('@') && nextWords.some(word => neoTexte.endsWith(word)))) {
        return;
    }

    // Vérifie si un décompte est déjà actif
    if (activeCountdowns[origineMessage]) {
     //   await zk.sendMessage(origineMessage, { text: "⚠️ Un décompte est déjà actif ici." });
        return;
    }

    // Initialisation du décompte
    let countdownTime = 6 * 60; // 6 minutes en secondes
    let extraTime = false; // Indicateur pour le temps supplémentaire

    activeCountdowns[origineMessage] = setInterval(async () => {
        countdownTime--;

        // Envoie un message lorsqu'il reste 2 minutes
        if (countdownTime === 120 && !extraTime) {
            const user = `${neoTexte[0].replace("@", "")}@s.whatsapp.net`;
            await zk.sendMessage(origineMessage, { text: `⚠️ ${neoTexte[0]} il ne reste plus que 2 minutes.`, mentions: [user]});
        }

        // Gestion du temps initial écoulé
        if (countdownTime <= 0 && !extraTime) {
            extraTime = true;
            countdownTime = 60; // Ajoute 1 minute supplémentaire
            await zk.sendMessage(origineMessage, { text: "⚠️ Temps écoulé +1 min" });
        }

        // Gestion du temps supplémentaire écoulé
        if (countdownTime <= 0 && extraTime) {
            clearInterval(activeCountdowns[origineMessage]);
            delete activeCountdowns[origineMessage];
            await zk.sendMessage(origineMessage, { text: "⚠️ Latence Out" });
        }
    }, 1000);

    // Message de démarrage du décompte
    //await zk.sendMessage(origineMessage, { text: "⏱️ Latence Start" });
}

module.exports = latence;
