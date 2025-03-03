const { zokou } = require('../framework/zokou');

async function simulateHacking(zk, origineMessage, ms) {
    const frames = [
        "🛜...⏐",
        "🛜E...⏐",
        "🛜g...⏐",
        "🛜...⏐",
        "🛜H...⏐",
        "🛜Hac...⏐",
        "🛜Hacking...⏐",
        "🛜Ha...⏐",
        "🛜Hacking_&...⏐",
        "🛜Hacking_$...⏐",
        "🛜Hacking_R...⏐",
        "🛜Hacking_Réus...⏐",
        "🛜Hacking_Réussi⏐",
        "🛜Hacking_Réussi✅"
    ];

    try {
        let hackingMessage = await zk.sendMessage(origineMessage, { text: frames[0] });

        for (let i = 1; i < frames.length; i++) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await zk.sendMessage(origineMessage, {
                text: frames[i],
                edit: hackingMessage.key,
            });
        }

    } catch (error) {
        console.error("Erreur lors de la simulation du hacking :", error);
        await zk.sendMessage(origineMessage, { text: "Une erreur s'est produite lors du hacking. 😢" });
    }
}

zokou(
    { nomCom: 'hacking', categorie: 'Other' },
    async (dest, zk, commandeOptions) => {
        const { ms, repondre } = commandeOptions;

        await simulateHacking(zk, dest, ms);
    }
);
