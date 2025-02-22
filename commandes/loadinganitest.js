const activeTimers = {};

async function simulateLoading(zk, origineMessage) {
    const frames = [
        "`❪▬▭▭▭▭▭▭▭▭❫`",
        "`❪▬▬▭▭▭▭▭▭▭❫`",
        "`❪▬▬▬▭▭▭▭▭▭❫`",
        "`❪▬▬▬▬▭▭▭▭▭❫`",
        "`❪▬▬▬▬▬▭▭▭▭❫`",
        "`❪▬▬▬▬▬▬▭▭▭❫`",
        "`❪▬▬▬▬▬▬▬▭▭❫`",
        "`❪▬▬▬▬▬▬▬▬▭❫`",
        "`❪▬▬▬▬▬▬▬▬▬❫`",
        "`❪▬▬▬▬100%▬▬▬❫`"
    ];

    try {
        // Envoyer le message initial avec la première frame
        let loadingMessage = await zk.sendMessage(origineMessage, { text: frames[0] });

        // Parcourir les frames et mettre à jour le message
        for (let i = 1; i < frames.length; i++) {
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Attendre 1 seconde
            await zk.sendMessage(origineMessage, {
                text: frames[i],
                edit: { id: loadingMessage.key.id, remoteJid: origineMessage.key.remoteJid, fromMe: true }
            });
        }

        // Message final une fois le chargement terminé
        await zk.sendMessage(origineMessage, {
            text: "❪▬▬▬▬100%▬▬▬▬❫\nChargement terminé ! 🎉",
            edit: { id: loadingMessage.key.id, remoteJid: origineMessage.key.remoteJid, fromMe: true }
        });
    } catch (error) {
        console.error("Erreur lors de la simulation du chargement :", error);
        // Envoyer un message d'erreur en cas de problème
        await zk.sendMessage(origineMessage, { text: "Une erreur s'est produite lors du chargement. 😢" });
    }
}

async function handleMessage({ zk, texte, origineMessage }) {
    const neoTexte = texte.toLowerCase();

    if (neoTexte.includes("chargement")) {
        await simulateLoading(zk, origineMessage);
    }
}

module.exports = handleMessage;
