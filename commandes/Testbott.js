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

      const message = generateWAMessageFromContent(origineMessage, {
        viewOnceMessage: {
          message: {
            extendedTextMessage: proto.Message.ExtendedTextMessage.create({
              text: 'Message Text',
              footer: 'Neoverse_Md_bot',
              title: '',
              mediaMessage: imageMedia.imageMessage,
              buttons: [
                { buttonId: '+menu', buttonText: { displayText: '📜 COMMAND LIST' }, type: 1 },
                { buttonId: '+pave', buttonText: { displayText: '⏳ PING' }, type: 1 },
                { buttonId: 'repo', buttonText: { displayText: '📂 REPO' }, type: 1, urlButton: 'https://github.com/devibraah/BWM-XMD' },
                { buttonId: 'howto', buttonText: { displayText: '📽 HOW TO DEPLOY' }, type: 1, urlButton: 'https://ibrahim-adams.vercel.app/Deploy.html' },
                { buttonId: 'channel', buttonText: { displayText: '🛰 WHATSAPP CHANNEL' }, type: 1, urlButton: 'https://whatsapp.com/channel/0029VaZuGSxEawdxZK9CzM0Y' },
              ],
              mentionedJid: [auteurMessage],
              contextInfo: { forwardingScore: 9999, isForwarded: true }
            })
          }
        }
      }, {});

      await zk.relayMessage(origineMessage, message.message, { messageId:  message.key.id });
     // await zk.sendMessage(origineMessage, message.message, { quoted: ms });
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
                  url: 'https://i.imgur.com/G3WM4D8.jpeg',
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
                    display_text: "📜 COMMAND LIST",
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
 
