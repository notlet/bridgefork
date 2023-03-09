const config = require('../../config.json');

module.exports = {
    async execute(discordClient, reason) {
        if (config.channels.logOptions.hypixelKicked && config.channels.log) {
            await discordClient.channels.cache
                .get(config.channels.log)
<<<<<<< HEAD
                ?.send(`${config.minecraft.ingameName + ' has' || 'I have'} been kicked from Hypixel. Reason: ${reason}`);
=======
                ?.send(`${'**' + config.minecraft.ingameName + '** has' || 'I have'} been kicked from Hypixel. Reason: ${reason}`);
>>>>>>> 4b14611 (init)
            process.exit();
        }
    },
};
