const { zokou } = require('../framework/zokou');

// Fonction pour générer une chaîne de caractères aléatoire
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

async function simulateHackingLoading(zk, origineMessage, ms) {
    const frames = [
        "*`[🔓] Début du décryptage...`*",
        "*`[🔑] Accès au système...`*",
        "*`[💻] Injection de code...`*",
        "*`[🔒] Contournement des sécurités...`*",
        "*`[📡] Transmission des données...`*",
        "*`[⚠️] Détection de fichiers sensibles...`*",
        "*`[🔓] Décryptage en cours...`*",
        "*`[🔓] Décryptage terminé à 100%`*",
    ];

    try {
        let loadingMessage = await zk.sendMessage(origineMessage, { text: frames[0] });

        for (let i = 1; i < frames.length; i++) {
            await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 seconde entre chaque étape
            await zk.sendMessage(origineMessage, {
                text: `${frames[i]}\n\`\`\`${generateRandomString(30)}\`\`\``, // Ajout de données "cryptées"
                edit: loadingMessage.key,
            });
        }

    } catch (error) {
        console.error("Erreur lors de la simulation du hacking :", error);
        await zk.sendMessage(origineMessage, { text: "Une erreur s'est produite lors du hacking. 😢" });
    }
}

zokou(
    { nomCom: 'hack', categorie: 'Other' }, 
    async (dest, zk, commandeOptions) => {
        const { ms, repondre } = commandeOptions;

        await simulateHackingLoading(zk, dest, ms);
    }
);
