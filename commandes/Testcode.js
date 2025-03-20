const { zokou } = require('../framework/zokou');

zokou({ nomCom: 'test', categorie: 'Other' }, (dest, zk, commandeOptions) => {
  const { repondre } = commandeOptions;
  repondre('+eastwhite👤 golds - 500000');
});
