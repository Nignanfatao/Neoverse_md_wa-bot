const users = [];

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

    users.push(player);
}

//central
//Abdiel
add_id('2250718294357@s.whatsapp.net', 'Dabi', '2', 'centraldiv');
add_id('22898265869@s.whatsapp.net', 'Yuan', '3', 'centraldiv');
add_id('237656431187@s.whatsapp.net', 'Irito', '4', 'centraldiv');
add_id('237682831551@s.whatsapp.net', 'Hakuji', '5', 'centraldiv');
//6
//add_id('', 'Hazlay', '7', 'centraldiv');
add_id('237686864370@s.whatsapp.net','Makima', '8', 'centraldiv');
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

add_id("242069983150@s.whatsapp.net", "Damian", 1,"northdiv");
//add_id("", "Lily", 2, "northdiv");
//add_id("", "Thanatos", 4, "northdiv");
add_id("242066790143@s.whatsapp.net", 'Kazuta', 5, "northdiv");
//add_id("", "", 6, "northdiv");
//add_id("", "kanzen", 7, "northdiv");
add_id("22651463203@s.whatsapp.net", "Ainz", 8, "northdiv");
//add_id("", "", 9, "northdiv");
add_id("221774255562@s.whatsapp.net", "Aizen", 11, "northdiv");
//add_id();
add_id("22663685468@s.whatsapp.net", "Eoza", 13, "northdiv");
//fin north


//west
add_id("237678054208@s.whatsapp.net", "Hajime", 10,"westdiv");
add_id("237650821851@s.whatsapp.net", 'Nash', 2, "westhdiv");
add_id("224662340162@s.whatsapp.net", "Sept", 7, "westhdiv");
add_id("24160264024@s.whatsapp.net", "Aether", 4, "westhdiv");
//fin west

module.exports = users;
