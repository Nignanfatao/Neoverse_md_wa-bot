
const map_fa = [
    { km: 48, lieu: "Av. Kings [Museum🗿]" },
    { km: 47, lieu: "Av. Federal [NC Bank🏦]" },
    { km: 46, lieu: "Av. Collins [Parking🚘]" },
    { km: 45, lieu: "Av. Telsa [Metro🚄]" },
    { km: 44, lieu: "Av. Fain [GrandHôtel🏨]" },
    { km: 43, lieu: "Av. SAT [Blue fish🐠🍽️]" },
    { km: 42, lieu: "Av. Fortuna [JacobsCo🔑]" },
    { km: 41, lieu: "Av. Temple [Business&🏢]" },
    { km: 40, lieu: "Av. Rocknorth 🚔" },
    { km: 39, lieu: "Av. Freetown [Hôpital🏨]" },
    { km: 38, lieu: "Av. Swan [Memorata👛🛍️]" },
    { km: 37, lieu: "Av. Sparks [Apparts🏠]" },
    { km: 36, lieu: "Av. Eternity [Store🛒]" },
    { km: 35, lieu: "Av. Sunning [Neo Tech🩻]" },
    { km: 34, lieu: "Av. Liberty [LCD cars🚘]" },
    { km: 33, lieu: "Av. Métro [Station🚅🌍]" },
    { km: 32, lieu: "Av. Montana [Parking🚘]" },
    { km: 31, lieu: "Av. Arktown 🚔" },
    { km: 30, lieu: "Av. Sharp [Bank ATM🏪]" },
    { km: 29, lieu: "Av. Eywood [StarGym🏋🏽‍♂️]" },
    { km: 28, lieu: "Av. Véronica [Carshop🛠️]" },
    { km: 27, lieu: "Av. Loksfort [EFood🍕]" },
    { km: 26, lieu: "Av. Nevada [Casino🎰]" },
    { km: 25, lieu: "Av. Fairy [EVOstyle👕🛍️]" },
    { km: 24, lieu: "Av. Dixies [Store🛒]" },
    { km: 23, lieu: "Av. Staples [Cinema🍿🎞️]" },
    { km: 22, lieu: "Av. Liberty Town" },
    { km: 21, lieu: "Av. Lux [ClubVenus🪩🍸]" },
    { km: 20, lieu: "Av. Freeland [GameHome🕹️]" },
    { km: 19, lieu: "Av. Shine [MGStage🎤🪩]" },
    { km: 18, lieu: "Av. Red miles [Metro🚄]" },
    { km: 17, lieu: "Av. Xnes [Apparts 🏠]" },
    { km: 16, lieu: "Av. Tropica [Store🛒]" },
    { km: 15, lieu: "Av. Santana [Stadium🏟️]" },
    { km: 14, lieu: "Av. Blue Bay [Parking🚘]" },
    { km: 13, lieu: "Av. Santa Veronica🦩" },
    { km: 12, lieu: "Av. Seas [Playground🏀]" },
    { km: 11, lieu: "Av. Haleywood [Metro🚄]" },
    { km: 10, lieu: "Av. Miles [Joytown🎢🎠]" },
    { km: 9, lieu: "Av. Los Flores🦩" },
    { km: 8, lieu: "Av. Reds [Paradise👠🔞]" },
    { km: 7, lieu: "Av. Maryland [Races🏁]" },
    { km: 6, lieu: "Av. Westshore sea" },
    { km: 5, lieu: "Av. Seattle [Apparts🏠]" },
    { km: 4, lieu: "Av. Lust [Red Club🔞]💋" },
    { km: 3, lieu: "Av. Playa🌴 [Havanah🍹]" },
    { km: 2, lieu: "La Marina🌴 [TheBay🏖️]" },
    { km: 1, lieu: "Long Beach🌴 [Plage🚤]" }
];

let lastPosition = null;

function handleLocation({ texte, repondre }) {
    if (typeof texte === "string" && texte.toLowerCase().startsWith("💠i n t e r f a c e\n▔▔▔▔▔▔▔▔▔▔▔▔▔■■■■■\n🌍position")) {
        
        const regex = /🌍position:\s*([🦶🏾🚗🚲🚆]?)\s*(\d+)km/i;
        const match = texte.match(regex);

        if (match) {
            const modeTransport = match[1];
            const currentPosition = parseInt(match[2], 10);

            if (lastPosition !== null && lastPosition !== currentPosition) {
                const distance = Math.abs(currentPosition - lastPosition);

                if (modeTransport === "🦶🏾" && distance > 1) {
                    repondre("🚶🏾‍♂️ Vous ne pouvez pas parcourir autant de distance à pied !\n🚖 Voulez-vous prendre un taxi ? (Oui/Non)");
                    return;
                }

                let oldLocation = map_fa.find(loc => loc.km === lastPosition);
                let newLocation = map_fa.find(loc => loc.km === currentPosition);
                
                let oldName = oldLocation ? oldLocation.lieu : "Lieu inconnu";
                let newName = newLocation ? newLocation.lieu : "Lieu inconnu";

                console.log(`Ancienne position: ${lastPosition}, Nouvelle: ${currentPosition}`);
                repondre(`📍 Ancienne position : *${oldName}*\n📍 Nouvelle position : *${newName}*`);

            } else {
                console.log(`Position inchangée: ${currentPosition}`);
                repondre("📍 Position inchangée");
            }

            lastPosition = currentPosition;
        }
    }
}

module.exports = handleLocation;
