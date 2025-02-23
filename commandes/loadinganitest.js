const { zokou } = require('../framework/zokou');

async function simulateGradientLoading(zk, origineMessage, ms) {
    const gradientFrames = [
        "*`▓░░░░[10%]░░░░░`*",
        "*`▓▓░░░[20%]░░░░░`*",
        "*`▓▓▓░░[30%]░░░░░`*",
        "*`▓▓▓▓░[40%]░░░░░`*",
        "*`▓▓▓▓▓[50%]░░░░░`*",
        "*`▓▓▓▓▓[60%]▓░░░░`*",
        "*`▓▓▓▓▓[70%]▓▓░░░`*",
        "*`▓▓▓▓▓[80%]▓▓▓░░`*",
        "*`▓▓▓▓▓[90%]▓▓▓▓░`*",
        "*`▓▓▓▓▓[100%]▓▓▓▓▓`*",
    ];

    try {
        let loadingMessage = await zk.sendMessage(origineMessage, { text: gradientFrames[0] });

        for (let i = 1; i < gradientFrames.length; i++) {
            await new Promise((resolve) => setTimeout(resolve, 500));
            await zk.sendMessage(origineMessage, {
                text: gradientFrames[i],
                edit: loadingMessage.key,
            });
        }

    } catch (error) {
        console.error("Erreur lors de la simulation du chargement :", error);
        await zk.sendMessage(origineMessage, { text: "Une erreur s'est produite lors du chargement. 😢" });
    }
}

zokou(
    { nomCom: 'chargement', categorie: 'Other' }, 
    async (dest, zk, commandeOptions) => {
        const { ms, repondre } = commandeOptions;

        await simulateGradientLoading(zk, dest, ms);
    }
);
