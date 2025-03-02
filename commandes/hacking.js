const { zokou } = require('../framework/zokou');

async function simulateLoading(zk, origineMessage, ms) {
    const frames = [
        "*`Hacking in process`*",
        "*`$&193...⏐`*",
        "*`1GherRlO...⏐`*",
        "*`hsdgOe...⏐`*",
        "*`Hc#8m...⏐`*",
        "*`K!jD4...⏐`*",
        "*`HaP$r...⏐`*",
        "*`H1k&s...⏐`*",
        "*`H2C*t...⏐`*",
        "*`H3K^u...⏐`*",
        "*`H4A%v...⏐`*",
        "*`H5C(w...⏐`*",
        "*`H6K)x...⏐`*",
        "*`H7A+y...⏐`*",
        "*`H8C=z...⏐`*",
        "*`H9K{a...⏐`*",
        "*`H0A}b...⏐`*",
        "*`HACKc...⏐`*",
        "*`HACKd...⏐`*",
        "*`HACKe...⏐`*",
        "*`HACKf...⏐`*",
        "*`HACKg...⏐`*",
        "*`HACKh...⏐`*",
        "*`HACKi...⏐`*",
        "*`HACKj...⏐`*",
        "*`HACKk...⏐`*",
        "*`HACKl...⏐`*",
        "*`HACKm...⏐`*",
        "*`HACKn...⏐`*",
        "*`HACKING...⏐`*",
        "*`HACKING RÉUSSI ! ✅`*"
    ];

    try {
        let loadingMessage = await zk.sendMessage(origineMessage, { text: frames[0] });

        for (let i = 1; i < frames.length; i++) {
            await new Promise((resolve) => setTimeout(resolve, 200)); // 200ms entre chaque frame (vitesse rapide)
            await zk.sendMessage(origineMessage, {
                text: frames[i],
                edit: loadingMessage.key,
            });
        }

    } catch (error) {
        console.error("Erreur lors de la simulation du chargement :", error);
        await zk.sendMessage(origineMessage, { text: "Une erreur s'est produite lors du chargement. 😢" });
    }
}

zokou(
    { nomCom: 'hack', categorie: 'Hacking' }, 
    async (dest, zk, commandeOptions) => {
        const { ms, repondre } = commandeOptions;

        await simulateLoading(zk, dest, ms);
    }
);
