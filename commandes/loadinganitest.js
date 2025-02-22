const { zokou } = require('../framework/zokou');

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
        let loadingMessage = await zk.sendMessage(origineMessage, { text: frames[0] });

        for (let i = 1; i < frames.length; i++) {
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Attendre 1 seconde
            await zk.sendMessage(origineMessage, {
                text: frames[i],
                edit: loadingMessage.key,
            });
        }

        await zk.sendMessage(origineMessage, {
            text: "❪▬▬▬▬100%▬▬▬▬❫\nChargement terminé ! 🎉",
            edit: loadingMessage.key,
        });
await zk.sendMessage(origineMessage, {
            text: "Chargement test"}, 
    {quoted: ms});

    } catch (error) {
        console.error("Erreur lors de la simulation du chargement :", error);
        await zk.sendMessage(origineMessage, { text: "Une erreur s'est produite lors du chargement. 😢" });
    }
}

zokou(
    { nomCom: 'chargement', categorie: 'Other' }, 
    async (dest, zk, commandeOptions) => {
        const { ms, repondre } = commandeOptions;

        await simulateLoading(zk, dest);
    }
);
