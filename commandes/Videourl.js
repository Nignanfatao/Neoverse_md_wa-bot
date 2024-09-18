const { zokou } = require("../framework/zokou");
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const axios = require("axios");
const FormData = require("form-data");

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

const imgbbAPIKey = "109d00b272a1b32c5552a60571660c54";  // Remplace par ta clé API

async function uploadToImgBB(Path) {
    if (!fs.existsSync(Path)) {
        throw new Error("Fichier non existant");
    }

    try {
        const form = new FormData();
        form.append("image", fs.createReadStream(Path)); // Ajoute le fichier au formulaire

        const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`, form, {
            headers: {
                ...form.getHeaders(),
            },
        });

        if (data && data.data && data.data.url) {
            return data.data.url; // Retourne l'URL de l'image/vidéo
        } else {
            throw new Error("Erreur lors de la récupération du lien de l'image/vidéo");
        }
    } catch (err) {
        throw new Error(String(err));
    }
}

// Utilisation de la fonction dans ta commande
zokou({ nomCom: "urls", categorie: "Conversion", reaction: "👨🏿‍💻" }, async (origineMessage, zk, commandeOptions) => {
    const { msgRepondu, repondre } = commandeOptions;

    if (!msgRepondu) {
        repondre('Veuillez mentionner une vidéo ou une image.');
        return;
    }

    let mediaPath;

    if (msgRepondu.videoMessage) {
        mediaPath = await zk.downloadAndSaveMediaMessage(msgRepondu.videoMessage);
    } else if (msgRepondu.imageMessage) {
        mediaPath = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage);
    } else {
        repondre('Veuillez mentionner une vidéo ou une image.');
        return;
    }

    try {
        const imgbbUrl = await uploadToImgBB(mediaPath);
        fs.unlinkSync(mediaPath);  // Supprime le fichier après utilisation

        repondre(imgbbUrl);  // Répond avec le lien
    } catch (error) {
        console.error('Erreur lors de la création du lien ImgBB :', error);
        repondre('Erreur lors de la création du lien ImgBB.');
    }
});
