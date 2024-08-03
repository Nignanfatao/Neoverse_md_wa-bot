async function maine({ zk, texte, origineMessage, repondre, ms }) {
    const mtexte = texte.toLowerCase();
    const neo_texte = texte.includes(mtexte);
    const urlimage = 'https://telegra.ph/file/b9ed1612f868e83bbe6b4.jpg';
    if (neo_texte && origineMessage == '120363307444088356@g.us') {
        //console.log('Condition de salut remplie');
       // repondre('salut sa va?');
        zk.sendMessage(dest, { image: { url: urlimage }, caption: "" }, { quoted: ms });
    
    }
}

module.exports = maine;
