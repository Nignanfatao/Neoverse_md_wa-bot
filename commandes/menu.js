const { zokou } = require("../framework/zokou");
const s = require("../set");
const {removeSudoNumber,addSudoNumber,issudo} = require("../bdd/sudo");
const { Sticker, StickerTypes } = require('wa-sticker-formatter');
const fs = require('fs');
const path = require('path');

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
    let m = 'Salut je me nomme *NEOverse_Md* \n\n ' + 'je suis un bot Whatsapp conçu pour le Rp';
     let admsg = ' developpé par *AINZ K⚜️*';
  let mseg = m + admsg;
    var img = 'https://telegra.ph/file/bd75d35e193a7cf0e300a.jpg';
    await zk.sendMessage(dest, { image: { url: img }, caption: mseg });
});

zokou({nomCom:"annonce",categorie:"Other",reaction:"🎤"},async(dest,zk,commandeOptions)=>{


  const {repondre,msgRepondu,verifGroupe,arg ,verifAdmin , superUser}=commandeOptions;

  if(!verifGroupe)  { repondre('Cette commande n\' est possible que dans les groupes ')} ;
  if (verifAdmin || superUser) { 

  let metadata = await zk.groupMetadata(dest) ;

  //console.log(metadata.participants)
 let tag = [] ;
  for (const participant of metadata.participants ) {

      tag.push(participant.id) ;
  }
  //console.log(tag)

    if(msgRepondu) {
      console.log(msgRepondu)
      let msg ;

      if (msgRepondu.imageMessage) {

        

     let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage) ;
     // console.log(msgRepondu) ;
     msg = {

       image : { url : media } ,
       caption : msgRepondu.imageMessage.caption,
       mentions :  tag
       
     }
    

      } else if (msgRepondu.videoMessage) {

        let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.videoMessage) ;

        msg = {

          video : { url : media } ,
          caption : msgRepondu.videoMessage.caption,
          mentions :  tag
          
        }

      } else if (msgRepondu.audioMessage) {
    
        let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage) ;
       
        msg = {
   
          audio : { url : media } ,
          mimetype:'audio/mp4',
          mentions :  tag
           }     
        
      } else if (msgRepondu.stickerMessage) {

    
        let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.stickerMessage)

        let stickerMess = new Sticker(media, {
          pack: 'Zokou-tag',
          type: StickerTypes.CROPPED,
          categories: ["🤩", "🎉"],
          id: "12345",
          quality: 70,
          background: "transparent",
        });
        const stickerBuffer2 = await stickerMess.toBuffer();
       
        msg = { sticker: stickerBuffer2 , mentions : tag}


      }  else {
          msg = {
             text : msgRepondu.conversation,
             mentions : tag
          }
      }

    zk.sendMessage(dest,msg)

    } else {

        if(!arg || !arg[0]) { repondre('Entrez le texte a annoncer ou mentionner le message a annoncer') ; return} ;

      zk.sendMessage(
         dest,
         {
          text : arg.join(' ') ,
          mentions : tag
         }     
      )
    }

} else {
  repondre('Commande reservée au admins')
}
});

zokou({ nomCom: "appel", categorie: "Other", reaction: "📣" }, async (dest, zk, commandeOptions) => {

  const { ms, repondre, arg, verifGroupe, nomGroupe, infosGroupe, nomAuteurMessage, verifAdmin, superUser } = commandeOptions


 

  if (!verifGroupe) { repondre("✋🏿 ✋🏿cette commande est réservée aux groupes ❌"); return; }
  if (!arg || arg === ' ') {
  mess = 'Aucun Message'
  } else {
    mess = arg.join(' ')
  } ;
  let membresGroupe = verifGroupe ? await infosGroupe.participants : ""
  var tag = ""; 
  tag += `========================\n  
        🌟 *Zokou-Md* 🌟
========================\n
👥 Groupe : ${nomGroupe} 🚀 
👤 Auteur : *${nomAuteurMessage}* 👋 
📜 Message : *${mess}* 📝
========================\n
\n

` ;




  let emoji = ['🦴', '👀', '😮‍💨', '❌', '✔️', '😇', '⚙️', '🔧', '🎊', '😡', '🙏🏿', '⛔️', '$','😟','🥵','🐅']
  let random = Math.floor(Math.random() * (emoji.length - 1))


  for (const membre of membresGroupe) {
    tag += `${emoji[random]}      @${membre.id.split("@")[0]}\n`
  }

 
 if (verifAdmin || superUser) {

  zk.sendMessage(dest, { text: tag, mentions: membresGroupe.map((i) => i.id) }, { quoted: ms })

   } else { repondre('commande reserver aux admins')}

});


