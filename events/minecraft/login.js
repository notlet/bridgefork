const fs = require('fs');
const config = require('../../config.json');

let emittedEvent = false;
module.exports = {
    async execute(discordClient) {
        if (!emittedEvent) {
            config.minecraft.ingameName = minecraftClient._client.session.selectedProfile.name;
            fs.writeFileSync('./config.json', JSON.stringify(config, null, 2));

            if (config.channels.logOptions.hypixelLogin && config.channels.log) {
                await discordClient.channels.cache
                    .get(config.channels.log)
<<<<<<< HEAD
<<<<<<< HEAD
                    ?.send(`${config.minecraft.ingameName + ' has' || 'I have'} logged in to Hypixel.`);
=======
                    ?.send(`${'**' + config.minecraft.ingameName + '** has' || 'I have'} logged in to Hypixel.`);
>>>>>>> 4b14611 (init)
=======
                    ?.send(`${'**' + config.minecraft.ingameName + '** has' || 'I have'} logged in to Hypixel.`);
>>>>>>> 927c547 (fixed data files to not be included)
            }
            console.log('[MINECRAFT] Logged in!');
            emittedEvent = true;

            // LIMBO CHECK
            setTimeout(() => {
                minecraftClient.chat('/locraw');
            }, 5000);
<<<<<<< HEAD
<<<<<<< HEAD
            setInterval(() => {
                minecraftClient.chat('/locraw');
            }, 1000 * 60);
=======
=======
>>>>>>> 927c547 (fixed data files to not be included)

            minecraftClient.on("login", () => setTimeout(() => minecraftClient.chat("/locraw"), 10000));
            setInterval(() => {
                minecraftClient.chat('/locraw');
            }, 1000 * 60 * 5);
<<<<<<< HEAD
>>>>>>> 4b14611 (init)
=======
>>>>>>> 927c547 (fixed data files to not be included)
        }
    },
};
