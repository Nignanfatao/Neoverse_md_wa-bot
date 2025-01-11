/*// Tableau des utilisateurs avec leurs informations et requêtes SQL
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
  //Aizen
  { 
    id: "221774255562@s.whatsapp.net", 
    nom: "Aizen",
    cln_np: 'e9',
    cln_nc: "e6",
    cln_coupons: "e8", 
    cln_golds: "e5",
    get_np: "SELECT e9 FROM northdiv WHERE id = 11", 
    get_nc: "SELECT e6 FROM northdiv WHERE id = 11", 
    get_coupons: "SELECT e8 FROM northdiv WHERE id = 11", 
    get_golds: "SELECT e5 FROM northdiv WHERE id = 11",
    upd_np: "UPDATE northdiv SET e9 = $1 WHERE id = 11", 
    upd_nc: "UPDATE northdiv SET e6 = $1 WHERE id = 11", 
    upd_coupons: "UPDATE northdiv SET e8 = $1 WHERE id = 11", 
    upd_golds: "UPDATE northdiv SET e5 = $1 WHERE id = 11"
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
  }, 
//Irito

  { 
    id: "237656431187@s.whatsapp.net", 
    nom: "Irito",
    cln_np: 'e9',
    cln_nc: "e6",
    cln_coupons: "e8", 
    cln_golds: "e5",
    get_np: "SELECT e9 FROM centraldiv WHERE id = 4", 
    get_nc: "SELECT e6 FROM centraldiv WHERE id = 4", 
    get_coupons: "SELECT e8 FROM centraldiv WHERE id = 4", 
    get_golds: "SELECT e5 FROM  centraldiv WHERE id = 4",
    upd_np: "UPDATE centraldiv SET e9 = $1 WHERE id = 4", 
    upd_nc: "UPDATE centraldiv SET e6 = $1 WHERE id = 4", 
    upd_coupons: "UPDATE centraldiv SET e8 = $1 WHERE id = 4", 
    upd_golds: "UPDATE centraldiv SET e5 = $1 WHERE id = 4"
  },
  //rudeus
  { 
    id: "242064379833@s.whatsapp.net", 
    nom: "Rudeus",
    cln_np: 'e9',
    cln_nc: "e6",
    cln_coupons: "e8", 
    cln_golds: "e5",
    get_np: "SELECT e9 FROM centraldiv WHERE id = 10", 
    get_nc: "SELECT e6 FROM centraldiv WHERE id = 10", 
    get_coupons: "SELECT e8 FROM centraldiv WHERE id = 10", 
    get_golds: "SELECT e5 FROM  centraldiv WHERE id = 10",
    upd_np: "UPDATE centraldiv SET e9 = $1 WHERE id = 10", 
    upd_nc: "UPDATE centraldiv SET e6 = $1 WHERE id = 10", 
    upd_coupons: "UPDATE centraldiv SET e8 = $1 WHERE id = 10", 
    upd_golds: "UPDATE centraldiv SET e5 = $1 WHERE id = 10"
  },
  { 
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
  },
  { 
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
  },
 { 
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
  }, 

  // West Division

  // regulus
  { 
    id: "243970490637@s.whatsapp.net", 
    nom: "regulus",
    cln_np: 'e9',
    cln_nc: "e6",
    cln_coupons: "e8", 
    cln_golds: "e5",
    get_np: "SELECT e9 FROM westdiv WHERE id = 11", 
    get_nc: "SELECT e6 FROM westdiv WHERE id = 11", 
    get_coupons: "SELECT e8 FROM westdiv WHERE id = 11", 
    get_golds: "SELECT e5 FROM westdiv WHERE id = 11",
    upd_np: "UPDATE westdiv SET e9 = $1 WHERE id = 11", 
    upd_nc: "UPDATE westdiv SET e6 = $1 WHERE id = 11", 
    upd_coupons: "UPDATE westdiv SET e8 = $1 WHERE id = 11", 
    upd_golds: "UPDATE westdiv SET e5 = $1 WHERE id = 11"
}, 

//Hajime
{ 
    id: "237678054208@s.whatsapp.net", 
    nom: "Hajime",
    cln_np: 'e9',
    cln_nc: "e6",
    cln_coupons: "e8", 
    cln_golds: "e5",
    get_np: "SELECT e9 FROM westdiv WHERE id = 10", 
    get_nc: "SELECT e6 FROM westdiv WHERE id = 10", 
    get_coupons: "SELECT e8 FROM westdiv WHERE id = 10", 
    get_golds: "SELECT e5 FROM westdiv WHERE id = 10",
    upd_np: "UPDATE westdiv SET e9 = $1 WHERE id = 10", 
    upd_nc: "UPDATE westdiv SET e6 = $1 WHERE id = 10", 
    upd_coupons: "UPDATE westdiv SET e8 = $1 WHERE id = 10", 
    upd_golds: "UPDATE westdiv SET e5 = $1 WHERE id = 10"
},
//William
{ 
    id: "", 
    nom: "Willian",
    cln_np: 'e9',
    cln_nc: "e6",
    cln_coupons: "e8", 
    cln_golds: "e5",
    get_np: "SELECT e9 FROM westdiv WHERE id = 9", 
    get_nc: "SELECT e6 FROM westdiv WHERE id = 9", 
    get_coupons: "SELECT e8 FROM westdiv WHERE id = 9", 
    get_golds: "SELECT e5 FROM westdiv WHERE id = 9",
    upd_np: "UPDATE westdiv SET e9 = $1 WHERE id = 9", 
    upd_nc: "UPDATE westdiv SET e6 = $1 WHERE id = 9", 
    upd_coupons: "UPDATE westdiv SET e8 = $1 WHERE id = 9", 
    upd_golds: "UPDATE westdiv SET e5 = $1 WHERE id = 9"
}, 
//Tempest

{ 
    id: "", 
    nom: "Tempest",
    cln_np: 'e9',
    cln_nc: "e6",
    cln_coupons: "e8", 
    cln_golds: "e5",
    get_np: "SELECT e9 FROM westdiv WHERE id = 8", 
    get_nc: "SELECT e6 FROM westdiv WHERE id = 8", 
    get_coupons: "SELECT e8 FROM westdiv WHERE id = 8", 
    get_golds: "SELECT e5 FROM westdiv WHERE id = 8",
    upd_np: "UPDATE westdiv SET e9 = $1 WHERE id = 8", 
    upd_nc: "UPDATE westdiv SET e6 = $1 WHERE id = 8", 
    upd_coupons: "UPDATE westdiv SET e8 = $1 WHERE id = 8", 
    upd_golds: "UPDATE westdiv SET e5 = $1 WHERE id = 8"
},

  //Sept
{ 
    id: "224662340162@s.whatsapp.net", 
    nom: "sept",
    cln_np: 'e9',
    cln_nc: "e6",
    cln_coupons: "e8", 
    cln_golds: "e5",
    get_np: "SELECT e9 FROM westdiv WHERE id = 7", 
    get_nc: "SELECT e6 FROM westdiv WHERE id = 7", 
    get_coupons: "SELECT e8 FROM westdiv WHERE id = 7", 
    get_golds: "SELECT e5 FROM westdiv WHERE id = 7",
    upd_np: "UPDATE westdiv SET e9 = $1 WHERE id = 7", 
    upd_nc: "UPDATE westdiv SET e6 = $1 WHERE id = 7", 
    upd_coupons: "UPDATE westdiv SET e8 = $1 WHERE id = 7", 
    upd_golds: "UPDATE westdiv SET e5 = $1 WHERE id = 7"
},
  //SoloMoe
{ 
    id: "221705825600@s.whatsapp.net", 
    nom: "SoloMoe",
    cln_np: 'e9',
    cln_nc: "e6",
    cln_coupons: "e8", 
    cln_golds: "e5",
    get_np: "SELECT e9 FROM westdiv WHERE id = 6", 
    get_nc: "SELECT e6 FROM westdiv WHERE id = 6", 
    get_coupons: "SELECT e8 FROM westdiv WHERE id = 6", 
    get_golds: "SELECT e5 FROM westdiv WHERE id = 6",
    upd_np: "UPDATE westdiv SET e9 = $1 WHERE id = 6", 
    upd_nc: "UPDATE westdiv SET e6 = $1 WHERE id = 6", 
    upd_coupons: "UPDATE westdiv SET e8 = $1 WHERE id = 6", 
    upd_golds: "UPDATE westdiv SET e5 = $1 WHERE id = 6"
}, 
  //Aether
{ 
    id: "24160264024@s.whatsapp.net", 
    nom: "Aether",
    cln_np: 'e9',
    cln_nc: "e6",
    cln_coupons: "e8", 
    cln_golds: "e5",
    get_np: "SELECT e9 FROM westdiv WHERE id = 4", 
    get_nc: "SELECT e6 FROM westdiv WHERE id = 4", 
    get_coupons: "SELECT e8 FROM westdiv WHERE id = 4", 
    get_golds: "SELECT e5 FROM westdiv WHERE id = 4",
    upd_np: "UPDATE westdiv SET e9 = $1 WHERE id = 4", 
    upd_nc: "UPDATE westdiv SET e6 = $1 WHERE id = 4", 
    upd_coupons: "UPDATE westdiv SET e8 = $1 WHERE id = 4", 
    upd_golds: "UPDATE westdiv SET e5 = $1 WHERE id = 4"
}, 
//Nash

{ 
    id: "237650821851@s.whatsapp.net", 
    nom: "Nash",
    cln_np: 'e9',
    cln_nc: "e6",
    cln_coupons: "e8", 
    cln_golds: "e5",
    get_np: "SELECT e9 FROM westdiv WHERE id = 2", 
    get_nc: "SELECT e6 FROM westdiv WHERE id = 2", 
    get_coupons: "SELECT e8 FROM westdiv WHERE id = 2", 
    get_golds: "SELECT e5 FROM westdiv WHERE id = 2",
    upd_np: "UPDATE westdiv SET e9 = $1 WHERE id = 2", 
    upd_nc: "UPDATE westdiv SET e6 = $1 WHERE id = 2", 
    upd_coupons: "UPDATE westdiv SET e8 = $1 WHERE id = 2", 
    upd_golds: "UPDATE westdiv SET e5 = $1 WHERE id = 2"
}, 
//vanitas

{ 
    id: "221763699741@s.whatsapp.net", 
    nom: "Vanitas",
    cln_np: 'e9',
    cln_nc: "e6",
    cln_coupons: "e8", 
    cln_golds: "e5",
    get_np: "SELECT e9 FROM westdiv WHERE id = 1", 
    get_nc: "SELECT e6 FROM westdiv WHERE id = 1", 
    get_coupons: "SELECT e8 FROM westdiv WHERE id = 1", 
    get_golds: "SELECT e5 FROM westdiv WHERE id = 1",
    upd_np: "UPDATE westdiv SET e9 = $1 WHERE id = 1", 
    upd_nc: "UPDATE westdiv SET e6 = $1 WHERE id = 1", 
    upd_coupons: "UPDATE westdiv SET e8 = $1 WHERE id = 1", 
    upd_golds: "UPDATE westdiv SET e5 = $1 WHERE id = 1"
} 


  { 
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
 }

// East Division

 { 
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
  },
  
];

module.exports = players;*/



const players = [];

function add_id(id, nom, id_bdd, table) {
    const columns = {
        pseudo: "e1",
        division: "e2",
        classe: "e3",
      //  rang: "e4",
        golds: "e5",
        np: "e6",
      //  gift_box: "e7",
        coupons: "e8",
        talent: "e10",
        victoires: "e12",
        defaites: "e13",
        trophees: "e14",
        tos: "e15",
        awards: "e16",
        cards: "e17",
        globes: "e22",
        pos: "e23",
        talent: "e24",
        force: "e25",
        close_combat: "e26",
        precision: "e27",
        speed: "e28"
    };

    const player = {
        id: id,
        nom: nom,
        cln_pseudo: columns.pseudo,
        cln_division: columns.division,
        cln_classe: columns.classe,
    //    cln_rang: columns.rang,
        cln_golds: columns.golds,
        cln_np: columns.np,
      //  cln_gift_box: columns.gift_box,
        cln_coupons: columns.coupons,
        cln_talent: columns.talent,
        cln_victoires: columns.victoires,
        cln_defaites: columns.defaites,
        cln_trophees: columns.trophees,
        cln_tos: columns.tos,
        cln_awards: columns.awards,
        cln_cards: columns.cards,
        cln_globes: columns.globes,
        cln_pos: columns.pos,
        cln_talent: columns.talent,
        cln_force: columns.force,
        cln_close_combat: columns.close_combat,
        cln_precision: columns.precision,
        cln_speed: columns.speed,

        // Requêtes SELECT
        get_pseudo: `SELECT ${columns.pseudo} FROM ${table} WHERE id = ${id_bdd}`,
        get_division: `SELECT ${columns.division} FROM ${table} WHERE id = ${id_bdd}`,
     //   get_classe: `SELECT ${columns.classe} FROM ${table} WHERE id = ${id_bdd}`,
        get_rang: `SELECT ${columns.rang} FROM ${table} WHERE id = ${id_bdd}`,
        get_golds: `SELECT ${columns.golds} FROM ${table} WHERE id = ${id_bdd}`,
        get_np: `SELECT ${columns.np} FROM ${table} WHERE id = ${id_bdd}`,
      //  get_gift_box: `SELECT ${columns.gift_box} FROM ${table} WHERE id = ${id_bdd}`,
        get_coupons: `SELECT ${columns.coupons} FROM ${table} WHERE id = ${id_bdd}`,
        get_talent: `SELECT ${columns.talent} FROM ${table} WHERE id = ${id_bdd}`,
        get_victoires: `SELECT ${columns.victoires} FROM ${table} WHERE id = ${id_bdd}`,
        get_defaites: `SELECT ${columns.defaites} FROM ${table} WHERE id = ${id_bdd}`,
        get_trophees: `SELECT ${columns.trophees} FROM ${table} WHERE id = ${id_bdd}`,
        get_tos: `SELECT ${columns.tos} FROM ${table} WHERE id = ${id_bdd}`,
        get_awards: `SELECT ${columns.awards} FROM ${table} WHERE id = ${id_bdd}`,
        get_cards: `SELECT ${columns.cards} FROM ${table} WHERE id = ${id_bdd}`,
        get_globes: `SELECT ${columns.globes} FROM ${table} WHERE id = ${id_bdd}`,
        get_pos: `SELECT ${columns.pos} FROM ${table} WHERE id = ${id_bdd}`,
        get_talent: `SELECT ${columns.talent} FROM ${table} WHERE id = ${id_bdd}`,
        get_force: `SELECT ${columns.force} FROM ${table} WHERE id = ${id_bdd}`,
        get_close_combat: `SELECT ${columns.close_combat} FROM ${table} WHERE id = ${id_bdd}`,
        get_precision: `SELECT ${columns.precision} FROM ${table} WHERE id = ${id_bdd}`,
        get_speed: `SELECT ${columns.speed} FROM ${table} WHERE id = ${id_bdd}`,

        // Requêtes UPDATE
        upd_pseudo: `UPDATE ${table} SET ${columns.pseudo} = $1 WHERE id = ${id_bdd}`,
        upd_division: `UPDATE ${table} SET ${columns.division} = $1 WHERE id = ${id_bdd}`,
        upd_classe: `UPDATE ${table} SET ${columns.classe} = $1 WHERE id = ${id_bdd}`,
        //upd_rang: `UPDATE ${table} SET ${columns.rang} = $1 WHERE id = ${id_bdd}`,
        upd_golds: `UPDATE ${table} SET ${columns.golds} = $1 WHERE id = ${id_bdd}`,
        upd_np: `UPDATE ${table} SET ${columns.np} = $1 WHERE id = ${id_bdd}`,
    //    upd_gift_box: `UPDATE ${table} SET ${columns.gift_box} = $1 WHERE id = ${id_bdd}`,
        upd_coupons: `UPDATE ${table} SET ${columns.coupons} = $1 WHERE id = ${id_bdd}`,
        upd_talent: `UPDATE ${table} SET ${columns.talent} = $1 WHERE id = ${id_bdd}`,
        upd_victoires: `UPDATE ${table} SET ${columns.victoires} = $1 WHERE id = ${id_bdd}`,
        upd_defaites: `UPDATE ${table} SET ${columns.defaites} = $1 WHERE id = ${id_bdd}`,
        upd_trophees: `UPDATE ${table} SET ${columns.trophees} = $1 WHERE id = ${id_bdd}`,
        upd_tos: `UPDATE ${table} SET ${columns.tos} = $1 WHERE id = ${id_bdd}`,
        upd_awards: `UPDATE ${table} SET ${columns.awards} = $1 WHERE id = ${id_bdd}`,
        upd_cards: `UPDATE ${table} SET ${columns.cards} = $1 WHERE id = ${id_bdd}`,
        upd_globes: `UPDATE ${table} SET ${columns.globes} = $1 WHERE id = ${id_bdd}`,
        upd_pos: `UPDATE ${table} SET ${columns.pos} = $1 WHERE id = ${id_bdd}`,
        upd_talent: `UPDATE ${table} SET ${columns.talent} = $1 WHERE id = ${id_bdd}`,
        upd_force: `UPDATE ${table} SET ${columns.force} = $1 WHERE id = ${id_bdd}`,
        upd_close_combat: `UPDATE ${table} SET ${columns.close_combat} = $1 WHERE id = ${id_bdd}`,
        upd_precision: `UPDATE ${table} SET ${columns.precision} = $1 WHERE id = ${id_bdd}`,
        upd_speed: `UPDATE ${table} SET ${columns.speed} = $1 WHERE id = ${id_bdd}`
    };

    players.push(player);
}

//central
//Abdiel
add_id('2250718294357@s.whatsapp.net', 'Dabi', '2', 'centraldiv');
add_id('22898265869@s.whatsapp.net', 'Yuan', '3', 'centraldiv');
add_id('237656431187@s.whatsapp.net', 'Irito', '4', 'centraldiv');
add_id('237682831551@s.whatsapp.net', 'Hakuji', '5', 'centraldiv');
//6
//add_id('', 'Hazlay', '7', 'centraldiv');
//add_id('','Makima', '8', 'centraldiv');
//9
add_id('242064379833@s.whatsapp.net', 'Rudeus', '10', 'centraldiv');
//fin central

//east
/*add_id();
add_id();
add_id();
add_id();
add_id();
add_id();
add_id();
add_id();
add_id();
add_id();*/
//fin east

//north
add_id("22651463203@s.whatsapp.net", "Ainz", 8, "northdiv");
add_id("221774255562@s.whatsapp.net", "Aizen", 11, "northdiv");
/*add_id();
add_id();
add_id();
add_id();
add_id();
add_id();
add_id();
add_id();
add_id();
add_id();
add_id();*/
//fin north

//west
/*add_id();
add_id();
add_id();
add_id();
add_id();
add_id();
add_id();
add_id();
add_id();
add_id();
add_id();
add_id();
add_id();
add_id();
add_id();*/
//fin west

module.exports = players;
