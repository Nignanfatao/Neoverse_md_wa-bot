const { zokou } = require('../framework/zokou');
const { cards } = require('./cards');

// Fonction pour tirer une probabilité et retourner le grade correspondant
function tirerProbabilite(probabilities) {
    const random = Math.random() * 100;
    let cumulativeProbability = 0;
    
    for (let i = 0; i < probabilities.length; i++) {
        cumulativeProbability += probabilities[i].probability;
        if (random < cumulativeProbability) {
            return probabilities[i].grade;
        }
    }
    return probabilities[probabilities.length - 1].grade;
}

// Fonction pour tirer une sous catégorie
function tirerCategorie(probabilities) {
    const random = Math.random() * 100;
    let cumulativeProbability = 0;

    for (let i = 0; i < probabilities.length; i++) {
        cumulativeProbability += probabilities[i].probability;
        if (random < cumulativeProbability) {
            return probabilities[i].subCategory;
        }
    }
    return probabilities[probabilities.length - 1].subCategory;
}

// Fonction utilitaire pour obtenir toutes les catégories disponibles dans une imageCategory
function getAllCategories(Acategory) {
    const categories = new Set();
    cards[Acategory].forEach(card => {
        categories.add(card.category);
    });
    return Array.from(categories);
}

// Définir un ordre de priorité pour les grades (du plus élevé au moins élevé)
const gradePriority = ["or", "argent", "bronze"];

// Fonction pour trouver une carte aléatoire avec possibilité de fallback en changeant grade et catégorie
function findCardWithFallback(Acategory, initialGrade, initialCategory) {
    // Obtenir l'index du grade initial dans l'ordre de priorité
    let gradeIndex = gradePriority.indexOf(initialGrade);
    if (gradeIndex === -1) {
        console.log(`Grade initial "${initialGrade}" non reconnu. Utilisation du premier grade par défaut.`);
        gradeIndex = 0; // Utiliser le premier grade par défaut si le grade initial n'est pas reconnu
    }

    // Itérer à travers les grades selon l'ordre de priorité, à partir du grade initial
    for (let i = gradeIndex; i < gradePriority.length; i++) {
        const currentGrade = gradePriority[i];
        
        // Si on est sur le grade initial, commencer par la catégorie initiale
        if (i === gradeIndex) {
            const card = getRandomCard(Acategory, currentGrade, initialCategory);
            if (card) {
                console.log(`Carte trouvée avec le grade "${currentGrade}" et la catégorie "${initialCategory}".`);
                return card;
            }
        }

        // Obtenir toutes les catégories disponibles
        const allCategories = getAllCategories(Acategory);

        // Définir l'ordre de priorité des catégories : commencer par la catégorie initiale, puis les autres
        const otherCategories = allCategories.filter(cat => cat !== initialCategory);
        const categoriesToTry = i === gradeIndex ? [initialCategory, ...otherCategories] : allCategories;

        // Itérer à travers les catégories
        for (const category of categoriesToTry) {
            const card = getRandomCard(Acategory, currentGrade, category);
            if (card) {
                console.log(`Carte trouvée avec le grade "${currentGrade}" et la catégorie "${category}".`);
                return card;
            }
        }
    }

    // Si aucune carte n'est trouvée après avoir essayé tous les grades et catégories
    console.log(`Aucune carte trouvée dans aucune combinaison de grade et de catégorie pour "${Acategory}".`);
    return null;
}

// Fonction pour trouver une carte aléatoire
function getRandomCard(Acategory, grade, Category) {
    // Filtrez les cartes en fonction du grade et de la catégorie
    const cardsArray = cards[Acategory].filter(card => card.grade === grade && card.category === Category);
    
    // Vérifiez si des cartes ont été trouvées avant de sélectionner une carte au hasard
    if (cardsArray.length === 0) {
        console.log('Aucune carte trouvée avec le grade:', grade, 'et la catégorie:', Category);
        return null;  // ou toute autre valeur indiquant qu'aucune carte n'a été trouvée
    }
    
    // Sélectionnez une carte aléatoire
    const randomIndex = Math.floor(Math.random() * cardsArray.length);
    return cardsArray[randomIndex];
}

// Fonction pour envoyer une carte
async function envoyerCarte(dest, zk, ms, imageCategory, gradeProbabilities, subCategoryProbabilities) {
    const grade = tirerProbabilite(gradeProbabilities);
    const Category = tirerCategorie(subCategoryProbabilities);
    const card = findCardWithFallback(imageCategory, grade, Category);

    if (card) {
        try {
            await zk.sendMessage(dest, { 
                image: { url: card.image }, 
                caption: `Grade: ${card.grade}\nCategory: ${card.category}\nName: ${card.name}\nPrix: ${card.price}` 
            }, { quoted: ms });
        } catch (error) {
            throw new Error(`Erreur lors de l'envoi de la carte : ${error.message}`);
        }
    } else {
        throw new Error("Aucune carte disponible dans cette catégorie et grade, même après fallback.");
    }
}

// Fonction pour envoyer une vidéo
async function envoyerVideo(dest, zk, videoUrl) {
    try {
        await zk.sendMessage(dest, { video: { url: videoUrl }, gifPlayback: true });
    } catch (error) {
        throw new Error(`Erreur lors de l'envoi de la vidéo : ${error.message}`);
    }
}

zokou(
  { 
    nomCom: "tirage", 
    reaction: "🎰", 
    categorie: "NEO_GAMES🎰" 
  }, 
  async (dest, zk, commandeOptions) => {
    const { repondre, arg, ms } = commandeOptions;
    const niveau = arg[0];
    
    try {
      let imageCategory = niveau;
      let gradeProbabilities = [];
      let subCategoryProbabilities = [];
      let videoUrl = '';

      // Définir les probabilités pour les grades et les vidéos pour chaque niveau
      switch (niveau) {
        case "sparking":
          videoUrl = "https://res.cloudinary.com/dwnofjjes/video/upload/v1726394328/ny7bi7f8gcfufwervg0t.mp4";
          gradeProbabilities = [
            { grade: "or", probability: 10 },
            { grade: "argent", probability: 20 },
            { grade: "bronze", probability: 70 }
          ]; 
          subCategoryProbabilities = [
            { subCategory: "s-", probability: 50 },
            { subCategory: "s", probability: 30 },
            { subCategory: "s+", probability: 20 }
          ];
          break;
        case "ultra":
          videoUrl = "https://res.cloudinary.com/dwnofjjes/video/upload/v1726394332/eika1gamq371hqv0ckvb.mp4";
          gradeProbabilities = [
            { grade: "or", probability: 5 },
            { grade: "argent", probability: 25 },
            { grade: "bronze", probability: 70 }
          ];
          subCategoryProbabilities = [
            { subCategory: "s-", probability: 50 },
            { subCategory: "s", probability: 30 },
            { subCategory: "s+", probability: 20 }
          ];
          break;
        case "legend":
          videoUrl = "https://res.cloudinary.com/dwnofjjes/video/upload/v1726394338/djjffqiiejs6rrwkrywa.mp4";
          gradeProbabilities = [
            { grade: "or", probability: 2 },
            { grade: "argent", probability: 28 },
            { grade: "bronze", probability: 70 }
          ];
          subCategoryProbabilities = [
            { subCategory: "s-", probability: 50 },
            { subCategory: "s", probability: 30 },
            { subCategory: "s+", probability: 20 }
          ];
          break;
        default:
          repondre("Niveau de tirage inconnu.");
          return;
      }

      // Envoyer la vidéo correspondante
      await envoyerVideo(dest, zk, videoUrl);

      // Envoyer deux cartes
      await envoyerCarte(dest, zk, ms, imageCategory, gradeProbabilities, subCategoryProbabilities);
      await envoyerCarte(dest, zk, ms, imageCategory, gradeProbabilities, subCategoryProbabilities);

    } catch (error) {
      repondre("Une erreur est survenue pendant le tirage : " + error.message);
      console.error(error);
    }
  }
);
