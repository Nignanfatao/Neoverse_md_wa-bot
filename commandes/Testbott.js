const { zokou } = require("../framework/zokou");
const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = require('@whiskeysockets/baileys');


zokou(
  {
    nomCom: 'cadee',
    reaction: '🎁',
    categorie: 'Other'
  },
  async (origineMessage, zk, commandeOptions) => {
    const { ms, auteurMessage, repondre } = commandeOptions;
    
    try {
      const imageMedia = await prepareWAMessageMedia({
        image: { url: 'https://i.imgur.com/G3WM4D8.jpeg' }
      }, { upload: zk.waUploadToServer });

      const templateMessage = {
        templateMessage: {
          hydratedTemplate: {
            imageMessage: imageMedia.image,  // Ajout de l'image ici
            hydratedContentText: 'Voici votre menu :',  // Texte principal
            hydratedFooterText: 'Neoverse_Md_bot',  // Footer
            hydratedButtons: [
              { 
                quickReplyButton: { 
                  displayText: 'Menu', 
                  id: 'menu' 
                } 
              },
              { 
                quickReplyButton: { 
                  displayText: 'northainz👤', 
                  id: 'northainz👤' 
                } 
              }
            ]
          }
        }
      };

      const message = generateWAMessageFromContent(origineMessage, templateMessage, {});

      await zk.relayMessage(origineMessage, message.message, { messageId: message.key.id });
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
    }
  }
);

/*const { pkg, prepareWAMessageMedia } = require('@whiskeysockets/baileys');
const { generateWAMessageFromContent, proto } = pkg;
*/
zokou(
  {
    nomCom: 'cadeebmw',
    reaction: '🎁',
    categorie: 'Other'
  },
  async (origineMessage, zk, commandeOptions) => {
    const { ms, auteurMessage, repondre } = commandeOptions;
    
    try {
      const message = generateWAMessageFromContent(origineMessage, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2,
          },
          interactiveMessage: proto.Message.InteractiveMessage.create({
            body: proto.Message.InteractiveMessage.Body.create({
              text: 'messageText',
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: 'Neoverse_Md_bot',
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              ...(await prepareWAMessageMedia({
                image: {
                  url: 'https://telegra.ph/file/bd75d35e193a7cf0e300a.jpg',
                },
              }, { upload: zk.waUploadToServer })),
              title: '',
              gifPlayback: true,
              subtitle: '',
              hasMediaAttachment: false,
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
              buttons: [
                {
                  name: 'quick_reply',
                  buttonParamsJson: JSON.stringify({
                    display_text: "Menu",
                    id: "menu",
                  }),
                },
                 {
                  name: 'quick_reply',
                  buttonParamsJson: JSON.stringify({
                    display_text: "northainz👤",
                    id: "northainz👤",
                  }),
                },
              ],
            }),
            contextInfo: {
              mentionedJid: [auteurMessage],
              forwardingScore: 9999,
              isForwarded: true,
            },
          }),
        },
      },
    }, {});
      
    await zk.relayMessage(origineMessage, message.message, { messageId:  message.key.id });
  //  await zk.sendMessage(origineMessage, messageOptions.message,  { quoted: ms });
       } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
    }
  }
);
 
