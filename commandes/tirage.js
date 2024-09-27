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
const gradePriority = ["argent", "bronze", "or"];

// Définir un ordre de priorité pour les catégories (du plus élevé au moins élevé)
const categoryPriority = ["s-", "s", "s+", "ss-", "ss", "ss+"];

// Fonction pour trouver une carte aléatoire avec possibilité de fallback en changeant grade et catégorie
function findCardWithFallback(Acategory, initialGrade, initialCategory, cartesTirees) {
    // Obtenir toutes les combinaisons possibles de grades et catégories
    const allCategories = getAllCategories(Acategory);
    const allGrades = gradePriority; // On considère que gradePriority contient tous les grades disponibles

    // Créer un tableau de toutes les combinaisons possibles avec leurs priorités
    let combinations = [];

    for (const grade of allGrades) {
        for (const category of allCategories) {
            // Calculer la priorité basée sur le grade et la catégorie
            const gradePriorityIndex = gradePriority.indexOf(grade);
            const categoryPriorityIndex = categoryPriority.indexOf(category);

            // Si le grade ou la catégorie n'est pas reconnu, assigner une priorité basse
            const effectiveGradePriority = gradePriorityIndex !== -1 ? gradePriorityIndex : gradePriority.length;
            const effectiveCategoryPriority = categoryPriorityIndex !== -1 ? categoryPriorityIndex : categoryPriority.length;

            // La priorité totale est une combinaison des priorités de grade et de catégorie
            const totalPriority = effectiveGradePriority * categoryPriority.length + effectiveCategoryPriority;

            combinations.push({ grade, category, priority: totalPriority });
        }
    }

    // Trier les combinaisons par priorité (du plus bas au plus haut)
    combinations.sort((a, b) => a.priority - b.priority);

    // Grouper les combinaisons par priorité
    const groupedCombinations = {};
    for (const combo of combinations) {
        if (!groupedCombinations[combo.priority]) {
            groupedCombinations[combo.priority] = [];
        }
        groupedCombinations[combo.priority].push({ grade: combo.grade, category: combo.category });
    }

    // Obtenir les priorités triées
    const sortedPriorities = Object.keys(groupedCombinations)
        .map(Number)
        .sort((a, b) => a - b);

    // Itérer à travers les groupes de priorités
    for (const priority of sortedPriorities) {
        const combos = groupedCombinations[priority];
        const shuffledCombos = shuffleArray(combos); // Mélanger les combinaisons dans le même niveau de priorité

        // Prioriser la combinaison initiale si elle est dans ce groupe
        const initialComboIndex = shuffledCombos.findIndex(
            combo => combo.grade === initialGrade && combo.category === initialCategory
        );

        if (initialComboIndex !== -1) {
            const initialCombo = shuffledCombos.splice(initialComboIndex, 1)[0];
            // Essayer la combinaison initiale en premier
            const card = getRandomCard(Acategory, initialCombo.grade, initialCombo.category, cartesTirees);
            if (card) {
                console.log(`Carte trouvée avec le grade "${initialCombo.grade}" et la catégorie "${initialCombo.category}".`);
                return card;
            }
        }

        // Essayer les autres combinaisons du groupe
        for (const { grade, category } of shuffledCombos) {
            const card = getRandomCard(Acategory, grade, category, cartesTirees);
            if (card) {
                console.log(`Carte trouvée avec le grade "${grade}" et la catégorie "${category}".`);
                return card;
            }
        }
    }

    // Si aucune carte n'est trouvée après avoir essayé toutes les combinaisons
    console.log(`Aucune carte trouvée dans aucune combinaison de grade et de catégorie pour "${Acategory}".`);
    return null;
}

// Fonction pour trouver une carte aléatoire
function getRandomCard(Acategory, grade, Category, cartesTirees) {
    // Filtrez les cartes en fonction du grade et de la catégorie, et qui ne sont pas déjà tirées
    const cardsArray = cards[Acategory].filter(card => card.grade === grade && card.category === Category && !cartesTirees.includes(card.name));
    
    // Vérifiez si des cartes ont été trouvées avant de sélectionner une carte au hasard
    if (cardsArray.length === 0) {
        console.log('Aucune carte trouvée avec le grade:', grade, 'et la catégorie:', Category, 'qui n\'a pas déjà été tirée.');
        return null;  // ou toute autre valeur indiquant qu'aucune carte n'a été trouvée
    }
    
    // Sélectionnez une carte aléatoire
    const randomIndex = Math.floor(Math.random() * cardsArray.length);
    return cardsArray[randomIndex];
}

// Fonction pour envoyer une carte
async function envoyerCarte(dest, zk, ms, imageCategory, gradeProbabilities, subCategoryProbabilities, cartesTirees) {
    let card;
    let attempts = 0;
    const maxAttempts = 10; // Limiter le nombre de tentatives pour éviter les boucles infinies

    while (attempts < maxAttempts) {
        const grade = tirerProbabilite(gradeProbabilities);
        const Category = tirerCategorie(subCategoryProbabilities);
        card = findCardWithFallback(imageCategory, grade, Category, cartesTirees);

        if (card && !cartesTirees.includes(card.name)) {
            cartesTirees.push(card.name); // Ajouter la carte tirée
            try {
                await zk.sendMessage(dest, { 
                    image: { url: card.image }, 
                    caption: `Grade: ${card.grade}\nCategory: ${card.category}\nName: ${card.name}\nPrix: ${card.price}` 
                }, { quoted: ms });
                return; // Sortir de la fonction après avoir envoyé une carte valide
            } catch (error) {
                throw new Error(`Erreur lors de l'envoi de la carte : ${error.message}`);
            }
        }

        attempts++;
    }

    throw new Error("Aucune carte disponible dans cette catégorie et grade, même après fallback.");
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
    nomCom: "tirageallstars", 
    reaction: "🎰", 
    categorie: "NEO_GAMES🎰" 
  }, 
  async (dest, zk, commandeOptions) => {
    const { repondre, arg, ms, auteurMessage, origineMessage } = commandeOptions; // Assure-toi que auteurMessage et origineMessage sont inclus
    try {
        // Vérifier si l'origineMessage correspond aux JIDs autorisés
        if (origineMessage === '120363049564083813@g.us' || origineMessage === '120363307444088356@g.us' || origineMessage === '22651463203@s.whatsapp.net' || origineMessage === '22605463559@s.whatsapp.net' ) {
            // Envoyer une image initiale
            await zk.sendMessage(dest, { 
                image: { url: 'https://i.ibb.co/DGLVPPF/image.jpg' }, 
                caption: ''
            }, { quoted: ms });

            // Fonction pour obtenir la confirmation de l'utilisateur avec une limite de tentatives
            const getConfirmation = async (attempt = 1, maxAttempts = 3) => {
                if (attempt > maxAttempts) {
                    throw new Error('MaxAttemptsReached');
                }

                try {
                    const rep = await zk.awaitForMessage({
                        sender: auteurMessage, // Assure-toi que ces variables sont bien fournies
                        chatJid: origineMessage,
                        timeout: 60000 // 60 secondes
                    });

                    let response;
                    try {
                        response = rep.message.extendedTextMessage.text;
                    } catch {
                        response = rep.message.conversation;
                    }

                    if (response.toLowerCase() === 'legends') {
                        return "legend";
                    } else if (response.toLowerCase() === 'ultra') {
                        return "ultra";
                    } else if (response.toLowerCase() === 'sparking') {
                        return "sparking";
                    } else {
                        await repondre('Veuillez choisir l\'une des options proposées (legends, ultra, sparking).');
                        return await getConfirmation(attempt + 1, maxAttempts);
                    }
                } catch (error) {
                    if (error.message === 'Timeout') {
                        throw new Error('Timeout');
                    } else {
                        throw error;
                    }
                }
            };

            // Obtenir la confirmation de l'utilisateur
            let niveau;
            try {
                niveau = await getConfirmation();
            } catch (error) {
                if (error.message === 'Timeout') {
                    return repondre('*❌ Délai d\'attente expiré*');
                } else if (error.message === 'MaxAttemptsReached') {
                    return repondre('*❌ Nombre maximal de tentatives dépassé*');
                } else {
                    throw error;
                }
            }

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
                        { grade: "argent", probability: 30 },
                        { grade: "bronze", probability: 60 }
                    ]; 
                    subCategoryProbabilities = [
                        { subCategory: "s-", probability: 35 },
                        { subCategory: "s", probability: 25 },
                        { subCategory: "s+", probability: 18 },
                        { subCategory: "ss-", probability: 10 },
                        { subCategory: "ss", probability: 8 },
                        { subCategory: "ss+", probability: 4 }
                    ];
                    break;
                case "ultra":
                    videoUrl = "https://res.cloudinary.com/dwnofjjes/video/upload/v1726394332/eika1gamq371hqv0ckvb.mp4";
                    gradeProbabilities = [
                        { grade: "or", probability: 10 },
                        { grade: "argent", probability: 30 },
                        { grade: "bronze", probability: 60 }
                    ];
                    subCategoryProbabilities = [
                        { subCategory: "s-", probability: 35 },
                        { subCategory: "s", probability: 25 },
                        { subCategory: "s+", probability: 18 },
                        { subCategory: "ss-", probability: 10 },
                        { subCategory: "ss", probability: 8 },
                        { subCategory: "ss+", probability: 4 }
                    ];
                    break;
                case "legend":
                    videoUrl = "https://res.cloudinary.com/dwnofjjes/video/upload/v1726394338/djjffqiiejs6rrwkrywa.mp4";
                    gradeProbabilities = [
                        { grade: "or", probability: 10 },
                        { grade: "argent", probability: 30 },
                        { grade: "bronze", probability: 60 }
                    ];
                    subCategoryProbabilities = [
                        { subCategory: "s-", probability: 35 },
                        { subCategory: "s", probability: 25 },
                        { subCategory: "s+", probability: 18 },
                        { subCategory: "ss-", probability: 10 },
                        { subCategory: "ss", probability: 8 },
                        { subCategory: "ss+", probability: 4 }
                    ];
                    break;
                default:
                    repondre("Niveau de tirage inconnu.");
                    return;
            }

            // Envoyer la vidéo correspondante
            await envoyerVideo(dest, zk, videoUrl);

            // Tableau pour stocker les cartes déjà tirées durant cette session
            let cartesTirees = [];

            // Envoyer deux cartes sans répétition
            await envoyerCarte(dest, zk, ms, imageCategory, gradeProbabilities, subCategoryProbabilities, cartesTirees);
            await envoyerCarte(dest, zk, ms, imageCategory, gradeProbabilities, subCategoryProbabilities, cartesTirees);
        }
    } catch (error) {
        if (error.message === 'MaxAttemptsReached') {
            repondre("*❌ Nombre maximal de tentatives dépassé*");
        } else {
            repondre("Une erreur est survenue pendant le tirage : " + error.message);
            console.error(error);
        }
    }
});
