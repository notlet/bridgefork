const config = require('../config.json');
const { getPlayer, decodeData } = require('../helper/functions.js');
const { renderLore } = require('../helper/loreRenderer');
const imgur = require('imgur-anonymous-uploader');

module.exports = {
    name: 'render',
<<<<<<< HEAD
<<<<<<< HEAD
=======
    description: 'Render a player\'s item.',
    args: '[ign] [profile] (slot)',
>>>>>>> 4b14611 (init)
=======
    description: 'Render a player\'s item.',
    args: '[ign] [profile] (slot)',
>>>>>>> 927c547 (fixed data files to not be included)
    execute: async (discordClient, message, messageAuthor) => {
        if (config.ingameCommands.render && config.keys.imgurClientId) {
            const uploader = new imgur(config.keys.imgurClientId);

            let { 1: username, 2: profile, 3: itemNumber } = message.split(' ');

            if (!username) username = messageAuthor;

            if (!isNaN(Number(profile))) {
                itemNumber = profile;
            }
            if (!isNaN(Number(username))) {
                itemNumber = username;
                username = messageAuthor;
            }

            if (itemNumber < 1 || itemNumber > 9 || !itemNumber)
                return minecraftClient.chat(`/gc @${messageAuthor} Invalid item number. Must be between 1 and 9.`);

            const searchedPlayer = await getPlayer(username, profile).catch((err) => {
                return minecraftClient.chat(`/gc @${messageAuthor} ${err}`);
            });
<<<<<<< HEAD
<<<<<<< HEAD
            if (!searchedPlayer) return;
=======
>>>>>>> 4b14611 (init)
=======
>>>>>>> 927c547 (fixed data files to not be included)
            const playerProfile = searchedPlayer.memberData;

            const inventory = playerProfile?.inv_contents?.data;
            if (!inventory) {
                return minecraftClient.chat(
                    `/gc @${messageAuthor}${
                        messageAuthor === username ? '' : ` ${username}`
                    } has no items in their inventory or has their inventory API disabled.`
                );
            }

            const inventoryData = (await decodeData(Buffer.from(inventory, 'base64'))).i;
            const selectedItem = inventoryData[itemNumber - 1];
            if (!selectedItem || !Object.keys(selectedItem || {}).length) {
                return minecraftClient.chat(`/gc @${messageAuthor} This player does not have an item in slot ${itemNumber}.`);
            }

            const renderedItem = await renderLore(selectedItem?.tag?.display?.Name, selectedItem?.tag?.display?.Lore);

            const uploadResponse = await uploader.uploadBuffer(renderedItem);
            if (!uploadResponse.url) return minecraftClient.chat(`/gc @${messageAuthor} Failed to upload image.`);

            minecraftClient.chat(`/gc @${messageAuthor} ${uploadResponse.url}`);
        }
    },
};
