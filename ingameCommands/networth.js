const { getNetworth } = require('skyhelper-networth');
const config = require('../config.json');
<<<<<<< HEAD
const { getPlayer, getMuseum, numberformatter } = require('../helper/functions.js');

module.exports = {
    name: 'networth',
=======
const { getPlayer, numberformatter } = require('../helper/functions.js');
const funnynetworth = require('../funnynetworth.js');

module.exports = {
    name: 'networth',
    description: 'Get a player\'s networth.',
    args: '[ign] [profile]',
>>>>>>> 4b14611 (init)
    execute: async (discordClient, message, messageAuthor) => {
        if (config.ingameCommands.networth) {
            let { 1: username, 2: profile } = message.split(' ');

            if (!username) username = messageAuthor;

            const searchedPlayer = await getPlayer(username, profile).catch((err) => {
                return minecraftClient.chat(`/gc @${messageAuthor} ${err}`);
            });
<<<<<<< HEAD
            if (!searchedPlayer) return;

            const searchedMuseum = await getMuseum(searchedPlayer.profileData.profile_id, searchedPlayer.uuid);

            const networth = await getNetworth(searchedPlayer.memberData, searchedPlayer.profileData?.banking?.balance || 0, {
                onlyNetworth: true,
                museumData: searchedMuseum,
            });
=======

            const networth = await getNetworth(searchedPlayer.memberData, searchedPlayer.profileData?.banking?.balance, { onlyNetworth: true });
>>>>>>> 4b14611 (init)

            if (networth.noInventory) {
                return minecraftClient.chat(
                    `/gc @${messageAuthor}${messageAuthor === username ? "'s" : ` ${username}'s`} inventory API is disabled.`
                );
            }

<<<<<<< HEAD
=======
            if (Object.keys(funnynetworth).includes(username.toLowerCase())) {
                return minecraftClient.chat(
                    `/gc @${messageAuthor}${messageAuthor === username ? "'s" : ` ${username}'s`} networth is ${funnynetworth[username.toLowerCase()](networth.networth.toFixed(), numberformatter)}.`
                );
            }

>>>>>>> 4b14611 (init)
            minecraftClient.chat(
                `/gc @${messageAuthor}${messageAuthor === username ? "'s" : ` ${username}'s`} networth is ${numberformatter(
                    networth.networth.toFixed(),
                    3
                )}`
            );
        }
    },
};
