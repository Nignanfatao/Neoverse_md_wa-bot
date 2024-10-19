const { zokou } = require('../framework/zokou');
const ainz = require('../Id_ext/northdiv');
const s = require("../set");
const dbUrl = s.DB;

zokou(
  {
    nomCom: 'id',
    reaction: '🔷',
    categorie: 'Other'
  },
  async (origineMessage, zk, commandeOptions) => {
    const { ms, auteurMessage, repondre } = commandeOptions;

    // Recherche si l'auteur du message correspond à un ID dans le tableau ainz
    const user = ainz.find(item => item.id === auteurMessage);
    let client;
    if (user) {
      try {
        const proConfig = {
          connectionString: dbUrl,
          ssl: {
            rejectUnauthorized: false,
          },
        };

        const { Pool } = require('pg');
        const pool = new Pool(proConfig);
        client = await pool.connect();
        
        // Exécuter la requête pour récupérer la valeur souhaitée
        const query = user.get_np;
        const result = await client.query(query);
        
        // Extraire la valeur correspondant à la colonne (cln) du user
        let valeur_np = result.rows[0][user.cln_np];

        // Si l'ID correspond, envoie un message avec le nom et la valeur de np
        let msg = `Salut ${user.nom}, voici votre nombre de np: ${valeur_np}`;
        repondre(msg);

      } catch (error) {
        console.error("Erreur lors de l'accès à la base de données :", error);
        repondre("Une erreur est survenue.");
      } finally {
        if (client) {
          client.release(); // Assurez-vous de toujours libérer la connexion
        }
      }
    } else {
      // Si l'ID ne correspond pas, envoie un message d'erreur
      repondre("ID non trouvé.");
    }
  }
);
