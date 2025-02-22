//const activeTimers = {};
//async function simulateLoading(zk, origineMessage) {
    //const frames = [
        //"`❪▬▭▭▭▭▭▭▭▭❫`",
        //"`❪▬▬▭▭▭▭▭▭▭❫`",
        //"`❪▬▬▬▭▭▭▭▭▭❫`",
        //"`❪▬▬▬▬▭▭▭▭▭❫`",
        //"`❪▬▬▬▬▬▭▭▭▭❫`",
        //"`❪▬▬▬▬▬▬▭▭▭❫`",
        //"`❪▬▬▬▬▬▬▬▭▭❫`",
        //"`❪▬▬▬▬▬▬▬▬▭❫`",
        //"`❪▬▬▬▬▬▬▬▬▬❫`",
        //"`❪▬▬▬▬100%▬▬▬❫`"
   // ];

   // let loadingMessage = await zk.sendMessage(origineMessage, { text: frames[0] });

 //   for (let i = 1; i < frames.length; i++) {
 //       await new Promise((resolve) => setTimeout(resolve, 1000)); // Attend 1 seconde
 //       await zk.editMessage(origineMessage, { text: frames[i], messageId: loadingMessage.key.id });
//    }

   // await zk.editMessage(origineMessage, { text: "❪▬▬▬▬100%▬▬▬▬❫\nChargement terminé ! 🎉", messageId: loadingMessage.key.id });
//}

//async function handleMessage({ zk, texte, origineMessage }) {
//    const neoTexte = texte.toLowerCase();

//    if (neoTexte.includes("chargement")) {
//        await simulateLoading(zk, origineMessage);
//    }
//}

//module.exports = handleMessage;
