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

//fonction pour tirer une sous catégorie
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

//trouver une card aléatoire 
function getRandomCard(category, grade, SubCategory) {
    const cardsArray = cards[category].filter(card => card.grade === grade && card.SubCategory === SubCategory);
    const randomIndex = Math.floor(Math.random() * cardsArray.length);
    return cardsArray[randomIndex];
}

// Fonction pour envoyer une carte
async function envoyerCarte(dest, zk, ms, imageCategory, gradeProbabilities, subCategoryProbabilities) {
    const grade = tirerProbabilite(gradeProbabilities);
    const subCategory = tirerCategorie(subCategoryProbabilities);
    const card = getRandomCard(imageCategory, grade, Category);

    if (card) {
        try {
            await zk.sendMessage(dest, { 
                image: { url: card.image }, 
                caption: `Grade: ${card.grade}\nCategory: ${card.Category}\nName: ${card.name}\nPrix: $${card.price}` 
            }, { quoted: ms });
        } catch (error) {
            throw new Error(`Erreur lors de l'envoi de la carte : ${error.message}`);
        }
    } else {
        throw new Error("Aucune carte disponible dans cette catégorie.");
    }
}


zokou(
  { 
    nomCom: "tirage", 
    reaction: "🎰", 
    categorie: "NEOverse" 
  }, 
  async (dest, zk, commandeOptions) => {
    const { repondre, arg, ms } = commandeOptions;
    const niveau = arg[0];
    
    try {
      let imageCategory = niveau;
      let gradeProbabilities = [];
      let subCategoryProbabilities = [];

      // Définir les probabilités pour les grades
      switch (niveau) {
        case "sparking":
          gradeProbabilities = [
            { grade: "or", probability: 10 },
            { grade: "argent", probability: 30 },
            { grade: "bronze", probability: 60 }
          ]; 
          subCategoryProbabilities = [
            { subCategory: "S-", probability: 80 },
            { subCategory: "S", probability: 60 },
            { subCategory: "S+", probability: 40 },
            { subCategory: "SS-", probability: 20 },
            { subCategory: "SS", probability: 10 },
            { subCategory: "SS+", probability: 5 }
          ];
          break;
        case "ultra":
          gradeProbabilities = [
            { grade: "or", probability: 5 },
            { grade: "argent", probability: 25 },
            { grade: "bronze", probability: 70 }
          ];
          subCategoryProbabilities = [
            { subCategory: "S-", probability: 80 },
            { subCategory: "S", probability: 60 },
            { subCategory: "S+", probability: 40 },
            { subCategory: "SS-", probability: 20 },
            { subCategory: "SS", probability: 10 },
            { subCategory: "SS+", probability: 5 }
          ];
          break;
        case "legends":
          gradeProbabilities = [
            { grade: "or", probability: 2 },
            { grade: "argent", probability: 18 },
            { grade: "bronze", probability: 80 }
          ];
          subCategoryProbabilities = [
            { subCategory: "S-", probability: 80 },
            { subCategory: "S", probability: 60 },
            { subCategory: "S+", probability: 40 },
            { subCategory: "SS-", probability: 20 },
            { subCategory: "SS", probability: 10 },
            { subCategory: "SS+", probability: 5 }
          ];
          break;
        default:
          repondre("Niveau de tirage inconnu.");
          return;
      }

      // Envoyer deux cartes
      await envoyerCarte(dest, zk, ms, imageCategory, gradeProbabilities, subCategoryProbabilities);
      await envoyerCarte(dest, zk, ms, imageCategory, gradeProbabilities, subCategoryProbabilities);

    } catch (error) {
      repondre("Une erreur est survenue pendant le tirage : " + error.message);
      console.error(error);
    }
  }
);
