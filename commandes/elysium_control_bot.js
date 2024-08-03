async function maine({ zk, texte, origineMessage, repondre, ms }) {
    //const mtexte = texte.toLowerCase();
    const neo_texte = texte.toLowerCase().includes('contoir');
    const neo_text = texte.toLowerCase().includes('19km');
    
    const urlimage = 'https://telegra.ph/file/b9ed1612f868e83bbe6b4.jpg';
    if (origineMessage == '22605463559@s.whatsapp.net') {
        if(neo_texte && neo_text) {
        //console.log('Condition de salut remplie');
       // repondre('salut sa va?');
        zk.sendMessage(dest, { image: { url: urlimage }, caption: "" }, { quoted: ms });
    
        }
    }
}

module.exports = maine;
