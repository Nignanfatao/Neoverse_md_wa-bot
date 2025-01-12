const activeCountdowns = {};

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

async function latence({ zk, texte, origineMessage }) {
    const neoTexte = texte.toLowerCase().replace(/\s+/g, ' ').trim();

    if (neoTexte === "stop" || neoTexte.startsWith(". ░▒▒░░ *⌬CONTROLLER📱*░▒▒░░")) {
        if (activeCountdowns[origineMessage]) {
            clearInterval(activeCountdowns[origineMessage]);
            delete activeCountdowns[origineMessage];
            await zk.sendMessage(origineMessage, { text: "🛑 Décompte arrêté." });
        } else {
            await zk.sendMessage(origineMessage, { text: "⚠️ Aucun décompte actif à arrêter." });
        }
        return;
    }

    const nextWords = ['next', 'nx', 'nxt'];

    if (!(neoTexte.startsWith('@') && nextWords.some(word => neoTexte.endsWith(word)))) {
        return;
    }

    if (activeCountdowns[origineMessage]) {
        await zk.sendMessage(origineMessage, { text: "⚠️ Un décompte est déjà actif ici." });
        return;
    }

    let countdownTime = 6 * 60;
    let extraTime = false;

    activeCountdowns[origineMessage] = setInterval(async () => {
        countdownTime--;

        if (countdownTime <= 0 && !extraTime) {
            extraTime = true;
            countdownTime = 60;
            await zk.sendMessage(origineMessage, { text: "⚠️ Temps Écoulé +1 min" });
        } else if (countdownTime <= 0 && extraTime) {
            clearInterval(activeCountdowns[origineMessage]);
            delete activeCountdowns[origineMessage];
            await zk.sendMessage(origineMessage, { text: "⚠️ Latence Out" });
        } else if (!extraTime && countdownTime % 60 === 0) {
            await zk.sendMessage(origineMessage, { text: `⏳ Temps restant : ${formatTime(countdownTime)}.` });
        }
    }, 1000);

    await zk.sendMessage(origineMessage, { text: "⏱️ Latence Start" });
}

module.exports = latence;
