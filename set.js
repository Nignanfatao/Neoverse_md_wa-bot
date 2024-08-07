const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
const path = require("path");

module.exports = { 
    SESSION_ID: process.env.SESSION_ID || 'zokk',
    PREFIXE: process.env.PREFIXE || "/",            
    MODE: process.env.MODE_PUBLIC || "oui",
    DB: process.env.DB || 'postgres://neoverse:pomrleUMXwlmlpIcW2oFJmMX0CXzaFkf@dpg-combonun7f5s73d7uoog-a.oregon-postgres.render.com/neoverse_wz98',
    NOM_OWNER: process.env.NOM_OWNER || "Fatao",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "22651463203",             
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
