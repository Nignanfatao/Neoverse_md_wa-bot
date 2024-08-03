const { zokou } = require('../framework/zokou');

zokou(
    {
        nomCom: 'menuneo',
        categorie: 'NEOverse'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0)  {
            const lien = 'https://telegra.ph/file/201aa2dc22b1fb47ba885.jpg';
            const msg = '';
            zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
        }
    }
);

zokou(
    {
        nomCom: 'seasonpass',
        categorie: 'NEOverse'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0)  {
            const lien = 'https://telegra.ph/file/b2ec0bd5bdda41e5e59ac.jpg';
            const msg = '';
            zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
        }
    }
);

    zokou(
    {
        nomCom: 'recompenses',
        categorie: 'NEOverse'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0)  {
            const lien = 'https://telegra.ph/file/dc6eac838589d174cad0e.jpg';
            const msg = '';
            zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
        }
    }
);

zokou(
    {
        nomCom: 'tournois',   
        categorie: 'NEOverse'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0) {
            const lien = 'https://telegra.ph/file/48b4a8a540d5086d912ba.jpg';
            const msg = ``;
            zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
   
        }
    }
);

zokou(
    {
        nomCom: 'neorpgoldenawards',   
        categorie: 'NEOverse'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0) {
            const lien = 'https://telegra.ph/file/d2eba04f75778d8066179.jpg';
            const msg = ``;
            zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
   
        }
    }
);

zokou(
    {
        nomCom: 'saison',
        categorie: 'NEOverse'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (arg[0] === 'UF🥅')  {
            const lien = 'https://telegra.ph/file/2c25e13956f7d292b8a0f.jpg';
            const msg = `*𝗕𝗶𝗲𝗻𝘃𝗲𝗻𝘂𝗲 𝗱𝗮𝗻𝘀 𝗹𝗮 𝘀𝗮𝗶𝘀𝗼𝗻 𝗨𝗙🥅*
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
Lors de la saison UF, les équipes sont séparées en deux ligues...la Divisions Stars et la division Novices, nous viserons 3 ligues si y'a plus de joueurs. Les 6 premiers de la division ONE vont se qualifier pour la ligue des champions et les 2 premiers de la Division SECOND aussi. 

*𝗥𝗲𝗰𝗼𝗺𝗽𝗲𝗻𝘀𝗲𝘀 𝗠𝗔𝗧𝗖𝗛𝗦🥅*
⚽Pour 5 matchs:  5.000.000 €
⚽Pour 5 victoires: 25.000.000 € + 10 UFC🪙
⚽Pour 10 matchs: 10.000.000 € + 5 UFC🪙
⚽Pour 10 victoires: 50.000.000 € + 50 UFC🪙

*𝗥𝗲𝗰𝗼𝗺𝗽𝗲𝗻𝘀𝗲𝘀 𝗳𝗶𝗻 𝗱𝗲 𝗦𝗮𝗶𝘀𝗼𝗻🥅🎁*
🎖️Top 1: +100M € + 70 UFC🪙+100🔷+50🎟️
🥈 Top 3: 50M € + 30 UFC🪙+50🔷+20🎟️
🥉 Top 6: 20M € + 10 UFC🪙+20🔷+10🎟️
🏆UEFA: 100M € + 90 UFC🪙+100🔷+50🎟️

*⚠️Récompenses avec minimum 5 matchs*
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
                                     *UF🥅🔝*`;
            zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
   
        } else if (arg[0] === 'NBA🏀'); {
            const lien = 'https://telegra.ph/file/c70106c58248322fac390.jpg';
            const msg = `*𝗕𝗶𝗲𝗻𝘃𝗲𝗻𝘂𝗲 𝗱𝗮𝗻𝘀 𝗹𝗮 𝘀𝗮𝗶𝘀𝗼𝗻 NBA🏀*
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
Lors de la saison NBA, les équipes sont séparées en deux Conférences...la conférence WEST🔴 et la conférence EAST🔵 . Les 8 premiers de chaques conferences joueront les PLAYOFFS mais dans un debut nous allons faire un championnat combiné 🔴WEST/EAST🔵 et les 8 premiers seront aux playoffs les. 

🏀Pour 5 matchs:  5.000.000 $
🏀Pour 5 victoires: 25.000.000 $ + 10 NBC⭕
🏀Pour 10 matchs: 10.000.000 $ + 5 NBC⭕
🏀Pour 10 victoires: 50.000.000 $ + 50 NBC⭕

*𝗥𝗲𝗰𝗼𝗺𝗽𝗲𝗻𝘀𝗲𝘀 𝗱𝗲 𝗦𝗮𝗶𝘀𝗼𝗻🏀🎁*
🎖️Top 1: +100M$ + 70 NBC⭕+100🔷+50🎟️
🥈 Top 3: 50M$ + 30 NBC⭕+50🔷+20🎟️
🥉 Top 6: 20M$ + 10 NBC⭕
🏆Finals: 100M$ + 90 NBC⭕+100🔷+50🎟️

*⚠️Récompenses avec minimum 5 matchs*
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
                                     *NBA2K🏀NE⭕*`;
            zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
   
 /*  } else (arg[0] === 'Elysium💠')  {
            const lien = 'https://telegra.ph/file/bdd957fe4f3c12dfdeb66.jpg';
            const msg = `*💠Elysium Season PASS💠*
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
L'épisode D'elysium aura lieu de 19h à 22h GMT+1, les participants devront s'enregistrer à l'avance dans la journée pour participer. L'enregistrement coûte 2 NC🔷 et c'est uniquement pour les joueurs classés(ALL STARS, NBA et UF). la journée dure généralement 20 tours, les nouveaux joueurs pourront rejoindre seulement à partir de 5 tours passés avec pause de 5mins en cas de retard. 

*💠RÈGLEMENT DES LIEUX*
Les joueurs ne peuvent pas être partout à la Fois, afin d'éviter la divulgation d'informations d'activités. *⚠️donc une fois que vous voyagez vous devez quitter le groupe où vous êtes vers le nouveau Lieu que vous Pouvez Facilement Rejoindre à Travers la Communauté .* ‼️Si vous vous faites retirer de force alors 5🔷 pour revenir. 

*💠MISSIONS ET FREE PLAY*
Le but de Élysium est d'abord le free play donc Explorer un monde Gigantesque et trouver les ressources. Mais néanmoins vous pouvez aller rencontrer des PNJ qui vous proposeront des missions et quêtes *💠Lancer la mission XP* et un PNJ ne peut avoir que 2 à 3 quêtes disponibles avant de renouveler.

🥉 *Normale*: +100.000💠+10🌟 
🥈 *Difficile*: +300.000💠 +20🌟
🥇 *Extreme*: +500.000💠+30🌟

💠Vous gagnez des PC selon l'activité que vous faites +5 PC et vous gagnez des SP🌟 par rapport à vos achats et votre style de vie, après 3 tours vous perdez -20%😃 moral à moins de 20%😟 vous devenez imprécis et incapable de réussir vos actions, vous attirez même la malchance. 

⚠️Si vous êtes mort où arrêté c'est GAME OVER❌et vous perdez -10🌟 journée est terminée, vous allez seulement pouvoir revenir le prochain épisode. 
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔                                 *💠Processing...*`;
            zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
   */
        }
    });


zokou(
    {
        nomCom: 'records',
        categorie: 'NEOverse'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0)  {
            const lien = 'https://telegra.ph/file/2a2abe4cba6749fb70877.jpg';
            const msg = `. 
           ══════༺༻═══
            ⚜️\`\`\` 𝐋𝐈𝐕𝐑𝐄𝐒 𝐃'𝐇𝐈𝐒𝐓𝐎𝐈𝐑𝐄 \`\`\`⚜️
           ═════ ༺༻═══
Voici les pantheons du Nouveau monde, le livre des performances mémorables et légendaires  du nouveau monde ! ceux qui ont écrit leurs noms parmi les Astres et les plus grands à tout jamais dans le nouveau monde. 

*🔸+Champions 🏆*
*🔸+MNVP🌟*
*🔸+TOS⭐* 
*🔸+Awards 💫*
 ══════༺༻═══
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
                                  *🔶𝗡Ξ𝗢💫*

.`;
            zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
   
        }
    }
);

zokou(
    {
        nomCom: 'champions🏆',
        categorie: 'NEOverse'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0)  {
            const lien = 'https://telegra.ph/file/856864a64984161a8f1a8.jpg';
            const msg = `══════༺༻═══
                         🏆\`\`\`𝐂𝐇𝐀𝐌𝐏𝐈𝐎𝐍𝐒\`\`\`🏆
                 ══════༺༻═══
                  
Voici le panthéon des Champions du Nouveau monde✨🏆ceux qui ont un déjà rempoter un tournoi à NEOverse ! NEO TOUR EVO💠, GRAND SLAM🏆et SUPER CHAMPIONS CUP🏆(SCC) . 
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
🔸🔴NEO KÏNGS⚜️🇨🇬:       🏆 
🔸🔵ABA L. KÏNGS⚜️🇸🇳:   🏆
🔸🔴Lily KÏNGS⚜️🇨🇬:         🏆🏆🏆
🔸🔴Damian KÏNGS⚜️🇨🇬 : 🏆🏆🏆
🔸🔵Vanitas KÏNGS⚜️🇸🇳:  🏆
🔸🟢Adam GENESIS🇨🇮:  🏆



░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
De nouveaux Guerriers viendront chercher le titre de "CHAMPION" afin graver leurs noms à tout jamais parmi les immortels dans la légende du nouveau monde RP. Are you the NEXT KING? 👑
                    ══════༺༻═══                  
                                🔶𝗡Ξ𝗢💫`;
            zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
   
        }
    }
);

zokou(
    {
        nomCom: 'mnvp⭐',
        categorie: 'NEOverse'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0)  {
            const lien = 'https://telegra.ph/file/8370fd4da3413d1e629f8.jpg';
            const msg = `. 
                   ══════༺༻═══
      💫 \`\`\`𝐌𝐎𝐒𝐓 𝐍𝐄𝐎 𝐕𝐀𝐋𝐔𝐀𝐁𝐋𝐄 𝐏𝐋𝐀𝐘𝐄𝐑\`\`\` 💫
                      ═════ ༺༻═══

Livre  prestigieux de ceux qui ont inscrit leurs noms dans l'histoire en finissant *MNVP de leurs classes🎖️* , les meilleurs joueurs de la saison régulière par classe les TOP1🏆. 
🥇 *Niveau LEGENDS*: ⭐⭐⭐(Extreme) 
🥈 *Niveau ÉLITES*: ⭐⭐(Moyen) 
🥉 *Niveau NOVICES*:⭐(Facile) 

░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
🥇Damian KÏNGS⚜️🇨🇬: 🎖️🎖️🎖️🎖️🎖️🎖️ 
🥇Lily KÏNGS⚜️🇨🇬:         🎖️🎖️🎖️🎖️
🥈Vanitas G KÏNGS⚜️🇸🇳:  🎖️
🥈Adam GENESIS🇨🇮:  🎖️
🥈Grimm TEMPEST🇨🇲:  🎖️
🥈Vyrozz🇹🇬:  🎖️
🥈Zephyr🇨🇮: 🎖️
🥉Kemael🇨🇮:  🎖️
🥉White KÏNGS⚜️🇨🇮:  🎖️
🥉Hazlay🇸🇳: 🎖️
        

                                🔶𝗡Ξ𝗢🌟
                     ══════༺༻═══`;
            zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
   
        }
    }
);

zokou(
    {
        nomCom: 'tos⭐',
        categorie: 'NEOverse'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0)  {
            const lien = 'https://telegra.ph/file/bd61428816cc5e36abcad.jpg';
            const msg = `. 
                  ══════༺༻═══
                        🌟𝗧𝗢𝗦: 𝐀𝐋𝐋 𝐒𝐓𝐀𝐑𝐒🌟
                   ═════ ༺༻═══
Voici la catégorie des SUPERSTARS du nouveau monde, ceux qui ont déjà été dans la  *TOS* TEAM OF THE SEASON⭐,la team prestige 🎖️,equivalent aux TOTY⭐. 
*⚠️Notez que vous pouvez prendre votre retraite de NEOverse avec les Honneurs donc une décoration ! Mais si vous quittez en fantôme où entacher votre image vis à vis de la ligue vous perdez votre nom dans le Panthéon d'honneur.* 
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*⭐Damian  KÏNGS⚜️🇨🇬*:    7⭐
*⭐Lily KÏNGS⚜️🇨🇬*:             6⭐
*⭐White KÏNGS⚜️🇨🇮*:         3⭐ 
*⭐Vanitas Gold KÏNGS⚜️🇸🇳*: 2⭐
*⭐Aether GENESIS🇬🇦*:         2⭐ 
*⭐Adam GENESIS🇨🇮*:         2⭐ 
*⭐Goldy Shogun🇹🇬*:            2⭐ 
*⭐Atsushi KÏNGS⚜️🇨🇲*:     2⭐
*⭐Kemael🇨🇮*:                        2⭐
*⭐Zephyr🇨🇮*:                          2⭐ 
*⭐Hajime NEXUS🇨🇲*:           1⭐
*⭐Grimm Tempest🇨🇲*:        1⭐ 
*⭐SoloMoe A. KÏNGS⚜️🇸🇳*: 1⭐
*⭐Thanatos Gold KÏNGS⚜️🇧🇫*:  1⭐ 
*⭐The LOA KÏNGS⚜️🇹🇬*:    1⭐
*⭐Adorieru KAMADO🇷🇴*:    1⭐
*⭐Kanzen Gold KING🇨🇮*:    1⭐
*⭐Serena Gold WHITE🇨🇮*:  1⭐

░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
                                   🔶𝗡Ξ𝗢☀️`;
            zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
   
        }
    }
);

/*zokou(
    {
        nomCom: 'awards💫',
        categorie: 'NEOverse'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0)  {
            const lien = 'https://telegra.ph/file/7d380c5771ac6388f5879.jpg';
            const msg = `. 
                   ══════༺༻═══
                      💫 ''' 𝐆𝐎𝐋𝐃𝐄𝐍 𝐀𝐖𝐀𝐑𝐃𝐒 ''' 💫
                      ═════ ༺༻═══
Voici les gagnants des prestigieux prix Awards et Récompenses aux GOLDEN AWARDS du Nouveau monde RP💫.Venez écrire votre nom dans le panthéon ultime du nouveau monde. 
*⚠️Notez que vous pouvez prendre votre retraite de NEOverse avec les Honneurs donc une décoration ! Mais si vous quittez en fantôme où entacher votre image vis à vis de la ligue vous perdez votre nom dans le Panthéon d'honneur.* 
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
💫 *The BEST🏆*
🔸Lily KÏNGS⚜️🇨🇬:                  2🏆
🔸Damian KÏNGS⚜️🇨🇬:          3🏆

▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
💫 *The SIGMA🗿*
🔸Lily KÏNGS⚜️🇨🇬:                  1🗿
🔸Damian KÏNGS⚜️🇨🇬:          1🗿

▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

💫 *NEO TROPHY🎗️*
🔸Lily KÏNGS⚜️🇨🇬:                   3🎗️
🔸Damian KÏNGS⚜️🇨🇬:           2🎗️ 
🔸White KÏNGS⚜️🇨🇮:              1🎗️ 
🔸Lord  KÏNGS⚜️🇹🇬:               1🎗️ 



        

                 🔶𝗡Ξ𝗢💫GOLDEN AWARDS
                     ══════༺༻═══`;
            zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
   
        }
    }
);
*/
zokou(
    {
        nomCom: 'calendar',
        categorie: 'NEOverse'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0)  {
            const lien = 'https://telegra.ph/file/d565291e5dd411e2bec15.jpg';
            const msg = ``;
            zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
   
        }
    }
);

zokou(
    {
        nomCom: 'rankings',
        categorie: 'NEOverse'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0)  {
            const lien = 'https://telegra.ph/file/513f3e586c6c78da11fff.jpg';
            const msg = ``;
            zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
   
        }
    }
);


zokou(
    {
        nomCom: 'gamepass',
        categorie: 'NEOverse'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0)  {
            const lien = 'https://telegra.ph/file/04aa2cc80308f7ea976ca.jpg';
            const msg = ``;
            zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
   
        }
    }
);

zokou(
    {
        nomCom: 'guides',
        categorie: 'NEOverse'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0)  {
            const liena = 'https://telegra.ph/file/21afcaa63ab4ef27d4aaa.jpg';
            const lienb = 'https://telegra.ph/file/7125a5c72b63f22b35bdd.jpg';
            const lienc = 'https://telegra.ph/file/0207f9309e3d708b2d0d7.jpg';
            const msg = ``;
            zk.sendMessage(dest, { image: { url: liena }, caption: msg }, { quoted: ms });
            zk.sendMessage(dest, { image: { url: lienb }, caption: msg }, { quoted: ms });
            zk.sendMessage(dest, { image: { url: lienc }, caption: msg }, { quoted: ms });
   
        }
    }
);

zokou(
    {
        nomCom: 'allstars',
        categorie: 'NEOverse'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0)  {
            const lien = 'https://telegra.ph/file/ff6043eb05b582bac93fb.jpg';
            const msg = ``;
            zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
   
        }
    }
);


zokou(
    {
        nomCom: 'trade',
        categorie: 'NEOverse'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0)  {
            const lien = 'https://telegra.ph/file/b079839567a940a4fa7d1.jpg';
            const msg = ``;
            zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
   
        }
    }
);

/*zokou(
    {
        nomCom: 'extra',
        categorie: 'NEOverse'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (arg[0] === 'draft🔷')  {
            const lien = 'https://telegra.ph/file/bfd52371074158ab34a18.jpg';
            const msg = `🔷Afin de rendre la Draft plus équitable les Divisions ayant moins de joueurs actifs ont la priorité sur la Draft. Donc doivent impérativement Drafter et les Divisions ayant le plus de joueurs actifs allons de 4 à 5 sur une saison avec plus de 3/5 combats peuvent passer le tour où sont moins prioritaires afin que toutes les divisions aient au moins 4 joueurs actifs sûrs et au fur et à mesure des nouvelles drafts les joueurs vont se fideliser. Une division qui passe un tour est prioritaire sur la Draft du prochain tour. 

🔷Maintenant les Divisions peuvent décider de Drafter où non ! Ne pas Drafter permets aussi d'économiser de l'argent et de la place, car le quota pour une division est de 10 joueurs actifs par Divisions avant d'augmenter après avoir équilibrer entre les divisions.
*⚠️Si un joueur est viré(ce qui permettra à la Division de récupérer la moitié de la somme dépensée)d'une division pour inactivité non justifiée si il veut revenir il doit recommencer à zéro donc en Rookie et après avoir refait ses preuves une nouvelle division peut le drafter où alors il retourne dans sa division d'origine*

*🔷𝗧𝗿𝗮𝗱𝗲*(TRANSFERT🫱🏽‍🫲🏻) 
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
Les divisions peuvent faire des transferts de joueurs en fin de saison. Cela se fait par Échange entre deux joueurs pour 50% des frais où un transfert pour 100% de frais. La somme sera déversée à la Division qui vends le joueur.
*Joueur TOS🌟*: 1.000.000🧭 + 300.000🧭 ind
*Joueur TOP 6🏆*: 500.000🧭 + 100.000🧭 ind
*Joueur en dessous*: 100.000🧭
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
                                      *🔷NSL🏆🔝*`;
            zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
   
        }
    }
);*/

zokou(
    {
        nomCom: 'events',
        categorie: 'NEOverse'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0)  {
            const lien = 'https://telegra.ph/file/532190fb0d8410903a80d.jpg';
            const msg = ``;
            zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
   
        }
    }
);


zokou(
    {
        nomCom: 'duel',
        categorie: 'NEOverse'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0)  {
           // const lien = '';
            const msg = `*🆚𝗩𝗘𝗥𝗦𝗨𝗦 𝗔𝗥𝗘𝗡𝗔 𝗕𝗔𝗧𝗧𝗟𝗘🏆🎮*       
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
🔷   *Joueur 1*:
 🫀:100%  🌀:100% ❤️:100%            
                                   ~  *🆚*  ~
🔷  *Joueur 2*:  🫀:100%  🌀:100% ❤️:100%:.                            
 ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
 *🌍𝐀𝐫𝐞̀𝐧𝐞*: 
 *🚫𝐇𝐚𝐧𝐝𝐢𝐜𝐚𝐩𝐞*: Boost 1 fois chaques 2 tours! 
 *⚖️𝐒𝐭𝐚𝐭𝐬*: equal
 *🏞️ 𝐀𝐢𝐫 𝐝𝐞 𝐜𝐨𝐦𝐛𝐚𝐭*: 50m max
 *🦶🏼𝐃𝐢𝐬𝐭𝐚𝐧𝐜𝐞 𝐢𝐧𝐢𝐭𝐢𝐚𝐥𝐞*📌: 5m
 *⌚𝐋𝐚𝐭𝐞𝐧𝐜𝐞*: 6mins+ 1⚠️
 *⭕𝐏𝐨𝐫𝐭𝐞́𝐞*:  10m
 *🌍𝐄𝐧𝐯𝐢𝐫𝐨𝐧𝐧𝐞𝐦𝐞𝐧𝐭*: 
 ░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
🆚 *CONDITIONS DE VICTOIRES*:
▪Easy,Negs diff✅: 2️⃣-0️⃣, +70%🫀,100%❤️
▪ Mid Diff✅: 1️⃣-0️⃣, 50%🫀, - 100%❤️
▪High Extreme Diff✅: 2️⃣-1️⃣, - 60%❤️
✅ *Bon pavé*: immersion, dialogue, jeu de rôle 
*⚠️Les Boost et déplacements offensifs  ne sont pas pris en compte, seulement les esquives et les déplacements défensifs*

▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
  *⚠️Vous avez 8️⃣ tours max pour finir votre Adversaire! Sinon la victoire sera donnée par décision selon celui qui a dominer le combat où qui a été le plus à l'offensive !*`;
    // zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
   repondre(msg);
        }
    }
);


zokou(
    {
        nomCom: 'pave',
        categorie: 'NEOverse'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0)  {
           // const lien = '';
            const msg = ` .                     *🔷𝗧𝗘𝗫𝗧𝖦𝖠𝖬𝖨𝖭𝖦🎮*
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
                         *🌍Distance*: 5m
          
💬🎧𝗖𝗵𝗮𝘁:
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
> 1️⃣:
> 2️⃣:

░░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
                           *🔷𝗡Ξ𝗢🔝*`;
           // zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
   repondre(msg);
        }
    }
);

/*zokou(
    {
        nomCom: 'menuoptions',
        categorie: 'NEOverse'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0)  {
           const msg = `+menuNeo🔷
+Rankings🔷
+calendar🔷
+trade🔷
+Recompenses🎁
+SeasonPass🔷
+tournois🏆
+Events🎊
+Records🔷
+champions🏆
+MNVP⭐
+saison UF🥅
+saison NBA🏀
+Tos⭐
+Duel
+Pave`;
            repondre(msg);
        }
    }
);

zokou(
    {
        nomCom: '',
        categorie: 'NEOverse'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0)  {
            const lien = '';
            const msg = ``;
            zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
   
        }
    }
);*/

