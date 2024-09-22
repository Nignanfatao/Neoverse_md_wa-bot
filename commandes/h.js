zokou(
    {
        nomCom: 'duel',
        categorie: 'Other'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;
        
        try {
            const input = arg.join(' ');
            const [joueursInput, statsCustom] = input.split('/').map(part => part.trim());
            const [joueursAvantVs, joueursApresVs] = joueursInput.split('vs').map(part => part.trim());
            const equipe1 = joueursAvantVs.split(',').map(joueur => ({ nom: joueur.trim(), stats: { sta: 100, energie: 100, vie: 100 } }));
            const equipe2 = joueursApresVs.split(',').map(joueur => ({ nom: joueur.trim(), stats: { sta: 100, energie: 100, vie: 100 } }));
            const areneT = tirerAr();
            const duelID = genererID();
            repondre(`🔑 Votre clé d'accès au duel est : *${duelID}*`);

            let ficheDuel = `*🆚𝗩𝗘𝗥𝗦𝗨𝗦 𝗔𝗥𝗘𝗡𝗔 𝗕𝗔𝗧𝗧𝗟𝗘🏆🎮*
░░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n`;

            equipe1.forEach(joueur => {
                ficheDuel += `🔷 *${joueur.nom}*: 🫀:${joueur.stats.sta}% 🌀:${joueur.stats.energie}% ❤️:${joueur.stats.vie}%\n`;
            });

            ficheDuel += `                                   ~  *🆚*  ~\n`;

            equipe2.forEach(joueur => {
                ficheDuel += `🔷 *${joueur.nom}*: 🫀:${joueur.stats.sta}% 🌀:${joueur.stats.energie}% ❤️:${joueur.stats.vie}%\n`;
            });

            ficheDuel += `▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n
*🌍𝐀𝐫𝐞̀𝐧𝐞*: ${areneT.nom}
*🚫𝐇𝐚𝐧𝐝𝐢𝐜𝐚𝐩𝐞*: Boost 1 fois chaque 2 tours!
*⚖️𝐒𝐭𝐚𝐭𝐬*: ${statsCustom}
*🏞️ 𝐀𝐢𝐫 𝐝𝐞 𝐜𝐨𝐦𝐛𝐚𝐭*: illimitée
*🦶🏼𝐃𝐢𝐬𝐭𝐚𝐧𝐜𝐞 𝐢𝐧𝐢𝐭𝐢𝐚𝐥𝐞*📌: 5m
*⌚𝐋𝐚𝐭𝐞𝐧𝐜𝐞*: 6mins+ 1⚠️
*⭕𝐏𝐨𝐫𝐭𝐞́𝐞*: 10m\n▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n
*⚠️Vous avez 🔟 tours max pour finir votre Adversaire! Sinon la victoire sera donnée par décision selon celui qui a dominé le combat ou qui a été le plus offensif !*
`;

            await zk.sendMessage(dest, { image: { url: areneT.image }, caption: ficheDuel }, { quoted: ms });
        } catch (error) {
            console.error('Erreur lors du traitement du duel:', error);
            repondre('Une erreur est survenue lors du traitement de votre demande. Veuillez réessayer plus tard.');
        }
    }
);
