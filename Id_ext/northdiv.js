// Tableau des utilisateurs avec leurs informations et requêtes SQL
const players = [
  // north Division 

  // ainz 
  { 
    id: "22651463203@s.whatsapp.net", 
    nom: "Ainz",
    cln_np: 'e9',
    cln_nc: "e6",
    cln_coupons: "e8", 
    cln_golds: "e5",
    get_np: "SELECT e9 FROM northdiv WHERE id = 8", 
    get_nc: "SELECT e6 FROM northdiv WHERE id = 8", 
    get_coupons: "SELECT e8 FROM northdiv WHERE id = 8", 
    get_golds: "SELECT e5 FROM northdiv WHERE id = 8",
    upd_np: "UPDATE northdiv SET e9 = $1 WHERE id = 8", 
    upd_nc: "UPDATE northdiv SET e6 = $1 WHERE id = 8", 
    upd_coupons: "UPDATE northdiv SET e8 = $1 WHERE id = 8", 
    upd_golds: "UPDATE northdiv SET e5 = $1 WHERE id = 8"
  }, 

  //Central Division 

  // Hakuji
  { 
    id: "237671923647@s.whatsapp.net", 
    nom: "Hakuji",
    cln_np: 'e9',
    cln_nc: "e6",
    cln_coupons: "e8", 
    cln_golds: "e5",
    get_np: "SELECT e9 FROM centraldiv WHERE id = 5", 
    get_nc: "SELECT e6 FROM centraldiv WHERE id = 5", 
    get_coupons: "SELECT e8 FROM centraldiv WHERE id = 5", 
    get_golds: "SELECT e5 FROM  centraldiv WHERE id = 5",
    upd_np: "UPDATE centraldiv SET e9 = $1 WHERE id = 5", 
    upd_nc: "UPDATE centraldiv SET e6 = $1 WHERE id = 5", 
    upd_coupons: "UPDATE centraldiv SET e8 = $1 WHERE id = 5", 
    upd_golds: "UPDATE centraldiv SET e5 = $1 WHERE id = 5"
  }
 /* { 
    id: "", 
    nom: "",
    cln_np: 'e9',
    cln_nc: "e6",
    cln_coupons: "e8", 
    cln_golds: "e5",
    get_np: "SELECT e9 FROM centraldiv WHERE id = ", 
    get_nc: "SELECT e6 FROM centraldiv WHERE id = ", 
    get_coupons: "SELECT e8 FROM centraldiv WHERE id = ", 
    get_golds: "SELECT e5 FROM  centraldiv WHERE id = ",
    upd_np: "UPDATE centraldiv SET e9 = $1 WHERE id = ", 
    upd_nc: "UPDATE centraldiv SET e6 = $1 WHERE id = ", 
    upd_coupons: "UPDATE centraldiv SET e8 = $1 WHERE id = ", 
    upd_golds: "UPDATE centraldiv SET e5 = $1 WHERE id = "
  }, */

  // West Division

 /* { 
    id: "", 
    nom: "",
    cln_np: 'e9',
    cln_nc: "e6",
    cln_coupons: "e8", 
    cln_golds: "e5",
    get_np: "SELECT e9 FROM westdiv WHERE id = ", 
    get_nc: "SELECT e6 FROM westdiv WHERE id = ", 
    get_coupons: "SELECT e8 FROM westdiv WHERE id = ", 
    get_golds: "SELECT e5 FROM westdiv WHERE id = ",
    upd_np: "UPDATE westdiv SET e9 = $1 WHERE id = ", 
    upd_nc: "UPDATE westdiv SET e6 = $1 WHERE id = ", 
    upd_coupons: "UPDATE westdiv SET e8 = $1 WHERE id = ", 
    upd_golds: "UPDATE westdiv SET e5 = $1 WHERE id = "
 }*/

// East Division

 /* { 
    id: "", 
    nom: "",
    cln_np: 'e9',
    cln_nc: "e6",
    cln_coupons: "e8", 
    cln_golds: "e5",
    get_np: "SELECT e9 FROM eastdiv WHERE id = ", 
    get_nc: "SELECT e6 FROM eastdiv WHERE id = ", 
    get_coupons: "SELECT e8 FROM eastdiv WHERE id = ", 
    get_golds: "SELECT e5 FROM eastdiv WHERE id = ",
    upd_np: "UPDATE eastdiv SET e9 = $1 WHERE id = ", 
    upd_nc: "UPDATE eastdiv SET e6 = $1 WHERE id = ", 
    upd_coupons: "UPDATE eastdiv SET e8 = $1 WHERE id = ", 
    upd_golds: "UPDATE eastdiv SET e5 = $1 WHERE id = "
  }, */
  
];

module.exports = players;
