const { zokou } = require("../framework/zokou");

const mapData = {
  "120363027511214270@g.us": {
    "METROPOLITANIA": [
      { distance: 48, location: "Av. Kings `[Museum🗿]`", image: "https://files.catbox.moe/v79u4x.jpg" },
      { distance: 47, location: "Av. Federal `[NC Bank🏦]`", image: "url_image_47_groupe1" },
      { distance: 46, location: "Av. Collins `[Parking🚘]`", image: "url_image_46_groupe1" },
      { distance: 45, location: "Av. Telsa `[Metro🚄]`", image: "url_image_45_groupe1" },
      { distance: 44, location: "Av. Fain `[GrandHôtel🏨]`", image: "url_image_44_groupe1" },
      { distance: 43, location: "Av. SAT `[Blue fish🐠🍽️]`", image: "url_image_43_groupe1" },
      { distance: 42, location: "Av. Fortuna `[JacobsCo🔑]`", image: "url_image_42_groupe1" },
      { distance: 41, location: "Av. Temple `[Business&🏢]`", image: "url_image_41_groupe1" },
      { distance: 40, location: "Av. Rocknorth 🚔", image: "url_image_40_groupe1" },
      { distance: 39, location: "Av. Freetown `[Hôpital🏨]`", image: "url_image_39_groupe1" },
      { distance: 38, location: "Av. Swan `[Memorata👛🛍️]`", image: "url_image_38_groupe1" },
      { distance: 37, location: "Av. Sparks `[Apparts🏠]`", image: "url_image_37_groupe1" },
      { distance: 36, location: "Av. Eternity `[Store🛒]`", image: "url_image_36_groupe1" },
      { distance: 35, location: "Av. Sunning `[Neo Tech🩻]`", image: "url_image_35_groupe1" },
      { distance: 34, location: "Av. Liberty `[LCD cars🚘]`", image: "url_image_34_groupe1" },
      { distance: 33, location: "Av. Métro `[Station🚅🌍]`", image: "url_image_33_groupe1" },
    ],
    "ANGELS VICE": [
      { distance: 32, location: "Av. Montana `[Parking🚘]`", image: "url_image_32_groupe1" },
      { distance: 31, location: "Av. Arktown 🚔", image: "url_image_31_groupe1" },
      { distance: 30, location: "Av. Sharp `[Bank ATM🏪]`", image: "url_image_30_groupe1" },
      { distance: 29, location: "Av. Eywood `[StarGym🏋🏽‍♂️]`", image: "url_image_29_groupe1" },
      { distance: 28, location: "Av. Véronica `[Carshop🛠️]`", image: "url_image_28_groupe1" },
      { distance: 27, location: "Av. Loksfort `[EFood🍕]`", image: "url_image_27_groupe1" },
      { distance: 26, location: "Av. Nevada `[Casino🎰]`", image: "url_image_26_groupe1" },
      { distance: 25, location: "Av. Fairy `[EVOstyle👕🛍️]`", image: "url_image_25_groupe1" },
      { distance: 24, location: "Av. Dixies `[Store🛒]`", image: "url_image_24_groupe1" },
      { distance: 23, location: "Av. Staples `[Cinema🍿🎞️]`", image: "url_image_23_groupe1" },
      { distance: 22, location: "Av. Liberty Town", image: "url_image_22_groupe1" },
      { distance: 21, location: "Av. Lux `[ClubVenus🪩🍸]`", image: "url_image_21_groupe1" },
      { distance: 20, location: "Av. Freeland `[GameHome🕹️]`", image: "url_image_20_groupe1" },
      { distance: 19, location: "Av. Shine `[MGStage🎤🪩]`", image: "url_image_19_groupe1" },
      { distance: 18, location: "Av. Red Miles `[Metro🚄]`", image: "url_image_18_groupe1" },
      { distance: 17, location: "Av. Xnes `[Apparts🏠]`", image: "url_image_17_groupe1" },
    ],
    "MARINA": [
      { distance: 16, location: "Av. Tropica `[Store🛒]`", image: "url_image_16_groupe1" },
      { distance: 15, location: "Av. Santana `[Stadium🏟️]`", image: "url_image_15_groupe1" },
      { distance: 14, location: "Av. Blue Bay `[Parking🚘]`", image: "url_image_14_groupe1" },
      { distance: 13, location: "Av. Santa Veronica🦩", image: "url_image_13_groupe1" },
      { distance: 12, location: "Av. Seas `[Playground🏀]`", image: "url_image_12_groupe1" },
      { distance: 11, location: "Av. Haleywood `[Metro🚄]`", image: "url_image_11_groupe1" },
      { distance: 10, location: "Av. Miles `[Joytown🎢🎠]`", image: "url_image_10_groupe1" },
      { distance: 9, location: "Av. Los Flores🦩", image: "url_image_9_groupe1" },
      { distance: 8, location: "Av. Reds `[Paradise👠🔞]`", image: "url_image_8_groupe1" },
      { distance: 7, location: "Av. Maryland `[Races🏁]`", image: "url_image_7_groupe1" },
      { distance: 6, location: "Av. Westshore Sea", image: "url_image_6_groupe1" },
      { distance: 5, location: "Av. Seattle `[Apparts🏠]`", image: "url_image_5_groupe1" },
      { distance: 4, location: "Av. Lust `[Red Club🔞]`", image: "url_image_4_groupe1" },
      { distance: 3, location: "Av. Playa🌴 `[Havanah🍹]`", image: "url_image_3_groupe1" },
      { distance: 2, location: "La Marina🌴 `[TheBay🏖️]`", image: "url_image_2_groupe1" },
      { distance: 1, location: "Long Beach🌴 `[Plage🚤]`", image: "url_image_1_groupe1" },
    ],
  },
};

zokou(
  {
    nomCom: "position",
    categorie: "MAPS_ELYSIUM💠"
  },
  async (dest, zk, commandeOptions) => {
    const { repondre, ms } = commandeOptions;
    const message = ms.body;

    // Extraction de la distance du message
    const match = message.match(/🌍position:\s*(\d+)km/i);
    if (!match) return repondre("❌ Position non détectée.");

    const distance = parseInt(match[1]);

    // Vérifier si une carte existe pour ce groupe
    const groupMap = mapData[dest];
    if (!groupMap) return repondre("❌ Aucune carte trouvée pour ce groupe.");

    // Recherche de la localisation correspondante dans la carte du groupe
    let foundLocation = null;
    for (const district of Object.values(groupMap)) {
      foundLocation = district.find(zone => zone.distance === distance);
      if (foundLocation) break;
    }

    if (!foundLocation) return repondre("❌ Aucune localisation trouvée pour cette distance.");

    const caption = `📍 *Vous êtes à :*\n🌍 ${foundLocation.location}`;
    await zk.sendMessage(dest, { image: { url: foundLocation.image }, caption }, { quoted: ms });
  }
);
