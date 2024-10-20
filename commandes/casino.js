const { zokou } = require('../framework/zokou');
const fs = require('fs');
const users = require('../Id_ext/northdiv');
const s = require("../set");
const dbUrl = s.DB;


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
        const user = users.find(item => item.id === auteurMessage); //id mtd
        let client;
    if (user) {
        const proConfig = {
          connectionString: dbUrl,
          ssl: {
            rejectUnauthorized: false,
          },
        };

        const { Pool } = require('pg');
        const pool = new Pool(proConfig);
        client = await pool.connect();
        
        // Exécuter la requête pour récupérer la valeur souhaitée
          const result_np = await client.query(user.get_np);
          const result_nc = await client.query(user.get_nc);
          const result_golds = await client.query(user.get_golds);
          const result_coupons = await client.query(user.get_coupons);

          let valeur_np = result_np.rows[0][user.cln_np];
          let valeur_nc = result_nc.rows[0][user.cln_nc];
          let valeur_golds = result_golds.rows[0][user.cln_golds];
          let valeur_coupons = result_coupons.rows[0][user.cln_coupons];
 
        if (valeur_np < 1) {
          return repondre('Nombre de Np insuffisant') 
        } else { 
         await client.query(user.upd_np, [valeur_np - 1]);   
          repondre('np retiré');

            
        
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
*\`+Cadeaux\`* (🎁 Pour voir les Récompenses possibles)

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

        const getChosenNumber = async (attempt = 1, isSecondChance = false) => {
  if (attempt > 3) {
    await repondre('*❌ Jeu annulé : trop de tentatives.*');
    throw new Error('TooManyAttempts');
  }

  // Message personnalisé selon s'il s'agit de la deuxième chance ou non
  let msg = isSecondChance 
    ? '🎊😃: *Vous avez une deuxième chance ! Choisissez un autre numéro. Vous avez 1 min ⚠️* (Répondre à ce message)'
    : '🎊😃: *Choisissez un numéro. Vous avez 1 min ⚠️* (Répondre à ce message)';
    
  let lien = isSecondChance 
    ? 'https://i.ibb.co/SPY5b86/image.jpg' 
    : 'https://telegra.ph/file/9a411be3bf362bd0bcea4.jpg';

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
      return await getChosenNumber(attempt + 1, isSecondChance);
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

const checkWinningNumber = async (number) => {
  if (winningNumbers.includes(number)) {
    let rewardIndex = winningNumbers.indexOf(number);
    let reward = rewards[rewardIndex];
    let msgc = `🎊🥳😍 ▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬*✅EXCELLENT! C'était le bon numéro ${reward}! Vas-y tu peux encore gagner plus ▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬😍🥳🎊`;
    let lienc = 'https://telegra.ph/file/dc157f349cd8045dff559.jpg';
    
    switch (reward) {
      case '10🔷':
        await client.query(user.upd_nc, [valeur_nc + 10]);
        break;
      case '50.000 G🧭':
        await client.query(user.upd_golds, [valeur_golds + 50000]);
        break;
      case '10🎟':
        await client.query(user.upd_coupons, [valeur_coupons + 10]);
        break;
      default:
        await repondre('Récompense inconnue');
    }
    
    return { success: true, message: msgc, image: lienc };
  } else {
    let msgd = `😫😖💔 ▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬❌NON ! C'était le mauvais numéro ! Dommage tu y étais presque💔▭▬▭▬▭▬▭▬▭▬▭▬▭▬😫😖💔`;
    let liend =  'https://telegra.ph/file/222cefbcd18ba50012d05.jpg';
    return { success: false, message: msgd, image: liend };
  }
};

try {
  // Choisir le premier numéro
  const chosenNumber1 = await getChosenNumber();
  let result1 = checkWinningNumber(chosenNumber1);

  await zk.sendMessage(origineMessage, { image: { url: result1.image }, caption: result1.message }, { quoted: ms });

  if (!result1.success) {
    // Si le premier numéro est incorrect, offrir une deuxième chance
    try {
      const chosenNumber2 = await getChosenNumber(1, true); // Deuxième tentative
      let result2 = checkWinningNumber(chosenNumber2);
      await zk.sendMessage(origineMessage, { image: { url: result2.image }, caption: result2.message }, { quoted: ms });
    } catch (error) {
      if (error.message === 'TooManyAttempts' || error.message === 'Timeout') {
        return; // Jeu annulé 
    } else {
            throw error;
          }
        }
      }
    } else { return repondre(`votre identifiant n'est pas encore enregistrÃ©`);
           }
      }
    } catch (error) {
  console.error("Erreur lors du jeu de roulette:", error);
  repondre('Une erreur est survenue. Veuillez réessayer.');
}


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
