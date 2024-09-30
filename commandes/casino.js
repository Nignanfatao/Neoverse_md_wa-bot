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
      // Vérifier si le message provient des groupes spécifiés
      if (origineMessage === '120363024647909493@g.us' || origineMessage === '120363307444088356@g.us') {
        let numbers = generateRandomNumbers(0, 50, 50);
        let winningNumbers = generateRandomNumbers(0, 50, 3);
        let rewards = generateRewards();
        let liena = 'https://telegra.ph/file/9a411be3bf362bd0bcea4.jpg';
        let msga = `*🎰𝗧𝗘𝗡𝗧𝗘𝗭 𝗩𝗢𝗧𝗥𝗘 𝗖𝗛𝗔𝗡𝗖𝗘🥳 !!*
▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬🎉🎉🎉
jouez à la roulette des chiffres et obtenez une récompense pour le bon numéro que vous choisissez parmi les *5️⃣0️⃣*. *⚠️vous avez 2 tentatives et pour jouer vous devez payer 2🔶*
▔▔🎊▔🎊▔🎊▔▔🎊▔▔🎊▔🎊▔🎊
*\`${numbers.join(', ')}\`*
▔▔🎊▔🎊▔🎊▔▔🎊▔▔🎊▔🎊▔🎊
▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬🎉🎉🎉
* \`+Cadeaux\` * (🎁 Pour voir les Récompenses possibles)

*🎊Voulez-vous tenter votre chance ?* (1min)
✅: \`Oui\`
❌: \`Non\``;

        await zk.sendMessage(origineMessage, { image: { url: liena }, caption: msga }, { quoted: ms });

        const getConfirmation = async (attempt = 1) => {
          if (attempt > 3) {
            await repondre('*❌ Jeu annulé : trop de tentatives.*');
            throw new Error('TooManyAttempts');
          }

          try {
            const rep = await zk.awaitForMessage({
              sender: auteurMessage,
              chatJid: origineMessage,
              timeout: 60000 // 60 secondes
            });

            let response;
            try {
              response = rep.message.extendedTextMessage.text;
            } catch {
              response = rep.message.conversation;
            }

            if (response.toLowerCase() === 'oui') {
              return true;
            } else if (response.toLowerCase() === 'non') {
              await repondre('Jeu annulé.');
              throw new Error('GameCancelledByUser');
            } else {
              await repondre('Veuillez répondre par Oui ou Non.');
              return await getConfirmation(attempt + 1);
            }
          } catch (error) {
            if (error.message === 'Timeout') {
              await repondre('*❌ Délai d\'attente expiré*');
              throw error;
            } else {
              throw error;
            }
          }
        };

        let confirmation;
        try {
          confirmation = await getConfirmation();
        } catch (error) {
          if (error.message === 'TooManyAttempts') {
            // Le message de cancellation a déjà été envoyé dans getConfirmation
            return;
          } else if (error.message === 'GameCancelledByUser') {
            return;
          } else {
            throw error;
          }
        }

        const getChosenNumber = async (isSecondChance = false, attempt = 1) => {
          if (attempt > 3) {
            await repondre('*❌ Jeu annulé : trop de tentatives.*');
            throw new Error('TooManyAttempts');
          }

          let msg = isSecondChance 
            ? '🎊😃: *Vous avez une deuxième chance ! Choisissez un autre numéro. Vous avez 1 min ⚠️* (Répondre à ce message)'
            : '🎊😃: *Choisissez un numéro. Vous avez 1 min ⚠️* (Répondre à ce message)';
          let lien = isSecondChance 
            ?'https://i.ibb.co/SPY5b86/image.jpg'
            :'https://telegra.ph/file/9a411be3bf362bd0bcea4.jpg';
          await zk.sendMessage(origineMessage, { image: { url: lien }, caption: msg }, { quoted: ms });

          try {
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

            chosenNumber = parseInt(chosenNumber);

            if (isNaN(chosenNumber) || chosenNumber < 0 || chosenNumber > 50) {
              await repondre('Veuillez choisir un des numéros proposés.');
              return await getChosenNumber(isSecondChance, attempt + 1);
            }

            return chosenNumber;
          } catch (error) {
            if (error.message === 'Timeout') {
              await repondre('*❌ Délai d\'attente expiré*');
              throw error;
            } else {
              throw error;
            }
          }
        };

        const checkWinningNumber = (isSecondChance = false, number) => {
          if (winningNumbers.includes(number)) {
            let rewardIndex = winningNumbers.indexOf(number);
            let reward = rewards[rewardIndex];
            let msgc = `🎊🥳😍 ▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬*✅EXCELLENT! C'était le bon numéro ${reward}! Vas-y tu peux encore gagner plus ▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬😍🥳🎊`;
            let lienc = 'https://telegra.ph/file/dc157f349cd8045dff559.jpg';
            return { success: true, message: msgc, image: lienc };
          } else {
            let msgd = isSecondChance
              ? ``
              :  `😫😖💔 ▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬❌NON ! C'était le mauvais numéro ! Dommage tu y étais presque💔▭▬▭▬▭▬▭▬▭▬▭▬▭▬😫😖💔`;
            let liend = 'https://telegra.ph/file/222cefbcd18ba50012d05.jpg';
            return { success: false, message: msgd, image: liend };
          }
        };

        try {
          const chosenNumber1 = await getChosenNumber();
          let result1 = checkWinningNumber(chosenNumber1);

          await zk.sendMessage(origineMessage, { image: { url: result1.image }, caption: result1.message }, { quoted: ms });

          if (!result1.success) {
            // Offrir une deuxième chance
            try {
              const chosenNumber2 = await getChosenNumber(true);
              let result2 = checkWinningNumber(true,chosenNumber2);
              await zk.sendMessage(origineMessage, { image: { url: result2.image }, caption: result2.message }, { quoted: ms });
            } catch (error) {
              if (error.message === 'TooManyAttempts' || error.message === 'Timeout') {
                // Le message de cancellation a déjà été envoyé dans getChosenNumber
                return;
              } else {
                throw error;
              }
            }
          }
        } catch (error) {
          if (error.message === 'TooManyAttempts' || error.message === 'GameCancelledByUser' || error.message === 'Timeout') {
            // Les messages de cancellation ont déjà été envoyés dans les fonctions respectives
            return;
          } else {
            throw error;
          }
        }
      }
    } catch (error) {
      console.error("Erreur lors du jeu de roulette:", error);
      if (error.message !== 'Timeout' && error.message !== 'TooManyAttempts' && error.message !== 'GameCancelledByUser') {
        repondre('Une erreur est survenue. Veuillez réessayer.');
      }
      // Plus besoin de supprimer une partie en cours car ongoingGames a été retiré
    }
  }
);

zokou(
  {
    nomCom: 'cadeaux',
    reaction: '🎁',
    categorie: 'Other'
  },
  async (origineMessage, zk, commandeOptions) => {
    const { ms, repondre } = commandeOptions;
    if (origineMessage === '120363024647909493@g.us' || origineMessage === '120363307444088356@g.us') {   
      let lien = 'https://i.ibb.co/K6yZgTt/image.jpg';
      let msg = '';
      
      // Envoyer l'image en vue unique
      zk.sendMessage(origineMessage, { 
        image: { url: lien }, 
        caption: msg, 
       // viewOnce: true 
      }, { quoted: ms });
    }
  }
);

zokou(
  {
    nomCom: 'cadeau',
    reaction: '🎁',
    categorie: 'Other'
  },
  async (origineMessage, zk, commandeOptions) => {
    const { ms, repondre } = commandeOptions;
    let lien = 'https://i.ibb.co/K6yZgTt/image.jpg';
    let msg = 'Sélectionnez un cadeau ci-dessous 🎁';
    let buttons = [
      { buttonId: 'cadeau_1', buttonText: { displayText: 'Cadeau 1' }, type: 1 },
      { buttonId: 'cadeau_2', buttonText: { displayText: 'Cadeau 2' }, type: 1 },
      { buttonId: 'cadeau_3', buttonText: { displayText: 'Cadeau 3' }, type: 1 }
    ];
    try {
      zk.sendButImg(origineMessage, lien, msg, buttons);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
    }
  }
);

zokou(
  {
    nomCom: 'cad',
    reaction: '🎁',
    categorie: 'Other'
  },
  async (origineMessage, zk, commandeOptions) => {
    const { ms, repondre } = commandeOptions;
    let lien = 'https://i.ibb.co/K6yZgTt/image.jpg'; // Lien vers l'image à envoyer
    let msg = 'salut';  // Message texte qui accompagne l'image

    // Configuration des boutons
    const but = [
      { buttonId: 'menu', buttonText: { displayText: '📋MENU🌸' }, type: 1 },
      { buttonId: 'youtube', buttonText: { displayText: '🎥YouTube🎥' }, type: 1 },
      { buttonId: 'whatsapp', buttonText: { displayText: '🛑WhatsApp💬' }, type: 1 },
      { buttonId: 'owner', buttonText: { displayText: '↩️Owner👤' }, type: 1 }
    ];

    // Création du message avec boutons et image
    const buttonMessage = {
      image: { url: lien },    // URL de l'image à envoyer
      caption: msg,            // Texte qui accompagne l'image
      footer: 'ovl',           // Texte de footer (facultatif)
      buttons: but,            // Boutons configurés
      headerType: 4,           // Indique que l'en-tête est une image
    };

    try {
      // Envoie le message avec boutons
      await zk.sendButImg(origineMessage, buttonMessage);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
    }
  }
);

/*DeepakBotInc.send5ButLoc = async (jid , text = '' , footer = '', img, but = [], options = {}) =>{
var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
templateMessage: {
hydratedTemplate: {
"hydratedContentText": text,
"locationMessage": {
"jpegThumbnail": img },
"hydratedFooterText": footer,
"hydratedButtons": but
}
}
}), options)
DeepakBotInc.relayMessage(jid, template.message, { messageId: template.key.id })
}

DeepakBotInc = async (jid, path, teks, fke, but) => {
let img = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let fjejfjjjer = {
image: img, 
jpegThumbnail: img,
caption: teks,
fileLength: "1",
footer: fke,
buttons: but,
headerType: 4,
}
DeepakBotInc.sendMessage(jid, fjejfjjjer, { quoted: m })
}

return DeepakBotInc

}

DeepakBotInc.sendButtonText = (jid, buttons = [], text, footer, quoted = '', options = {}) => {
let buttonMessage = {
text,
footer,
buttons,
headerType: 2,
...options
}
DeepakBotInc.sendMessage(jid, buttonMessage, { quoted, ...options })
}
*/
