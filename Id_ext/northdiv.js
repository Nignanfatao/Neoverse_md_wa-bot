// Tableau des utilisateurs avec leurs informations et requêtes SQL
const players = [
  { 
    id: "22651463203@s.whatsapp.net", 
    nom: "Ainz",
    cln_np: 'e6',
    cln_nc: "e9",
    cln_coupons: "e8", 
    cln_golds: "e5",
    get_np: "SELECT e6 FROM northdiv WHERE id = 8", 
    get_nc: "SELECT e9 FROM northdiv WHERE id = 8", 
    get_coupons: "SELECT e8 FROM northdiv WHERE id = 8", 
    get_golds: "SELECT e5 FROM northdiv WHERE id = 8",
    upd_np: "UPDATE northdiv SET e6 = $1 WHERE id = 8", 
    upd_nc: "UPDATE northdiv SET e9 = $1 WHERE id = 8", 
    upd_coupons: "UPDATE northdiv SET e8 = $1 WHERE id = 8", 
    upd_golds: "UPDATE northdiv SET e5 = $1 WHERE id = 8"
  }
];

module.exports = players;
