const { zokou } = require("../framework/zokou");

const groupe_ID = "120363027511214270@g.us";

async function simulateLoading(zk, origineMessage, finalMessage, imageURL) {
    const frames = [
        "*`▓░░░░[10%]░░░░░`*",
        "*`▓▓░░░[20%]░░░░░`*",
        "*`▓▓▓░░[30%]░░░░░`*",
        "*`▓▓▓▓░[40%]░░░░░`*",
        "*`▓▓▓▓▓[50%]░░░░░`*",
        "*`▓▓▓▓▓[60%]▓░░░░`*",
        "*`▓▓▓▓▓[70%]▓▓░░░`*",
        "*`▓▓▓▓▓[80%]▓▓▓░░`*",
        "*`▓▓▓▓▓[90%]▓▓▓▓░`*",
        "*`▓▓▓▓▓[100%]▓▓▓▓▓`*",
    ];

    try {
        let loadingMessage = await zk.sendMessage(origineMessage, { text: frames[0] });

        for (let i = 1; i < frames.length; i++) {
            await new Promise((resolve) => setTimeout(resolve, 500)); 
            await zk.sendMessage(origineMessage, {
                text: frames[i],
                edit: loadingMessage.key,
            });
        }

        await zk.sendMessage(origineMessage, {
            image: { url: imageURL },
            caption: finalMessage,
            edit: loadingMessage.key,
        });

    } catch (error) {
        console.error("Erreur lors de la simulation du chargement :", error);
        await zk.sendMessage(origineMessage, { text: "Une erreur s'est produite lors du chargement. 😢" });
    }
}

zokou(
    {
        nomCom: "map",
        reaction: '🗺️',
        categorie: "MAPS_ELYSIUM💠"
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, ms } = commandeOptions;

        try {
            if (dest !== groupe_ID) {
                return repondre("⚠️ Cette carte n'est pas disponible dans cette zone.");
            }

            const message = `*\`♻️FALLEN ANGELES CITY🦩🎡\`*
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
🌃DISTRICT: *🏢𝗠𝗘𝗧𝗥𝗢𝗣𝗢𝗟𝗜𝗧𝗔𝗡𝗜𝗔🏙️* ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔■■■■■
🚸 *48𝗸𝗺*: Av. Kings \`[Museum🗿]\`
🚸 *47𝗸𝗺*: Av. Federal \`[NC Bank🏦]\` 
🚸 *46𝗸𝗺*: Av. Collins \`[Parking🚘]\` 
🚸 *45𝗸𝗺*: Av. Telsa \`[Metro🚄]\` 
🚸 *44𝗸𝗺*: Av. Fain \`[GrandHôtel🏨]\`
🚸 *43𝗸𝗺*: Av. SAT \`[Blue fish🐠🍽️]\`
🚸 *42𝗸𝗺*: Av. Fortuna \`[JacobsCo🔑]\`
🚸 *41𝗸𝗺*: Av. Temple \`[Business&🏢]\`
      ══🔽 \`𝗠𝗘𝗧𝗥𝗢𝗧𝗢𝗪𝗡\`🏙️[N]═══
◾ *40𝗸𝗺*:  Av. Rocknorth 🚔
🚸 *39𝗸𝗺*: Av. Freetown \`[Hôpital🏨]\`
🚸 *38𝗸𝗺*: Av. Swan \`[Memorata👛🛍️]\`
♻️ *37𝗸𝗺*: Av. Sparks \`[Apparts🏠]\`
🚸 *36𝗸𝗺*: Av. Eternity \`[Store🛒]\` 
🚸 *35𝗸𝗺*: Av. Sunning \`[Neo Tech🩻]\`
🚸 *34𝗸𝗺*: Av. liberty \`[LCD cars🚘]\` 
🚸 *33𝗸𝗺*: Av. Métro \`[Station🚅🌍]\`
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
🛜 *Environment*:
\`[Voir Description]\` 
🛣️🚘 *Traffic Intense*:
\`[Voir Description]\`
🚔: Point de Contrôle de Police

▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
🌃DISTRICT:*🍸𝗔𝗡𝗚𝗘𝗟𝗦 𝗩𝗜𝗖E⭐* [E] 
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔■■■■■
◼️ *32𝗸𝗺*: Av. Montana \`[Parking🚘]\`
◼️ *31𝗸𝗺*: Av. Arktown 🚔
🚸 *30𝗸𝗺*: Av. Sharp \`[Bank ATM🏪]\` 
🚸 *29𝗸𝗺*: Av. Eywood \`[StarGym🏋🏽‍♂️]\`
🚸 *28𝗸𝗺*: Av. Véronica \`[Carshop🛠️]\` 
🚸 *27𝗸𝗺*: Av. Loksfort \`[EFood🍕]\`
🚸 *26𝗸𝗺*: Av. Nevada \`[Casino🎰]\`
🚸 *25𝗸𝗺*: Av. Fairy \`[EVOstyle👕🛍️]\`
         ══ 🔽 \`𝗩𝗘𝗥𝗢𝗡𝗜𝗖𝗔\`🍸[O]══
🚸 *24𝗸𝗺*: Av. Dixies \`[Store🛒]\`
🚸 *23𝗸𝗺*: Av. Staples \`[Cinema🍿🎞️]\`
◼️ *22𝗸𝗺*: Av. Liberty Town
🚸 *21𝗸𝗺*: Av. Lux \`[ClubVenus🪩🍸]\`
🚸 *20𝗸𝗺*: Av.Freeland \`[GameHome🕹️]\`
🚸 *19𝗸𝗺*: Av. Shine \`[MGStage🎤🪩]\`
🚸 *18𝗸𝗺*: Av. Red miles \`[Metro🚄]\`
♻️ *17𝗸𝗺*: Av. Xnes \`[Apparts 🏠]\`
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
🛜 *Environment*:
\`[Voir Description]\` 
🛣️🚘 *Traffic Moyen*:
\`[Voir Description]\` 
🚔: Point de Contrôle de Police

▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
 🌃DISTRICT: *🎡𝗠𝗔𝗥𝗜𝗡𝗔🦩🌴* [S] 
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔■■■■■
🚸 *16𝗸𝗺*: Av. Tropica \`[Store🛒]\`
🚸 *15𝗸𝗺*: Av. Santana \`[Stadium🏟️]\`
◼️ *14𝗸𝗺*: Av. Blue Bay \`[Parking🚘]\`
◼️ *13𝗸𝗺*: Av. Santa Veronica🦩
🚸 *12𝗸𝗺*: Av. Seas \`[Playground🏀]\`
🚸 *11𝗸𝗺*: Av. Haleywood \`[Metro🚄]\`
🚸 *10𝗸𝗺*: Av. Miles \`[Joytown🎢🎠]\`
◼️ *9𝗸𝗺*: Av. Los Flores🦩
      ══🔽 \`𝗠𝗔𝗥𝗜𝗡𝗔 𝗕𝗘𝗔𝗖𝗛\`🦩🌴══
🚸 *8𝗸𝗺*: Av.Reds \`[Paradise👠🔞]\` 
🚸 *7𝗸𝗺*: Av.Maryland \`[Races🏁]\`
◼️ *6𝗸𝗺*: Av. Westshore sea
♻️ *5𝗸𝗺*: Av. Seattle \`[Apparts🏠]\`
🚸 *4𝗸𝗺*: Av. Lust  \`[Red Club🔞]\`💋
🚸 *3𝗸𝗺*: Av. Playa🌴 \`[Havanah🍹]\`
◼️ *2𝗸𝗺*: La Marina🌴 \`[TheBay🏖️]\`
◼️ *1𝗸𝗺*: Long Beach🌴 \`[Plage🚤]\` 
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
🛜⚠️GANG:
\`Tout Marina Beach est Le territoire du Gang des EXOTICS💋\`
🛜 *Environment*: 
\`[Voir Description]\` 
🛣️🚘 *Traffic Moyen*:
 \`[Voir Description]\`
🚔: Point de Contrôle de Police
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
                       ◻◻◻◻◻▢▢▢`;

            const imageURL = "https://files.catbox.moe/v79u4x.jpg";

            await simulateLoading(zk, dest, message, imageURL);

        } catch (error) {
            console.error("Erreur lors de l'envoi de la carte:", error);
            repondre("❌ Une erreur est survenue lors de l'envoi de la carte.");
        }
    }
);
