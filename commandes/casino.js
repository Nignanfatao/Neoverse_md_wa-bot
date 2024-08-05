const { zokou } = require('../framework/zokou');

const generateRandomNumbers = (min, max, count) => {
  const numbers = new Set();
  while (numbers.size < count) {
    numbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return Array.from(numbers);
};

const generateRewards = () => {
  const rewards = ['10🔷', '50.000 G🧭', '10🎟'];
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
      if (!arg || arg.length > 1) {
        return repondre(`*Description du mode:* Vous avez une chance de deviner un numéro gagnant.

        EX: ^roulette`);
      }

      let mode = arg[0];
      let numbers = generateRandomNumbers(0, 50, 50);
      let winningNumbers = generateRandomNumbers(0, 50, 3);
      let rewards = generateRewards();

      let message = `🎰 *Roulette Game* 🎰\n\n`;

      message += `Les numéros du jeu sont : ${numbers.join(', ')}\n\n`;
      message += `Choisissez un numéro vous avez 1min⚠️!\n\n`;

      await repondre(message);

      const getChosenNumber = async () => {
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
          await repondre('Veuillez choisir un des numéros proposés');
          return await getChosenNumber();
        }

        return chosenNumber;
      };

      let chosenNumber = await getChosenNumber();

      const checkWinningNumber = (number) => {
        if (winningNumbers.includes(number)) {
          let rewardIndex = winningNumbers.indexOf(number);
          let reward = rewards[rewardIndex];
          let otherWinningNumbers = winningNumbers.filter(num => num !== number);
          return `🎉 Félicitations ! Vous avez deviné l'un des numéros gagnants ${number}. Les autres numéros gagnants étaient ${otherWinningNumbers.join(', ')}\n\nVous remportez ${reward} !`;
        } else {
          return `😢 Désolé, ${number} n'est pas un numéro gagnant. Les numéros gagnants étaient ${winningNumbers.join(', ')}. Réessayez !`;
        }
      };

      message = checkWinningNumber(chosenNumber);
      repondre(message);
    } catch (error) {
      console.error("Erreur lors du jeu de roulette:", error);
      repondre('Une erreur est survenue. Veuillez réessayer.');
    }
  }
);
