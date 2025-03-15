const { zokou } = require('../framework/zokou');

zokou(
    {
        nomCom: '',
        categorie: 'Other'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0)  {
            const lien = 'https://files.catbox.moe/06hjut.jpg';
            const msg = '';
            zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
        }
    }
);
