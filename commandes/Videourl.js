const { zokou } = require("../framework/zokou");
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Configurer Cloudinary avec tes informations API
cloudinary.config({
  cloud_name: 'dwnofjjes',
  api_key: '793659492253343',
  api_secret: 't3PWjDL73aPjm0DqP_1RxNo6BTY',
});

async function uploadVideoToCloudinary(filePath) {
    if (!fs.existsSync(filePath)) {
        throw new Error("Fichier non existant");
    }

    try {
        // Spécifie le type "video" pour l'upload
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: "video"
        });

        // Retourne l'URL sécurisé de la vidéo
        return result.secure_url;
    } catch (error) {
        console.error('Erreur lors de l\'upload de la vidéo sur Cloudinary :', error);
        throw new Error(`Erreur lors de l'upload de la vidéo sur Cloudinary.`);
    }
}

// Commande dédiée à l'upload des vidéos
zokou({ nomCom: "urlv", categorie: "Conversion", reaction: "🎥" }, async (origineMessage, zk, commandeOptions) => {
    const { msgRepondu, repondre } = commandeOptions;

    if (!msgRepondu || !msgRepondu.videoMessage) {
        repondre('Veuillez mentionner une vidéo.');
        return;
    }

    let mediaPath;

    try {
        // Télécharge la vidéo depuis le message
        mediaPath = await zk.downloadAndSaveMediaMessage(msgRepondu.videoMessage);

        // Upload la vidéo sur Cloudinary
        const videoUrl = await uploadVideoToCloudinary(mediaPath);
        
        // Supprime la vidéo après l'upload
        fs.unlinkSync(mediaPath);

        // Répond avec le lien de la vidéo
        repondre(videoUrl);
    } catch (error) {
        console.error('Erreur lors de l\'upload de la vidéo :', error);
        repondre('Erreur lors de l\'upload de la vidéo.');
    }
});
