/*
const { zokou } = require("../framework/zokou");
const { saveUser, getUserData, updatePlayers, updateStats, resetStats } = require("../bdd/lineup_db");

zokou(
  {
    nomCom: "lineup",
    categorie: "Gestion",
  },
  async (dest, zk, commandeOptions) => {
    const { repondre, arg, auteurMessage } = commandeOptions;
    const userId = (arg[0]?.includes("@") && `${arg[0].replace("@", "")}@s.whatsapp.net`) || auteurMessage;
    const data = await getUserData(userId);
    if (!data) return repondre("⚠️ Joueur introuvable.");

    if (arg.length <= 1) {
      const lineup = `🥅⚽LINEUP: ${data.nom}
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
1 👤${data.joueur1} : ${data.stat1}%🫀
2 👤${data.joueur2} : ${data.stat2}%🫀
3 👤${data.joueur3} : ${data.stat3}%🫀
4 👤${data.joueur4} : ${data.stat4}%🫀
5 👤${data.joueur5} : ${data.stat5}%🫀
6 👤${data.joueur6} : ${data.stat6}%🫀
7 👤${data.joueur7} : ${data.stat7}%🫀
8 👤${data.joueur8} : ${data.stat8}%🫀
9 👤${data.joueur9} : ${data.stat9}%🫀
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*REMPLAÇANTS🥅*:
10 👤${data.joueur10}
11 👤${data.joueur11}
12 👤${data.joueur12}
13 👤${data.joueur13}
14 👤${data.joueur14}
15 👤${data.joueur15}

⚽🔷*BLUE LOCK NEO🥅*▱▱▱`;
      return repondre(lineup);
    }
    
    // Analyse des arguments pour mise à jour
    let updates = {};
    for (let i = 0; i < arg.length; i += 3) {
      if (/^j\d+$/.test(arg[i]) && arg[i + 1] === "=") {
        const playerIndex = arg[i].slice(1); // Extrait le numéro du joueur
        if (playerIndex >= 1 && playerIndex <= 15) {
          updates[`joueur${playerIndex}`] = arg[i + 2];
        }
      }
    }
    
    if (Object.keys(updates).length > 0) {
      const message = await updatePlayers(userId, updates);
      return repondre(message);
    } else {
      return repondre("⚠️ Format incorrect. Utilise: +lineup j1 = Nom j2 = Nom...");
    }
  }
);

// 📌 Commande SAVE
zokou(
  {
    nomCom: "save",
    categorie: "Gestion",
  },
  async (dest, zk, commandeOptions) => {
    const { repondre, arg } = commandeOptions;
    const mention = (arg[0]?.includes("@") && `${arg[0].replace("@", "")}@s.whatsapp.net`);
    if (!mention || arg.length < 2) {
      return repondre("⚠️ Mentionne un utilisateur et ajoute son nom.");
    }
    const userId = mention;
    const nomJoueur = arg.slice(1).join(" ");
    const message = await saveUser(userId, nomJoueur);
    repondre(message);
  }
);

// 📌 Fonction principale pour traiter les commandes
async function stats_lineup(tex, repondre) {
  const texte = tex.trim().toLowerCase().split(/\s+/);

  if (texte.length === 4 && texte[0].startsWith("@")) {
    const userId = `${texte[0].replace("@", "")}@s.whatsapp.net`;
    const joueurKey = `stat${texte[1].replace("j", "")}`; // Convertit "j1" en "stat1"
    
    const signe = texte[2]; // Récupère le signe
    const valeur = parseInt(texte[3], 10);
    
    if (isNaN(valeur) || (signe !== "+" && signe !== "-")) {
      return repondre("⚠️ Valeur incorrecte. Exemple: `@user j1 + 30` ou `@user j1 - 30`");
    }

    const updateMessage = await updateStats(userId, joueurKey, signe, valeur);

    return repondre(updateMessage);
  }  

  // 📌 Gestion de la commande reset_stats
  else if (texte.length === 2 && texte[1] === "reset_stats" && texte[0].startsWith("@")) {
    const userId = texte[0].replace("@", "") + "@s.whatsapp.net";
    const resetMessage = await resetStats(userId);
    return repondre(resetMessage);
  } 

  else {
    return repondre("⚠️ Format incorrect. Utilise : `@user j1 + 30`, `@user j1 - 30` ou `@user reset_stats`");
  }
}

module.exports = stats_lineup;
*/
