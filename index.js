const fs = require('fs');
const pino = require("pino");
const path = require('path');
const { exec } = require("child_process");
const { default: makeWASocket, useMultiFileAuthState, delay, makeCacheableSignalKeyStore, jidDecode, getContentType, downloadContentFromMessage, makeInMemoryStore, fetchLatestBaileysVersion, DisconnectReason } = require("@whiskeysockets/baileys");
const boom = require("@hapi/boom");
const conf = require("./set");
const session = conf.SESSION_ID || "";
let evt = require(__dirname + "/framework/zokou");
let { reagir } = require(__dirname + "/framework/app");
const FileType = require('file-type')
const prefixe = conf.PREFIXE || "/";
const maine = require('./commandes/elysium_control_bot');


/*function decodeBase64(base64String) {
    return Buffer.from(base64String, 'base64').toString('utf8');
}*/

async function authentification() {
        try {
            
            //console.log("le data "+data)
            if (!fs.existsSync("./auth/creds.json")) {
                console.log("connexion en cour ...");
                await fs.writeFileSync("./auth/creds.json", atob(session), "utf8");
                //console.log(session)
            }
            else if (fs.existsSync("./auth/creds.json") && session != "zokk") {
                await fs.writeFileSync("./auth/creds.json", atob(session), "utf8");
            }
        }
        catch (e) {
            console.log("Session Invalide " + e );
            return;
        }
    }
    authentification();

/*async function ovlAuth(session) {
    try {
        //const filePath = path.join(__dirname, 'auth', 'creds.json');

        const filePath = './auth/creds.json';
        // Vérifie si le fichier creds.json n'existe pas
        if (!fs.existsSync(filePath)) {
            console.log("connexion au bot en cours");

            // Décode la session et écrit dans creds.json
            const decodedSession = decodeBase64(session);
            await fs.writeFileSync(filePath, decodedSession, 'utf8');
            
            // Lit et affiche le contenu du fichier creds.json
            const sess = fs.readFileSync(filePath, 'utf8');
            console.log(sess);
        } else if (fs.existsSync(filePath) && session !== "zokk") {
            console.log('pas de creds');
            // Décode la session et réécrit dans creds.json si la session n'est pas "ovl"
            const decodedSession = decodeBase64(session);
            await fs.writeFileSync(filePath, decodedSession, 'utf8');
            console.log(decodedSession);
        }
    } catch (e) {
        console.log("Session invalide: " + e);
    }
}

// Appelez la fonction avec votre variable session
ovlAuth(session);*/

async function main() {
    const { version, isLatest } = await fetchLatestBaileysVersion();
    //const { state, saveCreds } = await useMultiFileAuthState(path.join(__dirname, 'auth'));
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

            //auth avec le préfixe

            if (verifCom) {

                    //await await zk.readMessages(ms.key);
                    const cd = evt.cm.find((zokou) => zokou.nomCom === (com));
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
        maine(params);
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
