const config = require('../config.json');
<<<<<<< HEAD
<<<<<<< HEAD
const { getPlayer, toFixed } = require('../helper/functions.js');

module.exports = {
    name: 'level',
    execute: async (discordClient, message, messageAuthor) => {
        if (config.ingameCommands.level) {
=======
=======
>>>>>>> 927c547 (fixed data files to not be included)
const { getPlayer } = require('../helper/functions.js');

module.exports = {
    name: 'level',
    description: 'Get a player\'s skyblock level.',
    args: '[ign] [profile]',
    execute: async (discordClient, message, messageAuthor) => {
        if (config.ingameCommands.skills) {
<<<<<<< HEAD
>>>>>>> 4b14611 (init)
=======
>>>>>>> 927c547 (fixed data files to not be included)
            let { 1: username, 2: profile } = message.split(' ');

            if (!username) username = messageAuthor;

            const searchedPlayer = await getPlayer(username, profile).catch((err) => {
                return minecraftClient.chat(`/gc @${messageAuthor} ${err}`);
            });
<<<<<<< HEAD
<<<<<<< HEAD
            if (!searchedPlayer) return;
            const playerProfile = searchedPlayer.memberData;

            minecraftClient.chat(
                `/gc @${messageAuthor}${messageAuthor === username ? "'s" : ` ${username}'s`} SkyBlock level is ${Number(
                    toFixed((playerProfile.leveling?.experience || 0) / 100, 2)
                )}.`
            );
=======
=======
>>>>>>> 927c547 (fixed data files to not be included)

            const playerProfile = searchedPlayer.memberData;
            if (!playerProfile || !playerProfile.leveling || !playerProfile.leveling.experience) {
                return minecraftClient.chat(`/gc @${messageAuthor}${messageAuthor === username ? "'s" : ` ${username}'s`} skyblock level was unable to be fetched.`);
            }

            minecraftClient.chat(`/gc @${messageAuthor}${messageAuthor === username ? "'s" : ` ${username}'s`} skyblock level is ${parseFloat(playerProfile.leveling.experience / 100).toFixed(2)}.`);
<<<<<<< HEAD
>>>>>>> 4b14611 (init)
=======
>>>>>>> 927c547 (fixed data files to not be included)
        }
    },
};
