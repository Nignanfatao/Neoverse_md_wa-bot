const { zokou } = require("../framework/zokou");
const s = require("../set");

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
