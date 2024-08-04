const { zokou } = require('../framework/zokou');
const { getData } = require('../bdd/westdiv');
const s = require("../set");

const dbUrl = s.DB;


zokou(
  {
    nomCom: 'westvanitas👤',
    categorie: 'WEST🦁🔵'
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg, superUser } = commandeOptions;

    try {
      const data = await getData('1');
      let joueur = arg[1];
      let object = arg[3];
      let signe = arg[4];
      let valeur = arg[5];
      let texte = arg.slice(5).join(' ');

      if (!arg || arg.length === 0) {
        let mesg = `◇ *Pseudo👤*: ${data.e1}
◇ *Division🛡️*: ${data.e2}
◇ *Classe🏆*: ${data.e3}
◇ *Rang XP🔰*: ${data.e4}
◇ *Golds🧭*: ${data.e5}🧭
◇ *NΞOcoins🔹*: ${data.e6}🔷
◇ *Gift Box🎁*: ${data.e7}🎁
◇ *Coupons🎟*: ${data.e8}🎟
◇ *NΞO PASS🔸*: ${data.e9}🔸 
*❯❯▓▓▓▓▓▓▓▓▓▓▓▓▓▓*
 *Points de talent: ${data.e10}⭐* 
*✅Clean games*:  ${data.e18}  *❌Mauvais PA:* ${data.e19}                        
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*✭Records*: ${data.e12} Victoires✅/ ${data.e13} Défaites❌
*🏆Trophées*: ${data.e14}  *🌟 TOS*: ${data.e15}  
*💫Neo Awards*: ${data.e16}   *🎖️Globes*: ${data.e22}
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*🎴Cards*: ${data.e17} 
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
    *🔷𝗡Ξ𝗢 SUPERLEAGUE🏆🔝*`;
zk.sendMessage(dest, { image: { url: 'https://telegra.ph/file/7456fcd52743ec0728d47.jpg' }, caption: mesg }, { quoted: ms });
       } else {
        if (superUser) { 
      //  const dbUrl = "postgres://fatao:Kuz6KQRpz3S1swoTQTv1WOG8SPfSCppB@dpg-cmnlnkol5elc738lrj2g-a.oregon-postgres.render.com/cy";
        const proConfig = {
          connectionString: dbUrl,
          ssl: {
            rejectUnauthorized: false,
          },
        };

        const { Pool } = require('pg');
        const pool = new Pool(proConfig);
        const client = await pool.connect();

        if (arg[0] === 'joueur:') {
          let colonnesJoueur;
          
          switch (joueur) {
    case "Vanitas":
      colonnesJoueur = {
        pseudo: "e1",
        division: "e2",
        classe: "e3",
        rang_exp: "e4",
        golds: "e5",
        neocoins: "e6",
        gift_box: "e7",
        coupons: "e8",
        neopass: "e9",
        talent: "e10",
        victoires: "e12",
        defaites: "e13",
        trophees: "e14",
        tos: "e15",
        awards: "e16",
        cards: "e17",
        Clean_games: "e18",
        Mauvais_pa: "e19",
        Close_combat: "e20",
        Attaques: "e21",
        globes: "e22"
      };
        break;
          default:
      console.log("Nom de joueur non reconnu.");
              repondre(`joueur: ${joueur} non reconnu`);
              return; 
        }
          
        const colonneObjet = colonnesJoueur[object];
        const solde = `${data[colonneObjet]} ${signe} ${valeur}`;

          if (colonneObjet && (signe === '+' || signe === '-')) {
            const query = `UPDATE westdiv SET ${colonneObjet} = ${data[colonneObjet]} ${signe} ${valeur} WHERE id = 1`;
            await client.query(query);

            console.log(`Données de l'utilisateur ${joueur} mises à jour`);
           await repondre(`Données du joueur mises à jour\n👤 *JOUEUR*: ${joueur}\n⚙ *OBJECT*: ${object}\n💵 *VALEUR*: ${signe}${valeur}\n*NOUVEAU SOLDE*: ${solde}`);
          } else if (colonneObjet && signe === '=') {
            const query = `
            UPDATE westdiv
            SET ${colonneObjet} = $1
            WHERE id = 1
            `;

            await client.query(query, [texte]);

            console.log(`données du joueur: ${joueur} mise à jour`);
            await repondre(`Données du joueur mises à jour\n👤 *JOUEUR*: ${joueur}\n⚙ *OBJECT*: ${object}\n💵 *VALEUR*: ${texte} \n *NOUVELLE DONNÉE*: ${texte}`);
          } else {
            console.log("Nom d'objet non reconnu ou signe invalide.");
            repondre(`Une erreur est survenue. Veuillez entrer correctement les données.`);
          }
        } else {
          console.log("Le message ne correspond pas au format attendu.");
          repondre(`Le format du message est incorrect.`);
        } 
        } else { repondre('Seul les Membres de la NS ont le droit de modifier cette fiche');}
       

        client.release();
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données de l'utilisateur:", error);
    }
  });


zokou(
  {
    nomCom: 'westnash👤',
    categorie: 'WEST🦁🔵'
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg, superUser } = commandeOptions;

    try {
      const data = await getData('2');
      let joueur = arg[1];
      let object = arg[3];
      let signe = arg[4];
      let valeur = arg[5];
      let texte = arg.slice(5).join(' ');

      if (!arg || arg.length === 0) {
        let mesg = `◇ *Pseudo👤*: ${data.e1}
◇ *Division🛡️*: ${data.e2}
◇ *Classe🏆*: ${data.e3}
◇ *Rang XP🔰*: ${data.e4}
◇ *Golds🧭*: ${data.e5}🧭
◇ *NΞOcoins🔹*: ${data.e6}🔷
◇ *Gift Box🎁*: ${data.e7}🎁
◇ *Coupons🎟*: ${data.e8}🎟
◇ *NΞO PASS🔸*: ${data.e9}🔸 
*❯❯▓▓▓▓▓▓▓▓▓▓▓▓▓▓*
 *Points de talent: ${data.e10}⭐* 
*✅Clean games*:  ${data.e18}  *❌Mauvais PA:* ${data.e19}                        
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*✭Records*: ${data.e12} Victoires✅/ ${data.e13} Défaites❌
*🏆Trophées*: ${data.e14}  *🌟 TOS*: ${data.e15}  
*💫Neo Awards*: ${data.e16}   *🎖️Globes*: ${data.e22}
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*🎴Cards*: ${data.e17} 
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
    *🔷𝗡Ξ𝗢 SUPERLEAGUE🏆🔝*`;
zk.sendMessage(dest, { image: { url: 'https://telegra.ph/file/06b0a776277f6f4c31051.jpg' }, caption: mesg }, { quoted: ms });
       } else {
        if (superUser) { 
    //    const dbUrl = "postgres://fatao:Kuz6KQRpz3S1swoTQTv1WOG8SPfSCppB@dpg-cmnlnkol5elc738lrj2g-a.oregon-postgres.render.com/cy";
        const proConfig = {
          connectionString: dbUrl,
          ssl: {
            rejectUnauthorized: false,
          },
        };

        const { Pool } = require('pg');
        const pool = new Pool(proConfig);
        const client = await pool.connect();

        if (arg[0] === 'joueur:') {
          let colonnesJoueur;
          
          switch (joueur) {
    case "Nash":
      colonnesJoueur = {
        pseudo: "e1",
        division: "e2",
        classe: "e3",
        rang_exp: "e4",
        golds: "e5",
        neocoins: "e6",
        gift_box: "e7",
        coupons: "e8",
        neopass: "e9",
        talent: "e10",
        victoires: "e12",
        defaites: "e13",
        trophees: "e14",
        tos: "e15",
        awards: "e16",
        cards: "e17",
        Clean_games: "e18",
        Mauvais_pa: "e19",
        Close_combat: "e20",
        Attaques: "e21",
        globes: "e22"
      };
        break;
          default:
      console.log("Nom de joueur non reconnu.");
              repondre(`joueur: ${joueur} non reconnu`);
              return; 
        }
          
        const colonneObjet = colonnesJoueur[object];
        const solde = `${data[colonneObjet]} ${signe} ${valeur}`;

          if (colonneObjet && (signe === '+' || signe === '-')) {
            const query = `UPDATE westdiv SET ${colonneObjet} = ${data[colonneObjet]} ${signe} ${valeur} WHERE id = 2`;
            await client.query(query);

            console.log(`Données de l'utilisateur ${joueur} mises à jour`);
           await repondre(`Données du joueur mises à jour\n👤 *JOUEUR*: ${joueur}\n⚙ *OBJECT*: ${object}\n💵 *VALEUR*: ${signe}${valeur}\n*NOUVEAU SOLDE*: ${solde}`);
          } else if (colonneObjet && signe === '=') {
            const query = `
            UPDATE westdiv
            SET ${colonneObjet} = $1
            WHERE id = 2
            `;

            await client.query(query, [texte]);

            console.log(`données du joueur: ${joueur} mise à jour`);
            await repondre(`Données du joueur mises à jour\n👤 *JOUEUR*: ${joueur}\n⚙ *OBJECT*: ${object}\n💵 *VALEUR*: ${texte} \n *NOUVELLE DONNÉE*: ${texte}`);
          } else {
            console.log("Nom d'objet non reconnu ou signe invalide.");
            repondre(`Une erreur est survenue. Veuillez entrer correctement les données.`);
          }
        } else {
          console.log("Le message ne correspond pas au format attendu.");
          repondre(`Le format du message est incorrect.`);
        } 
        } else { repondre('Seul les Membres de la NS ont le droit de modifier cette fiche');}
       

        client.release();
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données de l'utilisateur:", error);
    }
  });


/*zokou(
  {
    nomCom: 'westlloyd👤',
    categorie: 'NEOverse'
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg, superUser } = commandeOptions;

    try {
      const data = await getData('3');
      let joueur = arg[1];
      let object = arg[3];
      let signe = arg[4];
      let valeur = arg[5];
      let texte = arg.slice(5).join(' ');

      if (!arg || arg.length === 0) {
        let mesg = `◇ *Pseudo👤*: ${data.e1}
◇ *Division🛡️*: ${data.e2}
◇ *Classe🏆*: ${data.e3}
◇ *Rang XP🔰*: ${data.e4}
◇ *Golds🧭*: ${data.e5}🧭
◇ *NΞOcoins🔹*: ${data.e6}🔷
◇ *Gift Box🎁*: ${data.e7}🎁
◇ *Coupons🎟*: ${data.e8}🎟
◇ *NΞO PASS🔸*: ${data.e9}🔸 
*❯❯▓▓▓▓▓▓▓▓▓▓▓▓▓▓*
 *Points de talent: ${data.e10}⭐* 
*✅Clean games*:  ${data.e18}  *❌Mauvais PA:* ${data.e19}                        
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*✭Records*: ${data.e12} Victoires✅/ ${data.e13} Défaites❌
*🏆Trophées*: ${data.e14}  *🌟 TOS*: ${data.e15}  
*💫Neo Awards*: ${data.e16}   *🎖️Globes*: ${data.e22}
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*🎴Cards*: ${data.e17} 
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
    *🔷𝗡Ξ𝗢 SUPERLEAGUE🏆🔝*`;
zk.sendMessage(dest, { image: { url: 'https://telegra.ph/file/f16b781055546cab2071a.jpg' }, caption: mesg }, { quoted: ms });
       } else {
        if (superUser) { 
      //  const dbUrl = "postgres://fatao:Kuz6KQRpz3S1swoTQTv1WOG8SPfSCppB@dpg-cmnlnkol5elc738lrj2g-a.oregon-postgres.render.com/cy";
        const proConfig = {
          connectionString: dbUrl,
          ssl: {
            rejectUnauthorized: false,
          },
        };

        const { Pool } = require('pg');
        const pool = new Pool(proConfig);
        const client = await pool.connect();

        if (arg[0] === 'joueur:') {
          let colonnesJoueur;
          
          switch (joueur) {
    case "Lloyd":
      colonnesJoueur = {
        pseudo: "e1",
        division: "e2",
        classe: "e3",
        rang_exp: "e4",
        golds: "e5",
        neocoins: "e6",
        gift_box: "e7",
        coupons: "e8",
        neopass: "e9",
        talent: "e10",
        victoires: "e12",
        defaites: "e13",
        trophees: "e14",
        tos: "e15",
        awards: "e16",
        cards: "e17",
        Clean_games: "e18",
        Mauvais_pa: "e19",
        Close_combat: "e20",
        Attaques: "e21",
        globes: "e22"
      };
        break;
          default:
      console.log("Nom de joueur non reconnu.");
              repondre(`joueur: ${joueur} non reconnu`);
              return; 
        }
          
        const colonneObjet = colonnesJoueur[object];
        const solde = `${data[colonneObjet]} ${signe} ${valeur}`;

          if (colonneObjet && (signe === '+' || signe === '-')) {
            const query = `UPDATE westdiv SET ${colonneObjet} = ${data[colonneObjet]} ${signe} ${valeur} WHERE id = 3`;
            await client.query(query);

            console.log(`Données de l'utilisateur ${joueur} mises à jour`);
           await repondre(`Données du joueur mises à jour\n👤 *JOUEUR*: ${joueur}\n⚙ *OBJECT*: ${object}\n💵 *VALEUR*: ${signe}${valeur}\n*NOUVEAU SOLDE*: ${solde}`);
          } else if (colonneObjet && signe === '=') {
            const query = `
            UPDATE westdiv
            SET ${colonneObjet} = $1
            WHERE id = 3
            `;

            await client.query(query, [texte]);

            console.log(`données du joueur: ${joueur} mise à jour`);
            await repondre(`Données du joueur mises à jour\n👤 *JOUEUR*: ${joueur}\n⚙ *OBJECT*: ${object}\n💵 *VALEUR*: ${texte} \n *NOUVELLE DONNÉE*: ${texte}`);
          } else {
            console.log("Nom d'objet non reconnu ou signe invalide.");
            repondre(`Une erreur est survenue. Veuillez entrer correctement les données.`);
          }
        } else {
          console.log("Le message ne correspond pas au format attendu.");
          repondre(`Le format du message est incorrect.`);
        } 
        } else { repondre('Seul les Membres de la NS ont le droit de modifier cette fiche');}
       

        client.release();
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données de l'utilisateur:", error);
    }
  });*/


zokou(
  {
    nomCom: 'westaether👤',
    categorie: 'WEST🦁🔵'
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg, superUser } = commandeOptions;

    try {
      const data = await getData('4');
      let joueur = arg[1];
      let object = arg[3];
      let signe = arg[4];
      let valeur = arg[5];
      let texte = arg.slice(5).join(' ');

      if (!arg || arg.length === 0) {
        let mesg = `◇ *Pseudo👤*: ${data.e1}
◇ *Division🛡️*: ${data.e2}
◇ *Classe🏆*: ${data.e3}
◇ *Rang XP🔰*: ${data.e4}
◇ *Golds🧭*: ${data.e5}🧭
◇ *NΞOcoins🔹*: ${data.e6}🔷
◇ *Gift Box🎁*: ${data.e7}🎁
◇ *Coupons🎟*: ${data.e8}🎟
◇ *NΞO PASS🔸*: ${data.e9}🔸 
*❯❯▓▓▓▓▓▓▓▓▓▓▓▓▓▓*
 *Points de talent: ${data.e10}⭐* 
*✅Clean games*:  ${data.e18}  *❌Mauvais PA:* ${data.e19}                        
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*✭Records*: ${data.e12} Victoires✅/ ${data.e13} Défaites❌
*🏆Trophées*: ${data.e14}  *🌟 TOS*: ${data.e15}  
*💫Neo Awards*: ${data.e16}   *🎖️Globes*: ${data.e22}
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*🎴Cards*: ${data.e17} 
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
    *🔷𝗡Ξ𝗢 SUPERLEAGUE🏆🔝*`;
zk.sendMessage(dest, { image: { url: 'https://telegra.ph/file/c8848f5441885f2ee0eed.jpg' }, caption: mesg }, { quoted: ms });
       } else {
        if (superUser) { 
       // const dbUrl = "postgres://fatao:Kuz6KQRpz3S1swoTQTv1WOG8SPfSCppB@dpg-cmnlnkol5elc738lrj2g-a.oregon-postgres.render.com/cy";
        const proConfig = {
          connectionString: dbUrl,
          ssl: {
            rejectUnauthorized: false,
          },
        };

        const { Pool } = require('pg');
        const pool = new Pool(proConfig);
        const client = await pool.connect();

        if (arg[0] === 'joueur:') {
          let colonnesJoueur;
          
          switch (joueur) {
    case "Aether":
      colonnesJoueur = {
        pseudo: "e1",
        division: "e2",
        classe: "e3",
        rang_exp: "e4",
        golds: "e5",
        neocoins: "e6",
        gift_box: "e7",
        coupons: "e8",
        neopass: "e9",
        talent: "e10",
        victoires: "e12",
        defaites: "e13",
        trophees: "e14",
        tos: "e15",
        awards: "e16",
        cards: "e17",
        Clean_games: "e18",
        Mauvais_pa: "e19",
        Close_combat: "e20",
        Attaques: "e21",
        globes: "e22"
      };
        break;
          default:
      console.log("Nom de joueur non reconnu.");
              repondre(`joueur: ${joueur} non reconnu`);
              return; 
        }
          
        const colonneObjet = colonnesJoueur[object];
        const solde = `${data[colonneObjet]} ${signe} ${valeur}`;

          if (colonneObjet && (signe === '+' || signe === '-')) {
            const query = `UPDATE westdiv SET ${colonneObjet} = ${data[colonneObjet]} ${signe} ${valeur} WHERE id = 4`;
            await client.query(query);

            console.log(`Données de l'utilisateur ${joueur} mises à jour`);
           await repondre(`Données du joueur mises à jour\n👤 *JOUEUR*: ${joueur}\n⚙ *OBJECT*: ${object}\n💵 *VALEUR*: ${signe}${valeur}\n*NOUVEAU SOLDE*: ${solde}`);
          } else if (colonneObjet && signe === '=') {
            const query = `
            UPDATE westdiv
            SET ${colonneObjet} = $1
            WHERE id = 4
            `;

            await client.query(query, [texte]);

            console.log(`données du joueur: ${joueur} mise à jour`);
            await repondre(`Données du joueur mises à jour\n👤 *JOUEUR*: ${joueur}\n⚙ *OBJECT*: ${object}\n💵 *VALEUR*: ${texte} \n *NOUVELLE DONNÉE*: ${texte}`);
          } else {
            console.log("Nom d'objet non reconnu ou signe invalide.");
            repondre(`Une erreur est survenue. Veuillez entrer correctement les données.`);
          }
        } else {
          console.log("Le message ne correspond pas au format attendu.");
          repondre(`Le format du message est incorrect.`);
        } 
        } else { repondre('Seul les Membres de la NS ont le droit de modifier cette fiche');}
       

        client.release();
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données de l'utilisateur:", error);
    }
  });

/*zokou(
  {
    nomCom: 'westlord16👤',
    categorie: 'NEOverse'
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg, superUser } = commandeOptions;

    try {
      const data = await getData('5');
      let joueur = arg[1];
      let object = arg[3];
      let signe = arg[4];
      let valeur = arg[5];
      let texte = arg.slice(5).join(' ');

      if (!arg || arg.length === 0) {
        let mesg = `◇ *Pseudo👤*: ${data.e1}
◇ *Division🛡️*: ${data.e2}
◇ *Classe🏆*: ${data.e3}
◇ *Rang XP🔰*: ${data.e4}
◇ *Golds🧭*: ${data.e5}🧭
◇ *NΞOcoins🔹*: ${data.e6}🔷
◇ *Gift Box🎁*: ${data.e7}🎁
◇ *Coupons🎟*: ${data.e8}🎟
◇ *NΞO PASS🔸*: ${data.e9}🔸 
*❯❯▓▓▓▓▓▓▓▓▓▓▓▓▓▓*
 *Points de talent: ${data.e10}⭐* 
*✅Clean games*:  ${data.e18}  *❌Mauvais PA:* ${data.e19}                        
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*✭Records*: ${data.e12} Victoires✅/ ${data.e13} Défaites❌
*🏆Trophées*: ${data.e14}  *🌟 TOS*: ${data.e15}  
*💫Neo Awards*: ${data.e16}   *🎖️Globes*: ${data.e22}
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*🎴Cards*: ${data.e17} 
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
    *🔷𝗡Ξ𝗢 SUPERLEAGUE🏆🔝*`;
zk.sendMessage(dest, { image: { url: 'https://telegra.ph/file/41773ce707c7c024b724f.jpg' }, caption: mesg }, { quoted: ms });
       } else {
        if (superUser) { 
     //   const dbUrl = "postgres://fatao:Kuz6KQRpz3S1swoTQTv1WOG8SPfSCppB@dpg-cmnlnkol5elc738lrj2g-a.oregon-postgres.render.com/cy";
        const proConfig = {
          connectionString: dbUrl,
          ssl: {
            rejectUnauthorized: false,
          },
        };

        const { Pool } = require('pg');
        const pool = new Pool(proConfig);
        const client = await pool.connect();

        if (arg[0] === 'joueur:') {
          let colonnesJoueur;
          
          switch (joueur) {
    case "Lord16":
      colonnesJoueur = {
        pseudo: "e1",
        division: "e2",
        classe: "e3",
        rang_exp: "e4",
        golds: "e5",
        neocoins: "e6",
        gift_box: "e7",
        coupons: "e8",
        neopass: "e9",
        talent: "e10",
        victoires: "e12",
        defaites: "e13",
        trophees: "e14",
        tos: "e15",
        awards: "e16",
        cards: "e17",
        Clean_games: "e18",
        Mauvais_pa: "e19",
        Close_combat: "e20",
        Attaques: "e21",
        globes: "e22"
      };
        break;
          default:
      console.log("Nom de joueur non reconnu.");
              repondre(`joueur: ${joueur} non reconnu`);
              return; 
        }
          
        const colonneObjet = colonnesJoueur[object];
        const solde = `${data[colonneObjet]} ${signe} ${valeur}`;

          if (colonneObjet && (signe === '+' || signe === '-')) {
            const query = `UPDATE westdiv SET ${colonneObjet} = ${data[colonneObjet]} ${signe} ${valeur} WHERE id = 5`;
            await client.query(query);

            console.log(`Données de l'utilisateur ${joueur} mises à jour`);
           await repondre(`Données du joueur mises à jour\n👤 *JOUEUR*: ${joueur}\n⚙ *OBJECT*: ${object}\n💵 *VALEUR*: ${signe}${valeur}\n*NOUVEAU SOLDE*: ${solde}`);
          } else if (colonneObjet && signe === '=') {
            const query = `
            UPDATE westdiv
            SET ${colonneObjet} = $1
            WHERE id = 5
            `;

            await client.query(query, [texte]);

            console.log(`données du joueur: ${joueur} mise à jour`);
            await repondre(`Données du joueur mises à jour\n👤 *JOUEUR*: ${joueur}\n⚙ *OBJECT*: ${object}\n💵 *VALEUR*: ${texte} \n *NOUVELLE DONNÉE*: ${texte}`);
          } else {
            console.log("Nom d'objet non reconnu ou signe invalide.");
            repondre(`Une erreur est survenue. Veuillez entrer correctement les données.`);
          }
        } else {
          console.log("Le message ne correspond pas au format attendu.");
          repondre(`Le format du message est incorrect.`);
        } 
        } else { repondre('Seul les Membres de la NS ont le droit de modifier cette fiche');}
       

        client.release();
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données de l'utilisateur:", error);
    }
  });*/

zokou(
  {
    nomCom: 'westsolomoe👤',
    categorie: 'WEST🦁🔵'
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg, superUser } = commandeOptions;

    try {
      const data = await getData('6');
      let joueur = arg[1];
      let object = arg[3];
      let signe = arg[4];
      let valeur = arg[5];
      let texte = arg.slice(5).join(' ');

      if (!arg || arg.length === 0) {
        let mesg = `◇ *Pseudo👤*: ${data.e1}
◇ *Division🛡️*: ${data.e2}
◇ *Classe🏆*: ${data.e3}
◇ *Rang XP🔰*: ${data.e4}
◇ *Golds🧭*: ${data.e5}🧭
◇ *NΞOcoins🔹*: ${data.e6}🔷
◇ *Gift Box🎁*: ${data.e7}🎁
◇ *Coupons🎟*: ${data.e8}🎟
◇ *NΞO PASS🔸*: ${data.e9}🔸 
*❯❯▓▓▓▓▓▓▓▓▓▓▓▓▓▓*
 *Points de talent: ${data.e10}⭐* 
*✅Clean games*:  ${data.e18}  *❌Mauvais PA:* ${data.e19}                        
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*✭Records*: ${data.e12} Victoires✅/ ${data.e13} Défaites❌
*🏆Trophées*: ${data.e14}  *🌟 TOS*: ${data.e15}  
*💫Neo Awards*: ${data.e16}   *🎖️Globes*: ${data.e22}
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*🎴Cards*: ${data.e17} 
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
    *🔷𝗡Ξ𝗢 SUPERLEAGUE🏆🔝*`;
zk.sendMessage(dest, { image: { url: 'https://telegra.ph/file/7e1f5075ef9d06ba61a7f.jpg' }, caption: mesg }, { quoted: ms });
       } else {
        if (superUser) { 
     //   const dbUrl = "postgres://fatao:Kuz6KQRpz3S1swoTQTv1WOG8SPfSCppB@dpg-cmnlnkol5elc738lrj2g-a.oregon-postgres.render.com/cy";
        const proConfig = {
          connectionString: dbUrl,
          ssl: {
            rejectUnauthorized: false,
          },
        };

        const { Pool } = require('pg');
        const pool = new Pool(proConfig);
        const client = await pool.connect();

        if (arg[0] === 'joueur:') {
          let colonnesJoueur;
          
          switch (joueur) {
    case "SoloMoe":
      colonnesJoueur = {
        pseudo: "e1",
        division: "e2",
        classe: "e3",
        rang_exp: "e4",
        golds: "e5",
        neocoins: "e6",
        gift_box: "e7",
        coupons: "e8",
        neopass: "e9",
        talent: "e10",
        victoires: "e12",
        defaites: "e13",
        trophees: "e14",
        tos: "e15",
        awards: "e16",
        cards: "e17",
        Clean_games: "e18",
        Mauvais_pa: "e19",
        Close_combat: "e20",
        Attaques: "e21",
        globes: "e22"
      };
        break;
          default:
      console.log("Nom de joueur non reconnu.");
              repondre(`joueur: ${joueur} non reconnu`);
              return; 
        }
          
        const colonneObjet = colonnesJoueur[object];
        const solde = `${data[colonneObjet]} ${signe} ${valeur}`;

          if (colonneObjet && (signe === '+' || signe === '-')) {
            const query = `UPDATE westdiv SET ${colonneObjet} = ${data[colonneObjet]} ${signe} ${valeur} WHERE id = 6`;
            await client.query(query);

            console.log(`Données de l'utilisateur ${joueur} mises à jour`);
           await repondre(`Données du joueur mises à jour\n👤 *JOUEUR*: ${joueur}\n⚙ *OBJECT*: ${object}\n💵 *VALEUR*: ${signe}${valeur}\n*NOUVEAU SOLDE*: ${solde}`);
          } else if (colonneObjet && signe === '=') {
            const query = `
            UPDATE westdiv
            SET ${colonneObjet} = $1
            WHERE id = 6
            `;

            await client.query(query, [texte]);

            console.log(`données du joueur: ${joueur} mise à jour`);
            await repondre(`Données du joueur mises à jour\n👤 *JOUEUR*: ${joueur}\n⚙ *OBJECT*: ${object}\n💵 *VALEUR*: ${texte} \n *NOUVELLE DONNÉE*: ${texte}`);
          } else {
            console.log("Nom d'objet non reconnu ou signe invalide.");
            repondre(`Une erreur est survenue. Veuillez entrer correctement les données.`);
          }
        } else {
          console.log("Le message ne correspond pas au format attendu.");
          repondre(`Le format du message est incorrect.`);
        } 
        } else { repondre('Seul les Membres de la NS ont le droit de modifier cette fiche');}
       

        client.release();
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données de l'utilisateur:", error);
    }
  });


zokou(
  {
    nomCom: 'westsept👤',
    categorie: 'WEST🦁🔵'
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg, superUser } = commandeOptions;

    try {
      const data = await getData('7');
      let joueur = arg[1];
      let object = arg[3];
      let signe = arg[4];
      let valeur = arg[5];
      let texte = arg.slice(5).join(' ');

      if (!arg || arg.length === 0) {
        let mesg = `◇ *Pseudo👤*: ${data.e1}
◇ *Division🛡️*: ${data.e2}
◇ *Classe🏆*: ${data.e3}
◇ *Rang XP🔰*: ${data.e4}
◇ *Golds🧭*: ${data.e5}🧭
◇ *NΞOcoins🔹*: ${data.e6}🔷
◇ *Gift Box🎁*: ${data.e7}🎁
◇ *Coupons🎟*: ${data.e8}🎟
◇ *NΞO PASS🔸*: ${data.e9}🔸 
*❯❯▓▓▓▓▓▓▓▓▓▓▓▓▓▓*
 *Points de talent: ${data.e10}⭐* 
*✅Clean games*:  ${data.e18}  *❌Mauvais PA:* ${data.e19}                        
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*✭Records*: ${data.e12} Victoires✅/ ${data.e13} Défaites❌
*🏆Trophées*: ${data.e14}  *🌟 TOS*: ${data.e15}  
*💫Neo Awards*: ${data.e16}   *🎖️Globes*: ${data.e22}
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*🎴Cards*: ${data.e17} 
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
    *🔷𝗡Ξ𝗢 SUPERLEAGUE🏆🔝*`;
zk.sendMessage(dest, { image: { url: 'https://telegra.ph/file/9c33ed5cb7e6abbedf4be.jpg' }, caption: mesg }, { quoted: ms });
       } else {
        if (superUser) { 
     //   const dbUrl = "postgres://fatao:Kuz6KQRpz3S1swoTQTv1WOG8SPfSCppB@dpg-cmnlnkol5elc738lrj2g-a.oregon-postgres.render.com/cy";
        const proConfig = {
          connectionString: dbUrl,
          ssl: {
            rejectUnauthorized: false,
          },
        };

        const { Pool } = require('pg');
        const pool = new Pool(proConfig);
        const client = await pool.connect();

        if (arg[0] === 'joueur:') {
          let colonnesJoueur;
          
          switch (joueur) {
    case "Sept":
      colonnesJoueur = {
        pseudo: "e1",
        division: "e2",
        classe: "e3",
        rang_exp: "e4",
        golds: "e5",
        neocoins: "e6",
        gift_box: "e7",
        coupons: "e8",
        neopass: "e9",
        talent: "e10",
        victoires: "e12",
        defaites: "e13",
        trophees: "e14",
        tos: "e15",
        awards: "e16",
        cards: "e17",
        Clean_games: "e18",
        Mauvais_pa: "e19",
        Close_combat: "e20",
        Attaques: "e21",
        globes: "e22"
      };
        break;
          default:
      console.log("Nom de joueur non reconnu.");
              repondre(`joueur: ${joueur} non reconnu`);
              return; 
        }
          
        const colonneObjet = colonnesJoueur[object];
        const solde = `${data[colonneObjet]} ${signe} ${valeur}`;

          if (colonneObjet && (signe === '+' || signe === '-')) {
            const query = `UPDATE westdiv SET ${colonneObjet} = ${data[colonneObjet]} ${signe} ${valeur} WHERE id = 7`;
            await client.query(query);

            console.log(`Données de l'utilisateur ${joueur} mises à jour`);
           await repondre(`Données du joueur mises à jour\n👤 *JOUEUR*: ${joueur}\n⚙ *OBJECT*: ${object}\n💵 *VALEUR*: ${signe}${valeur}\n*NOUVEAU SOLDE*: ${solde}`);
          } else if (colonneObjet && signe === '=') {
            const query = `
            UPDATE westdiv
            SET ${colonneObjet} = $1
            WHERE id = 7
            `;

            await client.query(query, [texte]);

            console.log(`données du joueur: ${joueur} mise à jour`);
            await repondre(`Données du joueur mises à jour\n👤 *JOUEUR*: ${joueur}\n⚙ *OBJECT*: ${object}\n💵 *VALEUR*: ${texte} \n *NOUVELLE DONNÉE*: ${texte}`);
          } else {
            console.log("Nom d'objet non reconnu ou signe invalide.");
            repondre(`Une erreur est survenue. Veuillez entrer correctement les données.`);
          }
        } else {
          console.log("Le message ne correspond pas au format attendu.");
          repondre(`Le format du message est incorrect.`);
        } 
        } else { repondre('Seul les Membres de la NS ont le droit de modifier cette fiche');}
       

        client.release();
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données de l'utilisateur:", error);
    }
  });

zokou(
  {
    nomCom: 'westtempest👤',
    categorie: 'WEST🦁🔵'
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg, superUser } = commandeOptions;

    try {
      const data = await getData('8');
      let joueur = arg[1];
      let object = arg[3];
      let signe = arg[4];
      let valeur = arg[5];
      let texte = arg.slice(5).join(' ');

      if (!arg || arg.length === 0) {
        let mesg = `◇ *Pseudo👤*: ${data.e1}
◇ *Division🛡️*: ${data.e2}
◇ *Classe🏆*: ${data.e3}
◇ *Rang XP🔰*: ${data.e4}
◇ *Golds🧭*: ${data.e5}🧭
◇ *NΞOcoins🔹*: ${data.e6}🔷
◇ *Gift Box🎁*: ${data.e7}🎁
◇ *Coupons🎟*: ${data.e8}🎟
◇ *NΞO PASS🔸*: ${data.e9}🔸 
*❯❯▓▓▓▓▓▓▓▓▓▓▓▓▓▓*
 *Points de talent: ${data.e10}⭐* 
*✅Clean games*:  ${data.e18}  *❌Mauvais PA:* ${data.e19}                        
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*✭Records*: ${data.e12} Victoires✅/ ${data.e13} Défaites❌
*🏆Trophées*: ${data.e14}  *🌟 TOS*: ${data.e15}  
*💫Neo Awards*: ${data.e16}   *🎖️Globes*: ${data.e22}
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*🎴Cards*: ${data.e17} 
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
    *🔷𝗡Ξ𝗢 SUPERLEAGUE🏆🔝*`;
zk.sendMessage(dest, { image: { url: 'https://telegra.ph/file/ab3d637fb7828794c21df.jpg' }, caption: mesg }, { quoted: ms });
       } else {
        if (superUser) { 
     //   const dbUrl = "postgres://fatao:Kuz6KQRpz3S1swoTQTv1WOG8SPfSCppB@dpg-cmnlnkol5elc738lrj2g-a.oregon-postgres.render.com/cy";
        const proConfig = {
          connectionString: dbUrl,
          ssl: {
            rejectUnauthorized: false,
          },
        };

        const { Pool } = require('pg');
        const pool = new Pool(proConfig);
        const client = await pool.connect();

        if (arg[0] === 'joueur:') {
          let colonnesJoueur;
          
          switch (joueur) {
    case "Tempest":
      colonnesJoueur = {
        pseudo: "e1",
        division: "e2",
        classe: "e3",
        rang_exp: "e4",
        golds: "e5",
        neocoins: "e6",
        gift_box: "e7",
        coupons: "e8",
        neopass: "e9",
        talent: "e10",
        victoires: "e12",
        defaites: "e13",
        trophees: "e14",
        tos: "e15",
        awards: "e16",
        cards: "e17",
        Clean_games: "e18",
        Mauvais_pa: "e19",
        Close_combat: "e20",
        Attaques: "e21",
        globes: "e22"
      };
        break;
          default:
      console.log("Nom de joueur non reconnu.");
              repondre(`joueur: ${joueur} non reconnu`);
              return; 
        }
          
        const colonneObjet = colonnesJoueur[object];
        const solde = `${data[colonneObjet]} ${signe} ${valeur}`;

          if (colonneObjet && (signe === '+' || signe === '-')) {
            const query = `UPDATE westdiv SET ${colonneObjet} = ${data[colonneObjet]} ${signe} ${valeur} WHERE id = 8`;
            await client.query(query);

            console.log(`Données de l'utilisateur ${joueur} mises à jour`);
           await repondre(`Données du joueur mises à jour\n👤 *JOUEUR*: ${joueur}\n⚙ *OBJECT*: ${object}\n💵 *VALEUR*: ${signe}${valeur}\n*NOUVEAU SOLDE*: ${solde}`);
          } else if (colonneObjet && signe === '=') {
            const query = `
            UPDATE westdiv
            SET ${colonneObjet} = $1
            WHERE id = 8
            `;

            await client.query(query, [texte]);

            console.log(`données du joueur: ${joueur} mise à jour`);
            await repondre(`Données du joueur mises à jour\n👤 *JOUEUR*: ${joueur}\n⚙ *OBJECT*: ${object}\n💵 *VALEUR*: ${texte} \n *NOUVELLE DONNÉE*: ${texte}`);
          } else {
            console.log("Nom d'objet non reconnu ou signe invalide.");
            repondre(`Une erreur est survenue. Veuillez entrer correctement les données.`);
          }
        } else {
          console.log("Le message ne correspond pas au format attendu.");
          repondre(`Le format du message est incorrect.`);
        } 
        } else { repondre('Seul les Membres de la NS ont le droit de modifier cette fiche');}
       

        client.release();
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données de l'utilisateur:", error);
    }
  });

zokou(
  {
    nomCom: 'westwilliam👤',
    categorie: 'WEST🦁🔵'
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg, superUser } = commandeOptions;

    try {
      const data = await getData('9');
      let joueur = arg[1];
      let object = arg[3];
      let signe = arg[4];
      let valeur = arg[5];
      let texte = arg.slice(5).join(' ');

      if (!arg || arg.length === 0) {
        let mesg = `◇ *Pseudo👤*: ${data.e1}
◇ *Division🛡️*: ${data.e2}
◇ *Classe🏆*: ${data.e3}
◇ *Rang XP🔰*: ${data.e4}
◇ *Golds🧭*: ${data.e5}🧭
◇ *NΞOcoins🔹*: ${data.e6}🔷
◇ *Gift Box🎁*: ${data.e7}🎁
◇ *Coupons🎟*: ${data.e8}🎟
◇ *NΞO PASS🔸*: ${data.e9}🔸 
*❯❯▓▓▓▓▓▓▓▓▓▓▓▓▓▓*
 *Points de talent: ${data.e10}⭐* 
*✅Clean games*:  ${data.e18}  *❌Mauvais PA:* ${data.e19}                        
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*✭Records*: ${data.e12} Victoires✅/ ${data.e13} Défaites❌
*🏆Trophées*: ${data.e14}  *🌟 TOS*: ${data.e15}  
*💫Neo Awards*: ${data.e16}   *🎖️Globes*: ${data.e22}
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*🎴Cards*: ${data.e17} 
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
    *🔷𝗡Ξ𝗢 SUPERLEAGUE🏆🔝*`;
zk.sendMessage(dest, { image: { url: 'https://telegra.ph/file/be3d0132f284a14d972c6.jpg' }, caption: mesg }, { quoted: ms });
       } else {
        if (superUser) { 
     //   const dbUrl = "postgres://fatao:Kuz6KQRpz3S1swoTQTv1WOG8SPfSCppB@dpg-cmnlnkol5elc738lrj2g-a.oregon-postgres.render.com/cy";
        const proConfig = {
          connectionString: dbUrl,
          ssl: {
            rejectUnauthorized: false,
          },
        };

        const { Pool } = require('pg');
        const pool = new Pool(proConfig);
        const client = await pool.connect();

        if (arg[0] === 'joueur:') {
          let colonnesJoueur;
          
          switch (joueur) {
    case "William":
      colonnesJoueur = {
        pseudo: "e1",
        division: "e2",
        classe: "e3",
        rang_exp: "e4",
        golds: "e5",
        neocoins: "e6",
        gift_box: "e7",
        coupons: "e8",
        neopass: "e9",
        talent: "e10",
        victoires: "e12",
        defaites: "e13",
        trophees: "e14",
        tos: "e15",
        awards: "e16",
        cards: "e17",
        Clean_games: "e18",
        Mauvais_pa: "e19",
        Close_combat: "e20",
        Attaques: "e21",
        globes: "e22"
      };
        break;
          default:
      console.log("Nom de joueur non reconnu.");
              repondre(`joueur: ${joueur} non reconnu`);
              return; 
        }
          
        const colonneObjet = colonnesJoueur[object];
        const solde = `${data[colonneObjet]} ${signe} ${valeur}`;

          if (colonneObjet && (signe === '+' || signe === '-')) {
            const query = `UPDATE westdiv SET ${colonneObjet} = ${data[colonneObjet]} ${signe} ${valeur} WHERE id = 9`;
            await client.query(query);

            console.log(`Données de l'utilisateur ${joueur} mises à jour`);
           await repondre(`Données du joueur mises à jour\n👤 *JOUEUR*: ${joueur}\n⚙ *OBJECT*: ${object}\n💵 *VALEUR*: ${signe}${valeur}\n*NOUVEAU SOLDE*: ${solde}`);
          } else if (colonneObjet && signe === '=') {
            const query = `
            UPDATE westdiv
            SET ${colonneObjet} = $1
            WHERE id = 9
            `;

            await client.query(query, [texte]);

            console.log(`données du joueur: ${joueur} mise à jour`);
            await repondre(`Données du joueur mises à jour\n👤 *JOUEUR*: ${joueur}\n⚙ *OBJECT*: ${object}\n💵 *VALEUR*: ${texte} \n *NOUVELLE DONNÉE*: ${texte}`);
          } else {
            console.log("Nom d'objet non reconnu ou signe invalide.");
            repondre(`Une erreur est survenue. Veuillez entrer correctement les données.`);
          }
        } else {
          console.log("Le message ne correspond pas au format attendu.");
          repondre(`Le format du message est incorrect.`);
        } 
        } else { repondre('Seul les Membres de la NS ont le droit de modifier cette fiche');}
       

        client.release();
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données de l'utilisateur:", error);
    }
  });

zokou(
  {
    nomCom: 'westhajime👤',
    categorie: 'WEST🦁🔵'
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg, superUser } = commandeOptions;

    try {
      const data = await getData('10');
      let joueur = arg[1];
      let object = arg[3];
      let signe = arg[4];
      let valeur = arg[5];
      let texte = arg.slice(5).join(' ');

      if (!arg || arg.length === 0) {
        let mesg = `◇ *Pseudo👤*: ${data.e1}
◇ *Division🛡️*: ${data.e2}
◇ *Classe🏆*: ${data.e3}
◇ *Rang XP🔰*: ${data.e4}
◇ *Golds🧭*: ${data.e5}🧭
◇ *NΞOcoins🔹*: ${data.e6}🔷
◇ *Gift Box🎁*: ${data.e7}🎁
◇ *Coupons🎟*: ${data.e8}🎟
◇ *NΞO PASS🔸*: ${data.e9}🔸 
*❯❯▓▓▓▓▓▓▓▓▓▓▓▓▓▓*
 *Points de talent: ${data.e10}⭐* 
*✅Clean games*:  ${data.e18}  *❌Mauvais PA:* ${data.e19}                        
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*✭Records*: ${data.e12} Victoires✅/ ${data.e13} Défaites❌
*🏆Trophées*: ${data.e14}  *🌟 TOS*: ${data.e15}  
*💫Neo Awards*: ${data.e16}   *🎖️Globes*: ${data.e22}
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*🎴Cards*: ${data.e17} 
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
    *🔷𝗡Ξ𝗢 SUPERLEAGUE🏆🔝*`;
zk.sendMessage(dest, { image: { url: 'https://telegra.ph/file/2d8f5b7c04f8cbcaea1bf.jpg' }, caption: mesg }, { quoted: ms });
       } else {
        if (superUser) { 
     //   const dbUrl = "postgres://fatao:Kuz6KQRpz3S1swoTQTv1WOG8SPfSCppB@dpg-cmnlnkol5elc738lrj2g-a.oregon-postgres.render.com/cy";
        const proConfig = {
          connectionString: dbUrl,
          ssl: {
            rejectUnauthorized: false,
          },
        };

        const { Pool } = require('pg');
        const pool = new Pool(proConfig);
        const client = await pool.connect();

        if (arg[0] === 'joueur:') {
          let colonnesJoueur;
          
          switch (joueur) {
    case "Hajime":
      colonnesJoueur = {
        pseudo: "e1",
        division: "e2",
        classe: "e3",
        rang_exp: "e4",
        golds: "e5",
        neocoins: "e6",
        gift_box: "e7",
        coupons: "e8",
        neopass: "e9",
        talent: "e10",
        victoires: "e12",
        defaites: "e13",
        trophees: "e14",
        tos: "e15",
        awards: "e16",
        cards: "e17",
        Clean_games: "e18",
        Mauvais_pa: "e19",
        globes: "e22"
      };
        break;
          default:
      console.log("Nom de joueur non reconnu.");
              repondre(`joueur: ${joueur} non reconnu`);
              return; 
        }
          
        const colonneObjet = colonnesJoueur[object];
        const solde = `${data[colonneObjet]} ${signe} ${valeur}`;

          if (colonneObjet && (signe === '+' || signe === '-')) {
            const query = `UPDATE westdiv SET ${colonneObjet} = ${data[colonneObjet]} ${signe} ${valeur} WHERE id = 10`;
            await client.query(query);

            console.log(`Données de l'utilisateur ${joueur} mises à jour`);
           await repondre(`Données du joueur mises à jour\n👤 *JOUEUR*: ${joueur}\n⚙ *OBJECT*: ${object}\n💵 *VALEUR*: ${signe}${valeur}\n*NOUVEAU SOLDE*: ${solde}`);
          } else if (colonneObjet && signe === '=') {
            const query = `
            UPDATE westdiv
            SET ${colonneObjet} = $1
            WHERE id = 10
            `;

            await client.query(query, [texte]);

            console.log(`données du joueur: ${joueur} mise à jour`);
            await repondre(`Données du joueur mises à jour\n👤 *JOUEUR*: ${joueur}\n⚙ *OBJECT*: ${object}\n💵 *VALEUR*: ${texte} \n *NOUVELLE DONNÉE*: ${texte}`);
          } else {
            console.log("Nom d'objet non reconnu ou signe invalide.");
            repondre(`Une erreur est survenue. Veuillez entrer correctement les données.`);
          }
        } else {
          console.log("Le message ne correspond pas au format attendu.");
          repondre(`Le format du message est incorrect.`);
        } 
        } else { repondre('Seul les Membres de la NS ont le droit de modifier cette fiche');}
       

        client.release();
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données de l'utilisateur:", error);
    }
  });

zokou(
  {
    nomCom: 'westregulus👤',
    categorie: 'WEST🦁🔵'
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg, superUser } = commandeOptions;

    try {
      const data = await getData('11');
      let joueur = arg[1];
      let object = arg[3];
      let signe = arg[4];
      let valeur = arg[5];
      let texte = arg.slice(5).join(' ');

      if (!arg || arg.length === 0) {
        let mesg = `◇ *Pseudo👤*: ${data.e1}
◇ *Division🛡️*: ${data.e2}
◇ *Classe🏆*: ${data.e3}
◇ *Rang XP🔰*: ${data.e4}
◇ *Golds🧭*: ${data.e5}🧭
◇ *NΞOcoins🔹*: ${data.e6}🔷
◇ *Gift Box🎁*: ${data.e7}🎁
◇ *Coupons🎟*: ${data.e8}🎟
◇ *NΞO PASS🔸*: ${data.e9}🔸 
*❯❯▓▓▓▓▓▓▓▓▓▓▓▓▓▓*
 *Points de talent: ${data.e10}⭐* 
*✅Clean games*:  ${data.e18}  *❌Mauvais PA:* ${data.e19}                        
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*✭Records*: ${data.e12} Victoires✅/ ${data.e13} Défaites❌
*🏆Trophées*: ${data.e14}  *🌟 TOS*: ${data.e15}  
*💫Neo Awards*: ${data.e16}   *🎖️Globes*: ${data.e22}
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*🎴Cards*: ${data.e17} 
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
    *🔷𝗡Ξ𝗢 SUPERLEAGUE🏆🔝*`;
zk.sendMessage(dest, { image: { url: 'https://telegra.ph/file/ffb64bf678bb1107cca18.jpg' }, caption: mesg }, { quoted: ms });
       } else {
        if (superUser) { 
     //   const dbUrl = "postgres://fatao:Kuz6KQRpz3S1swoTQTv1WOG8SPfSCppB@dpg-cmnlnkol5elc738lrj2g-a.oregon-postgres.render.com/cy";
        const proConfig = {
          connectionString: dbUrl,
          ssl: {
            rejectUnauthorized: false,
          },
        };

        const { Pool } = require('pg');
        const pool = new Pool(proConfig);
        const client = await pool.connect();

        if (arg[0] === 'joueur:') {
          let colonnesJoueur;
          
          switch (joueur) {
    case "Regulus":
      colonnesJoueur = {
        pseudo: "e1",
        division: "e2",
        classe: "e3",
        rang_exp: "e4",
        golds: "e5",
        neocoins: "e6",
        gift_box: "e7",
        coupons: "e8",
        neopass: "e9",
        talent: "e10",
        victoires: "e12",
        defaites: "e13",
        trophees: "e14",
        tos: "e15",
        awards: "e16",
        cards: "e17",
        Clean_games: "e18",
        Mauvais_pa: "e19",
        globes: "e22"
      };
        break;
          default:
      console.log("Nom de joueur non reconnu.");
              repondre(`joueur: ${joueur} non reconnu`);
              return; 
        }
          
        const colonneObjet = colonnesJoueur[object];
        const solde = `${data[colonneObjet]} ${signe} ${valeur}`;

          if (colonneObjet && (signe === '+' || signe === '-')) {
            const query = `UPDATE westdiv SET ${colonneObjet} = ${data[colonneObjet]} ${signe} ${valeur} WHERE id = 11`;
            await client.query(query);

            console.log(`Données de l'utilisateur ${joueur} mises à jour`);
           await repondre(`Données du joueur mises à jour\n👤 *JOUEUR*: ${joueur}\n⚙ *OBJECT*: ${object}\n💵 *VALEUR*: ${signe}${valeur}\n*NOUVEAU SOLDE*: ${solde}`);
          } else if (colonneObjet && signe === '=') {
            const query = `
            UPDATE westdiv
            SET ${colonneObjet} = $1
            WHERE id = 11
            `;

            await client.query(query, [texte]);

            console.log(`données du joueur: ${joueur} mise à jour`);
            await repondre(`Données du joueur mises à jour\n👤 *JOUEUR*: ${joueur}\n⚙ *OBJECT*: ${object}\n💵 *VALEUR*: ${texte} \n *NOUVELLE DONNÉE*: ${texte}`);
          } else {
            console.log("Nom d'objet non reconnu ou signe invalide.");
            repondre(`Une erreur est survenue. Veuillez entrer correctement les données.`);
          }
        } else {
          console.log("Le message ne correspond pas au format attendu.");
          repondre(`Le format du message est incorrect.`);
        } 
        } else { repondre('Seul les Membres de la NS ont le droit de modifier cette fiche');}
       

        client.release();
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données de l'utilisateur:", error);
    }
  });
