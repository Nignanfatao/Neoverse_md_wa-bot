const { zokou } = require('../framework/zokou');

const generateRandomNumbers = (min, max, count) => {
  const numbers = new Set();
  while (numbers.size < count) {
    numbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return Array.from(numbers);
};

const generateRewards = () => {
  const rewards = ['10 neocoins', '10K golds', 'tour gratuit'];
  return rewards.sort(() => 0.5 - Math.random()).slice(0, 3);
};

zokou(
  {
    nomCom: 'roulette',
    reaction: '🎰',
    categorie: 'NEO_GAMES🎰'
  },
  async (origineMessage, zk, commandeOptions) => {
    const { ms, repondre, auteurMessage, auteurMsgRepondu, msgRepondu, arg } = commandeOptions;
    try {
      if (!arg || arg.length < 1) {
        return repondre('Veuillez spécifier le mode (mode1 ou mode2).');
      }

      let mode = arg[0];
      let numbers = generateRandomNumbers(0, 50, 50);
      let winningNumbers = generateRandomNumbers(0, 50, 3);
      let rewards = generateRewards();

      let message = `🎰 *Roulette Game* 🎰\n\n`;

      if (mode === 'mode2') {
        let minHint = Math.max(0, Math.min(...winningNumbers) - 10);
        let maxHint = Math.min(50, Math.max(...winningNumbers) + 10);
        message += `*Indice*: Le numéro gagnant est entre ${minHint} et ${maxHint}\n\n`;
      }

      message += `Les numéros du jeu sont : ${numbers.join(', ')}\n\n`;
      message += `Choisissez un numéro entre 0 et 50. Si vous devinez un des numéros gagnants, vous remportez une récompense !\n\n`;

      await repondre(message);

      // Attendre une entrée de l'utilisateur pour le numéro choisi
      
    //if (msgRepondu) {
        const rep = await zk.awaitForMessage({
          sender: auteurMessage,
          chatJid: origineMessage,
          timeout: 60000 // 60 secondes
        });

        let chosenNumber;  
        try {
          chosenNumber = rep.message.extendedTextMessage.text;
        } catch {
          chosenNumber = rep.message.conversation;
        }

        console.log('votre choix est:', chosenNumber);

        chosenNumber = parseInt(chosenNumber);

        if (isNaN(chosenNumber) || chosenNumber < 0 || chosenNumber > 50) {
          return repondre('Veuillez choisir un numéro valide compris entre 0 et 50.');
        }

        if (winningNumbers.includes(chosenNumber)) {
          let rewardIndex = winningNumbers.indexOf(chosenNumber);
          let reward = rewards[rewardIndex];
          let otherWinningNumbers = winningNumbers.filter(num => num !== chosenNumber);
          message = `🎉 Félicitations ! Vous avez deviné l'un des numéros gagnants ${chosenNumber}. Les autres numéros gagnants étaient ${otherWinningNumbers.join(', ')}\n\nVous remportez ${reward} !`;
          // Ajoutez la logique pour attribuer la récompense au joueur
          // Exemple : await updateData('neocoins', userId, rewardValue);
        } else {
          message = `😢 Désolé, ${chosenNumber} n'est pas un numéro gagnant. Les numéros gagnants étaient ${winningNumbers.join(', ')}. Réessayez !`;
        }

        repondre(message);
      //
    } catch (error) {
      console.error("Erreur lors du jeu de roulette:", error);
      repondre('Une erreur est survenue. Veuillez réessayer.');
    }
  }
);
