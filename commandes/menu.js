const { zokou } = require("../framework/zokou");
const s = require("../set");
const {removeSudoNumber,addSudoNumber,issudo} = require("../bdd/sudo");

zokou(
  { nomCom: "menu", reaction: "📁", categorie: "Other" },
  async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../framework/zokou");
    var coms = {};

    cm.map(async (com) => {
      if (!coms[com.categorie]) coms[com.categorie] = [];
      coms[com.categorie].push(com.nomCom);
    });

    let menu_info = `╭──❏ *🄽🄴🄾_🅆🄰-🄱🄾🅃*  ❏
│ ✿ Prefixe: ${s.PREFIXE}
│ ✿ Commandes: ${cm.length}
│ ✿ Développeur: Ainz K⚜️
╰═════════════⊷\n\n`;

    for (const cat in coms) {
      if (cat === "Other") continue; // Skip the "Other" category
      menu_info += `*╭────❏ ${cat} ❏*`;
      for (const cmd of coms[cat]) {
        menu_info += `
*│☞* ${cmd}`;
      }
      menu_info += `
*╰═════════════⊷*\n`;
    }

    menu_info += "*🔷𝚴𝚵𝚯 𝐃𝚵𝛁𝚵𝐋𝚯𝚸𝚸𝚵𝐔𝚪 🖥️*";
    const lien = 'https://telegra.ph/file/bd75d35e193a7cf0e300a.jpg'; // Add the image URL here if needed

    await zk.sendMessage(dest, { image: { url: lien }, caption: menu_info }, { quoted: ms });
  }
);

zokou({ nomCom: "jid", categorie: "Other" }, async (dest, zk, commandeOptions) => {

  const { arg, ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage,auteurMsgRepondu } = commandeOptions;

         if (!superUser) {
    repondre("commande reservée au propriétaire du bot");
    return;
  }
              if(!msgRepondu) {
                jid = dest
              } else {
                jid = auteurMsgRepondu
              } ;
   zk.sendMessage(dest,{text : jid },{quoted:ms});

        }) ;

zokou({
  nomCom: 'sudo',
  categorie: 'Other',
}, async (dest, zk, commandeOptions) => {

  const { ms, arg, auteurMsgRepondu, msgRepondu , repondre,prefixe,superUser } = commandeOptions;

  
if (!superUser) {repondre('Cette commande n\'est permis qu\'au proprietaire du bot') ; return}
  if (!arg[0]) {
      // Fonction 'repondre' doit être définie pour envoyer une réponse.
      repondre(`mentionner la personne en tappant ${prefixe}sudo add/del`);
      return;
  };

  if (msgRepondu) {
      switch (arg.join(' ')) {
          case 'add':

         
 let youaresudo = await issudo(auteurMsgRepondu)
         if(youaresudo) {repondre('Ce utilisateur est deja sudo') ; return}
             
         addSudoNumber(auteurMsgRepondu)
         repondre('succes')
              break;
              case 'del':
                let estsudo = await issudo(auteurMsgRepondu)
  if (estsudo) {
      
      removeSudoNumber(auteurMsgRepondu);
      repondre('Cet utilisateur est desormais non-sudo.');
  } else {
    repondre('Cet utilisateur n\'est pas sudo.');
  }
  break;


          default:
              repondre('mauvaise option');
              break;
      }
  } else {
      repondre('mentionner la victime')
      return;
  }
});

zokou({ nomCom: "test", reaction: "⚜️", categorie: 'Other', nomFichier: __filename }, async (dest, zk, commandeOptions) => {
    let msg = 'Salut je me nomme NEOverse_Md* \n\n ' + 'je suis un bot Whatsapp conçu pour le Rp';
        msg += ' developpé par *AINZ K⚜️*';
    var img = 'https://telegra.ph/file/03ef7fa949c55d353ae24.jpg';
    await zk.sendMessage(dest, { image: { url: img }, caption: msg });


