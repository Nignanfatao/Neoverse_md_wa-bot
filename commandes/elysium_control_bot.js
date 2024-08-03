async function main({ texte, origineMessage, repondre }) {
    if (texte === 'salut' && origineMessage === '22605463559@s.whatsapp.net') {
        console.log('Condition de salut remplie');
        repondre('salut sa va?');
    }
}

module.exports = maine;
