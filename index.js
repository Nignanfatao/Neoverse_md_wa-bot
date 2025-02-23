const fs = require('fs');
const pino = require("pino");
const path = require('path');
const { exec } = require("child_process");
const { default: makeWASocket, useMultiFileAuthState, generateWAMessageFromContent, prepareWAMessageMedia, proto, delay, makeCacheableSignalKeyStore, jidDecode, getContentType, downloadContentFromMessage, makeInMemoryStore, fetchLatestBaileysVersion, DisconnectReason } = require("@whiskeysockets/baileys");
const boom = require("@hapi/boom");
const conf = require("./set");
const session = conf.SESSION_ID || "";
let evt = require(__dirname + "/framework/zokou");
let { reagir } = require(__dirname + "/framework/app");
const axios = require("axios");
const FileType = require('file-type')
const prefixe = conf.PREFIXE || "/";
//const maine = require('./commandes/elysium_control_bot');
const latence = require('./commandes/decompte');
const stats = require('./commandes/stats');

async function ovlAuth(session) {
    let sessionId;
    try {
        if (session.startsWith("Ovl-MD_") && session.endsWith("_SESSION-ID")) {
            sessionId = session.slice(7, -11);
        }
        const response = await axios.get('https://pastebin.com/raw/' + sessionId);
        const data = typeof response.data === 'string' ? response.data : JSON.stringify(response.data);
        const filePath = path.join(__dirname, 'auth', 'creds.json');
        if (!fs.existsSync(filePath)) {
            console.log("Connexion au bot en cours");
            await fs.writeFileSync(filePath, data, 'utf8'); 
        } else if (fs.existsSync(filePath) && session !== "ovl") {
            await fs.writeFileSync(filePath, data, 'utf8');
        }
    } catch (e) {
        console.log("Session invalide: " + e.message || e);
    }
 }
ovlAuth(session);

async function main() {
    const { version, isLatest } = await fetchLatestBaileysVersion();
    const { state, saveCreds } = await useMultiFileAuthState('./auth');
    try {
        const store = makeInMemoryStore({ logger: pino().child({ level: "silent", stream: "store"
  })
});
        const zk = makeWASocket({
            version, 
            printQRInTerminal: false,
            logger: pino({ level: "silent" }),
            browser: ["Ubuntu", "Chrome", "20.0.04"],
            fireInitQueries: false,
            shouldSyncHistoryMessage: true,
            downloadHistory: true,
            syncFullHistory: true,
            generateHighQualityLinkPreview: true,
            markOnlineOnConnect: false,
            keepAliveIntervalMs: 30000,
            auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" }))
        },
           getMessage: async (key) => {
                if (store) {
                    const msg = await store.loadMessage(key.remoteJid, key.id, undefined);
                    return msg.message || undefined;
                }
                return {
                    conversation: 'An Error Occurred, Repeat Command!'
                };
           }
        });
        
        zk.ev.on("messages.upsert", async (m) => {
            const { messages } = m;
            const ms = messages[0];
            if (!ms.message) return;
            const decodeJid = (jid) => {
                if (!jid) return jid;
                if (/:\d+@/gi.test(jid)) {
                    let decode = jidDecode(jid) || {};
                    return decode.user && decode.server && `${decode.user}@${decode.server}` || jid;
                }
                return jid;
            };

            var mtype = getContentType(ms.message);
            var texte = mtype == "conversation" ? ms.message.conversation :
                mtype == "imageMessage" ? ms.message.imageMessage?.caption :
                mtype == "videoMessage" ? ms.message.videoMessage?.caption :
                mtype == "extendedTextMessage" ? ms.message?.extendedTextMessage?.text :
                mtype == "buttonsResponseMessage" ? ms?.message?.buttonsResponseMessage?.selectedButtonId :
                mtype == "listResponseMessage" ? ms.message?.listResponseMessage?.singleSelectReply?.selectedRowId :
                mtype == "messageContextInfo" ? (ms?.message?.buttonsResponseMessage?.selectedButtonId || ms.message?.listResponseMessage?.singleSelectReply?.selectedRowId || ms.text) : "";

            var origineMessage = ms.key.remoteJid;
            var idBot = decodeJid(zk.user.id);
            var servBot = idBot.split('@')[0];
            const verifGroupe = origineMessage?.endsWith("@g.us");
            var infosGroupe = verifGroupe ? await zk.groupMetadata(origineMessage) : "";
            var nomGroupe = verifGroupe ? infosGroupe.subject : "";
            var msgRepondu = ms.message.extendedTextMessage?.contextInfo?.quotedMessage;
            var auteurMsgRepondu = decodeJid(ms.message?.extendedTextMessage?.contextInfo?.participant);
            var mr = ms.message?.extendedTextMessage?.contextInfo?.mentionedJid;
            var utilisateur = mr ? mr : msgRepondu ? auteurMsgRepondu : "";
            var auteurMessage = verifGroupe ? (ms.key.participant ? ms.key.participant : ms.participant) : origineMessage;
            if (ms.key.fromMe) {
                auteurMessage = idBot;
            }

            var membreGroupe = verifGroupe ? ms.key.participant : '';
            const nomAuteurMessage = ms.pushName;
            const { getAllSudoNumbers } = require("./bdd/sudo");
                const fatao = '22651463203';
                const sudo = await getAllSudoNumbers();
                const superUserNumbers = [servBot, fatao, conf.NUMERO_OWNER].map((s) => s.replace(/[^0-9]/g) + "@s.whatsapp.net");
                const allAllowedNumbers = superUserNumbers.concat(sudo);
                const superUser = allAllowedNumbers.includes(auteurMessage);
                
                var dev = [fatao].map((t) => t.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(auteurMessage);
                
            const arg = texte ? texte.trim().split(/ +/).slice(1) : null;
           const verifCom = texte ? texte.startsWith(prefixe) : false;
          const com = verifCom ? texte.slice(1).trim().split(/ +/).shift().toLowerCase() : false;
            function groupeAdmin(membreGroupe) {
                    let admin = [];
                    for (m of membreGroupe) {
                        if (m.admin == null)
                            continue;
                        admin.push(m.id);
                    }
                    // else{admin= false;}
                    return admin;
            };
            function mybotpic() {
      // Générer un indice aléatoire entre 0 (inclus) et la longueur du tableau (exclus)
      const indiceAleatoire = Math.floor(Math.random() * liens.length);
      // Récupérer le lien correspondant à l'indice aléatoire
      const lienAleatoire = liens[indiceAleatoire];
      return lienAleatoire;
            }
            const mbre = verifGroupe ? await infosGroupe.participants : '';
            let admins = verifGroupe ? groupeAdmin(mbre) : '';
            const verifAdmin = verifGroupe ? admins.includes(auteurMessage) : false;
            var verifOvlAdmin = verifGroupe ? admins.includes(idBot) : false;

            var commandeOptions = {
                    superUser, 
                    verifGroupe,
                    mbre,
                    membreGroupe,
                    verifAdmin,
                    infosGroupe,
                    nomGroupe,
                    auteurMessage,
                    nomAuteurMessage,
                    idBot,
                    verifOvlAdmin,
                    prefixe,
                    arg,
                    repondre,
                    groupeAdmin,
                    msgRepondu,
                    auteurMsgRepondu,
                    ms, 
                    origineMessage, 
                    mybotpic
                
                };
               
                console.log("NEOverse_md");
            if (verifGroupe) {
                console.log("Message provenant du groupe : " + nomGroupe);
            }
            console.log("Message envoyé par : " + "[" + nomAuteurMessage + " : " + auteurMessage.split("@s.whatsapp.net")[0] + " ]");
            //console.log("Type de message : " + mtype);
            console.log("contenu du message.....");
            console.log(texte);

            // Fonction pour répondre à un message
            function repondre(message) {
                zk.sendMessage(origineMessage, { text: message }, { quoted: ms });
            }

            //auth avec le préfixe et id
            let buttonId;
            if (mtype === 'templateButtonReplyMessage') {
         buttonId = ms.message.templateButtonReplyMessage.selectedId;
            };
            
            if (verifCom || buttonId ) {
                let cd
                if(verifCom) {
                    cd = evt.cm.find((zokou) => zokou.nomCom === (com));
                } else { 
                    cd = evt.cm.find((zokou) => zokou.nomCom === buttonId);
                }
            
                    if (cd) {
                        
                        try {
                            reagir(origineMessage, zk, ms, cd.reaction);
                            cd.fonction(origineMessage, zk, commandeOptions);
                        }
                        catch (e) {
                            console.log("😡😡 " + e);
                            zk.sendMessage(origineMessage, { text: "😡😡 " + e }, { quoted: ms });
                        }
                        }};

          const params = { zk, texte, origineMessage, repondre, ms };
      //  maine(params);
        latence({zk, texte, origineMessage});
        stats(texte, repondre);


            }); //fin evenement message

        zk.ev.on("connection.update", async (con) => {
            const { connection, lastDisconnect } = con;
            if (connection === "connecting") {
                console.log("🌐connexion à whatsapp");
            } else if (connection === 'open')  {
                console.log("✅connexion etablit; Le bot est en ligne 🌐\n\n");
                delay(300) ;
                console.log("Chargement des commandes ...\n");
                fs.readdirSync(path.join(__dirname, "commandes")).forEach((fichier) => {
                    if (path.extname(fichier).toLowerCase() == ".js") {
                        try {
                            require(path.join(__dirname, "commandes", fichier));
                            console.log(fichier + " installé avec succès");
                        } catch (e) {
                            console.log(` une erreur est survenu lors du chargement du fichier ${fichier} : ${e}`);
                        }
                    }
                    delay(300);
                });
                delay(700);
                let cmsg = `╭──❏ *🄽🄴🄾_🅆🄰-🄱🄾🅃*  ❏
│ ✿ Prefixe : [ ${prefixe} ]
│ ✿  Mode :
│ ✿ Commandes:︎ ${evt.cm.length}
╰═════════════⊷`;
                await zk.sendMessage(zk.user.id, { text: cmsg });
            } else if (connection == "close") {
                let raisonDeconnexion = new boom.Boom(lastDisconnect?.error)?.output.statusCode;
                if (raisonDeconnexion === DisconnectReason.badSession) {
                    console.log('Session id érronée veuiller obtenir une nouvelle session_id via Qr-code/Pairing-code svp ...');
                } else if (raisonDeconnexion === DisconnectReason.connectionClosed) {
                    console.log('!!! connexion fermée, reconnexion en cours ...');
                    main();
                } else if (raisonDeconnexion === DisconnectReason.connectionLost) {
                    console.log('connexion au serveur perdue😞 ,,, reconnexion en cours ...♻️');
                    main();
                } else if (raisonDeconnexion === DisconnectReason.connectionReplaced) {
                    console.log('connexion réplacée ,,, une sesssion est déjà ouverte veuillez la fermer svp !!!');
                } else if (raisonDeconnexion === DisconnectReason.loggedOut) {
                    console.log('veuillez obtenir une nouvelle session_id via Qr-code/Pairing-code svp');
                } else if (raisonDeconnexion === DisconnectReason.restartRequired) {
                    console.log('redémarrage du bot en cours ♻️');
                    main();
                } else {
                    console.log('une erreur est survenu:', raisonDeconnexion);
                    exec("pm2 restart all");
                }
                console.log("hum " + connection);
            }
        });

        zk.ev.on('group-participants.update', async (data) => {
    const parseID = (jid) => {
        if (!jid) return jid;
        if (/:\d+@/gi.test(jid)) {
            const decode = jidDecode(jid) || {};
            return (decode.user && decode.server && `${decode.user}@${decode.server}`) || jid;
        }
        return jid;
    };

    const groupPic = 'https://files.catbox.moe/ehnubw.jpg';
    try {
         if (data.action === 'add' && data.id == '120363031940789145@g.us' && conf.WELCOME == 'oui') {
            const newMembers = data.participants.map(m => `@${m.split("@")[0]}`).join('\n');
            const mek = `🎉 🔷 *🎉WELCOME 𝗮̀ 🔷𝗡Ξ𝗢𝘃𝗲𝗿𝘀𝗲🎉* 🎮
░▒▒▒▒░░▒░▔▔▔▔▔▔▔▔▔▔▔▔▔
Bienvenue à vous *${newMembers}* 😃💙👋🏻, ceci est le salon de Recrutement des nouveaux joueurs ! Une fois avoir lu et terminé les conditions d'intégration, vous serez ajoutés dans le Salon principal. #NEONation💙 #Welcome💙👋🏻🙂. 

🔷🎮 *𝖢𝖮𝖭𝖣𝖨𝖳𝖨𝖮𝖭𝖲 𝖭𝖤𝖮𝗏𝖾𝗋𝗌𝖾*
░▒▒▒▒░░▒░▔▔▔▔▔▔▔▔▔▔▔▔▔
❓Voici comment s'enregistrer à NEOverse👇🏼:

👉🏽 *ÉTAPE 1️⃣*: Votre Pseudo (Nom de joueur + Pays + Numéro de téléphone)
👉🏽 *ÉTAPE 2️⃣:* Envoyer une photo de profil de votre avatar (de préférence un perso anime comme Blue Lock, etc.). 
👉🏽 *ÉTAPE 3️⃣* : Follow les deux chaînes ci-dessous 
👉🏽 *ÉTAPE 4️⃣*: Attendez votre première carte de jeu avant de demander l'intégration : https://chat.whatsapp.com/LrKSRoxMcPi133sCtQB8Hf. 

*🌍NOS LIENS*👇👇👇
▔▔▔▔▔▔▔▔▔▔▔▔▔
👉🏽🪀 *Chaîne* : /whatsapp.com/channel/0029VaN9Z2yL2AU55DSahC23

👉🏽 *🛍️RP Store* : /whatsapp.com/channel/0029VaS9ngkFHWqAHps0BL3f

░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
💙𝗡Ξ𝗢🙂🏆🎉`;
            await zk.sendMessage(data.id, { image: { url: groupPic }, caption: mek, mentions: data.participants });
        }
    } catch (error) {
        console.error("Erreur lors de la gestion des participants :", error);
    }
        });
        
        // Gestion des mises à jour des identifiants
        zk.ev.on("creds.update", saveCreds);

            //autre fonction de ovl
            zk.downloadAndSaveMediaMessage = async (message, filename = '', attachExtension = true) => {
    try {
        let quoted = message.msg ? message.msg : message;
        let mime = (message.msg || message).mimetype || '';
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];
        
        console.log(`Téléchargement du message de type: ${messageType}`);

        const stream = await downloadContentFromMessage(quoted, messageType);
        let buffer = Buffer.from([]);

        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }

        let type = await FileType.fromBuffer(buffer);
        if (!type) {
            throw new Error("Type de fichier non reconnu");
        }

        let trueFileName = attachExtension ? `${filename}.${type.ext}` : filename;
        let filePath = path.resolve('./', trueFileName);

        await fs.promises.writeFile(filePath, buffer);
        console.log(`Fichier sauvegardé à: ${filePath}`);

        return filePath;
    } catch (error) {
        console.error('Erreur lors du téléchargement et de la sauvegarde du fichier:', error);
        throw error; // Rethrow pour que l'appelant puisse gérer l'erreur s'il le souhaite
    }
};
        zk.awaitForMessage = async (options = {}) =>{
        return new Promise((resolve, reject) => {
            if (typeof options !== 'object') reject(new Error('Options must be an object'));
            if (typeof options.sender !== 'string') reject(new Error('Sender must be a string'));
            if (typeof options.chatJid !== 'string') reject(new Error('ChatJid must be a string'));
            if (options.timeout && typeof options.timeout !== 'number') reject(new Error('Timeout must be a number'));
            if (options.filter && typeof options.filter !== 'function') reject(new Error('Filter must be a function'));
    
            const timeout = options?.timeout || undefined;
            const filter = options?.filter || (() => true);
            let interval = undefined
    
            /**
             * 
             * @param {{messages: Baileys.proto.IWebMessageInfo[], type: Baileys.MessageUpsertType}} data 
             */
            let listener = (data) => {
                let { type, messages } = data;
                if (type == "notify") {
                    for (let message of messages) {
                        const fromMe = message.key.fromMe;
                        const chatId = message.key.remoteJid;
                        const isGroup = chatId.endsWith('@g.us');
                        const isStatus = chatId == 'status@broadcast';
    
                        const sender = fromMe ? zk.user.id.replace(/:.*@/g, '@') : (isGroup || isStatus) ? message.key.participant.replace(/:.*@/g, '@') : chatId;
                        if (sender == options.sender && chatId == options.chatJid && filter(message)) {
                            zk.ev.off('messages.upsert', listener);
                            clearTimeout(interval);
                            resolve(message);
                        }
                    }
                }
            }
            zk.ev.on('messages.upsert', listener);
            if (timeout) {
                interval = setTimeout(() => {
                    zk.ev.off('messages.upsert', listener);
                    reject(new Error('Timeout'));
                }, timeout);
            }
        });
    } 

    zk.sendButImg = async (org, auteur, txt, img, buttons) => {
  try {
    const preparedMedia = await prepareWAMessageMedia({ 
      image: { url: img } 
    }, { upload: zk.waUploadToServer });

    const message = generateWAMessageFromContent(org, {
      message: {
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: txt,
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            imageMessage: preparedMedia.imageMessage,
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: buttons,
          }),
          contextInfo: {
            mentionedJid: [auteur],
            forwardingScore: 1,
            isForwarded: false,
          },
        }),
      },
    }, {});

    await zk.relayMessage(org, message.message, { messageId: message.key.id });
    
  } catch (error) {
    console.error("Erreur lors de l'envoi du message :", error);
  }
};

zk.sendButTxt = async (org, auteur, txt, buttons) => {
  try {
    const message = generateWAMessageFromContent(org, {
      message: {
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: txt,
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: buttons,
          }),
          contextInfo: {
            mentionedJid: [auteur],
            forwardingScore: 1,
            isForwarded: false,
          },
        }),
      },
    }, {});

    await zk.relayMessage(org, message.message, { messageId: message.key.id });
  } catch (error) {
    console.error("Erreur lors de l'envoi du message texte avec boutons :", error);
  }
};

 zk.sendBut = async (org, buttons) => {
  try {
    const message = generateWAMessageFromContent(org, {
      message: {
        interactiveMessage: proto.Message.InteractiveMessage.create({
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: buttons,
          }),
        }),
      },
    }, {});

    await zk.relayMessage(org, message.message, { messageId: message.key.id });
  } catch (error) {
    console.error("Erreur lors de l'envoi des boutons sans texte ni image :", error);
  }
};
        
            //fin autre fonction ovl
    } catch (error) {
        console.error("Erreur principale:", error);
    }
}

main();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Assurez-vous d'ajouter cette ligne pour définir le port

app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ovl-bot web page</title>
        <style>
            /* Styles pour centrer le texte */
            body {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                font-family: Arial, sans-serif;
                background-color: #f0f0f0;
            }
            .content {
                text-align: center;
                padding: 20px;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
        </style>
    </head>
    <body>
        <div class="content">
            <h1>Neoverse_md_wa-bot Web-page</h1>
        </div>
    </body>
    </html>
      `);
});

app.listen(port, () => {
  console.log("Listening on port: " + port);
});
