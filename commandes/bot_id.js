const { zokou } = require('../framework/zokou');
const ainz = require('../Id_ext/northdiv');

zokou(
  {
    nomCom: 'id',
    reaction: '🔷',
    categorie: 'Other'
  },
  async (origineMessage, zk, commandeOptions) => {
    const { ms, auteurMessage, repondre } = commandeOptions;

    // Recherche si l'auteur du message correspond à un ID dans le tableau ainz
    const utilisateur = ainz.find(item => item.id === auteurMessage);

    if (utilisateur) {
      // Si l'ID correspond, envoie un message avec le nom
      let msg = `Salut ${utilisateur.nom}!`;
      repondre(msg);
    } else {
      // Si l'ID ne correspond pas, on peut envoyer un autre message ou ne rien faire
      repondre("ID non trouvé.");
    }
  }
);
