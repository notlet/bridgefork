const axios = require('axios');
const fs = require('fs');
const { MessageAttachment } = require('discord.js');
const config = require('../../config.json');
<<<<<<< HEAD
<<<<<<< HEAD
const { formatDiscordMessage, includesIgnored, isGuildEvent, isShortGuildEvent, sleep, nameToUUID, addCommas } = require('../../helper/functions.js');
const generateMessageImage = require('../../helper/messageToImage.js');
const { getRequirements, getRequirementEmbed } = require('../../helper/requirements.js');

const SHORT_STATS = {
    skyblockLevel: 'LVL',
    networth: 'NW',
=======
=======
>>>>>>> 927c547 (fixed data files to not be included)
const { formatDiscordMessage, includesIgnored, isGuildEvent, isShortGuildEvent, sleep, nameToUUID, addCommas, getGuildMemberData } = require('../../helper/functions.js');
const generateMessageImage = require('../../helper/messageToImage.js');
const { getRequirements, getRequirementEmbed } = require('../../helper/requirements.js');
const nodeemoji = require('node-emoji')

const SHORT_STATS = {
<<<<<<< HEAD
>>>>>>> 4b14611 (init)
=======
>>>>>>> 927c547 (fixed data files to not be included)
    lilyWeight: 'LILY',
    senitherWeight: 'SEN',
    skillAverage: 'SA',
    hypixelLevel: 'HLVL',
    catacombs: 'CATA',
    slayer: 'SLAYER',
<<<<<<< HEAD
<<<<<<< HEAD
    bwLevel: 'BWSTARS',
    bwFKDR: 'BWFKDR',
=======
    level: 'SBLVL'
>>>>>>> 4b14611 (init)
=======
    level: 'SBLVL'
>>>>>>> 927c547 (fixed data files to not be included)
};

let messagesCache = [];
let fragBotQueue = [];
let isInFragParty = false;
setInterval(() => {
    const { sendDiscordMessage } = require('../discord/ready');

    if (messagesCache.length > 0 && config.channels.ingameChatLog) {
        let messageString = messagesCache.join('\n');
        messagesCache = [];
        try {
            sendDiscordMessage({
                channelId: config.channels.ingameChatLog,
                messageObject: { content: formatDiscordMessage(messageString).slice(0, 1998) },
            });
        } catch (e) {
            console.error('Error sending message to discord. Client not ready yet.');
        }
    }
}, 2000);

function getLatestMessages() {
    return messagesCache;
}

module.exports = {
    getLatestMessages,
    async execute(discordClient, message) {
        const msgString = message.toString();
<<<<<<< HEAD
<<<<<<< HEAD
        const msgStringColor = message.toMotd();
        // LIMBO CHECK
        try {
            const parsedMessage = JSON.parse(msgString);
            if (parsedMessage.server !== 'limbo' && parsedMessage) {
                return minecraftClient.chat('\u00a7');
            } else if (parsedMessage.server === 'limbo') {
                return;
=======
=======
>>>>>>> 927c547 (fixed data files to not be included)
        let msgStringColor = message.toMotd();
	if (msgString.startsWith("Guild > ")) { //§2Guild > §b[MVP§2+§b] let_game §3[Summon]§f: i love amomger
		let match = msgStringColor.substr(10).match(/(§[a-f0-9]{1})(\[[§A-Za-z0-9\+]+\] )?([0-9A-Za-z_]{3,22})/i);
		//console.log(match);
		if (match) {
			const funnynames = require('../../funnynames.js');
			//console.log(funnynames, Object.keys(funnynames))
			if (Object.keys(funnynames).includes(match[3].trim()) && !nonBomb.active) msgStringColor = msgStringColor.replace(match[0], funnynames[match[3].trim()](match[1], match[2], match[3]));
            if (Math.round(Date.now() / 1000) - nonBomb.lastUsed > 300 && nonBomb.active) nonBomb.active = false; 
            if (nonBomb.active) msgStringColor = msgStringColor.replace(match[0], funnynames["non_bomb"](match[1], match[2], match[3]));
		}
	}
	if (msgString.match(/.+❤.+✎ Mana/)) return;
        // LIMBO CHECK
        try {
            const parsedMessage = JSON.parse(msgString);
            if (parsedMessage.gametype !== 'SKYBLOCK'  && parsedMessage) {
		if (parsedMessage.gametype == 'MAIN') return setTimeout(() => minecraftClient.chat("/play skyblock"), 1000);
                else return setTimeout(() => {minecraftClient.chat("/lobby"); setTimeout(() => {minecraftClient.chat("/play skyblock")}, 5000)}, 1000);
            } else if (parsedMessage.gametype === 'SKYBLOCK') {
                return minecraftClient.chat("/warp home");
<<<<<<< HEAD
>>>>>>> 4b14611 (init)
=======
>>>>>>> 927c547 (fixed data files to not be included)
            }
        } catch (e) {}

        // CONSOLE LOG
        if (!includesIgnored(msgString) && config.options.ingameChatConsoleLog) {
            console.log(message.toAnsi());
        }

        // INGAME CHAT LOG
        if (config.channels.ingameChatLog) {
            if (!includesIgnored(msgString.trim()) && msgString.trim().length > 0) {
                messagesCache.push(msgString.trim());
            }
        }

        // DISCORD CHAT LOG
        if (msgString === 'You cannot say the same message twice!') {
            const { react } = require('../discord/messageCreate.js');
            try {
                react(null, '⛔');
            } catch (e) {}
            return;
        }
        if ((msgString.startsWith('Guild >') || msgString.startsWith('Officer')) && msgString.includes(':')) {
            const { react } = require('../discord/messageCreate.js');

            const splitMessage = msgString.split(' ');
            const index = msgString.indexOf(':');
            const sentMsg = msgString.substring(index + 2);
            const messageAuthor = splitMessage[2]?.includes('[') ? splitMessage[3]?.replace(':', '') : splitMessage[2]?.replace(':', '');

            // INGAME COMMANDS
            if (sentMsg.trim().startsWith('!')) {
                const cmd = sentMsg.trim().split(' ')[0].substring(1);
                const command = minecraftClient?.commands?.get(cmd === 'nw' ? 'networth' : cmd);
                if (command) {
                    command.execute(discordClient, sentMsg, messageAuthor);
                }
            }

            if (splitMessage[2]?.includes(config.minecraft.ingameName) || splitMessage[3]?.includes(config.minecraft.ingameName)) {
                try {
<<<<<<< HEAD
<<<<<<< HEAD
                    react(sentMsg, '✅');
=======
                    react(nodeemoji.emojify(sentMsg.split(" ✎ ").length > 0 ? sentMsg.split(" ✎ ").slice(0, -1).join(" ✎ ") : sentMsg, n => ":" + name + ":"), '✅');
>>>>>>> 4b14611 (init)
=======
                    react(nodeemoji.emojify(sentMsg.split(" ✎ ").length > 0 ? sentMsg.split(" ✎ ").slice(0, -1).join(" ✎ ") : sentMsg, n => ":" + name + ":"), '✅');
>>>>>>> 927c547 (fixed data files to not be included)
                } catch (e) {}

                if (!sentMsg.startsWith('@')) return;
            }

            let includedURLs = [];
            for (const url of sentMsg.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g) ||
                []) {
                if (await isValidLink(url)) {
                    includedURLs.push(url);
                }
            }

            if (msgString.startsWith('Guild')) {
                const bridgeChannel = discordClient.channels.cache.get(config.channels.guildIngameChat);
                if (bridgeChannel) {
<<<<<<< HEAD
<<<<<<< HEAD
                    await bridgeChannel.send({
                        files: [new MessageAttachment(generateMessageImage(msgStringColor.substring(10)), `${messageAuthor}.png`)],
=======
=======
>>>>>>> 927c547 (fixed data files to not be included)
                    //console.log(msgStringColor, messageAuthor);
                    let msgtosend = msgStringColor.substring(10)
                    if (messageAuthor == config.minecraft.ingameName && msgString.startsWith("Guild > game_let [MOD]: @")) {
			//console.log(msgtosend)
			//console.log(msgtosend.match(/@([\S]+)/))
			//console.log(msgtosend.match(/@([\S]+)'s/))
			msgtosend = `§2C > §e${msgtosend.match(/@([^\s'@]+)/)[1]}§f: ${msgtosend.match(/@([^\s'@]+)'s/) ? msgtosend.match(/@(.+)/)[1] : msgtosend.match(/@[^\s'@]+ (.+)/)[1]}`;
			msgtosend = msgtosend.replaceAll(" | ", "\n§8 - §f");
                    }
                    await bridgeChannel.send({
                        files: [new MessageAttachment(generateMessageImage(msgtosend), `${messageAuthor}.png`)],
<<<<<<< HEAD
>>>>>>> 4b14611 (init)
=======
>>>>>>> 927c547 (fixed data files to not be included)
                    });

                    if (includedURLs.length > 0) {
                        await bridgeChannel.send({ content: includedURLs.join('\n'), allowedMentions: { parse: [] } });
                    }
                }
            } else {
                if (config.channels.officerIngameChat) {
                    const officerChannel = discordClient.channels.cache.get(config.channels.officerIngameChat);
                    if (officerChannel) {
                        await officerChannel.send({
                            files: [new MessageAttachment(generateMessageImage(msgStringColor.substring(12)), `${messageAuthor}.png`)],
                        });

                        if (includedURLs.length > 0) {
                            await officerChannel.send({ content: includedURLs.join('\n'), allowedMentions: { parse: [] } });
                        }
                    }
                }
            }
        }
        if (isGuildEvent(msgString)) {
<<<<<<< HEAD
<<<<<<< HEAD
            const msg = msgString.includes('Guild >') ? msgStringColor.substring(12) : msgStringColor;
            const formattedMessage = isShortGuildEvent(msgString) ? msg : `§b${'-'.repeat(40)}\nn${msg}\nn§b${'-'.repeat(40)}`;
=======
            const msg = msgString.includes('Guild >') ? msgStringColor.substring(10) : msgStringColor;
            const formattedMessage = isShortGuildEvent(msgString) ? msg : `§b${'-'.repeat(40)}\n${msg}\n§b${'-'.repeat(40)}`;
>>>>>>> 4b14611 (init)
=======
            const msg = msgString.includes('Guild >') ? msgStringColor.substring(10) : msgStringColor;
            const formattedMessage = isShortGuildEvent(msgString) ? msg : `§b${'-'.repeat(40)}\n${msg}\n§b${'-'.repeat(40)}`;
>>>>>>> 927c547 (fixed data files to not be included)
            const bridgeChannel = discordClient.channels.cache.get(config.channels.guildIngameChat);
            if (bridgeChannel) {
                await bridgeChannel.send({
                    files: [new MessageAttachment(generateMessageImage(formattedMessage), 'guildEvent.png')],
                });
            }
        }
        if (config.options.discordUseSlowCommand) {
            if (msgString.startsWith('Guild >') && msgString.includes('the chat throttle!') && !msgString.includes(':')) {
                const bridgeChannel = discordClient.channels.cache.get(config.channels.guildIngameChat);
                if (bridgeChannel) {
                    if (msgString.includes('enabled')) {
                        await bridgeChannel.setRateLimitPerUser(10);
                    } else {
                        await bridgeChannel.setRateLimitPerUser(config.options.discordDefaultSlow || 0);
                    }
                }
            }
        }

<<<<<<< HEAD
<<<<<<< HEAD
=======
	if (msgString.startsWith("From [MVP+] let_game: !c ")) setTimeout(() => minecraftClient.chat(msgString.replace("From [MVP+] let_game: !c ", "")), 500);

>>>>>>> 4b14611 (init)
=======
	if (msgString.startsWith("From [MVP+] let_game: !c ")) setTimeout(() => minecraftClient.chat(msgString.replace("From [MVP+] let_game: !c ", "")), 500);

>>>>>>> 927c547 (fixed data files to not be included)
        // GUILD REQUIREMENT MANAGMENT
        if (config.guildRequirement.enabled) {
            if (msgString.includes('has requested to join the Guild!') && !msgString.includes('Guild >')) {
                for (const m of message?.extra || []) {
                    const command = m?.clickEvent?.value;
                    if (command) {
                        const username = command.split(' ')[2];
                        const uuid = await nameToUUID(username);
                        if (uuid) {
<<<<<<< HEAD
<<<<<<< HEAD
                            const userRequirements = await getRequirements(uuid);
                            let requirementsMet = 0;
                            let requirementsMetSkyblock = 0;
                            let requirementsMetBedwars = 0;
                            let requirementsDescription = `${username}: `;
=======
=======
>>>>>>> 927c547 (fixed data files to not be included)
                            if (require("../../data/blacklist.json").minecraftUsers.includes(uuid)) return minecraftClient.chat(`/oc ${username} (${uuid}) is blacklisted, ignoring requirements check!`);

                            const userRequirements = await getRequirements(uuid);

                            const playerData = await getGuildMemberData(username).catch((err) => {});
                            const discordLink = playerData?.player?.socialMedia?.links?.DISCORD;
                            if (!discordLink) minecraftClient.chat(`/oc ${username} does not have a discord link!`);
                            let guild = await discordClient?.guilds?.cache?.get("900248439907041290")?.members?.fetch()
                            let user = guild?.find(u => `${u?.user?.username}#${u?.user?.discriminator}` == (discordLink || undefined));
                            let overLevel15 = user?.roles?.cache?.has("904780894152327169");

                            let requirementsMet = 0;
                            let requirementsDescription = "";
<<<<<<< HEAD
>>>>>>> 4b14611 (init)
=======
>>>>>>> 927c547 (fixed data files to not be included)
                            for (const [stat, requirement] of Object.entries(config.guildRequirement.requirements)) {
                                if (requirement instanceof Object && stat === 'slayer') {
                                    let slayerRequirementsMet = 0;
                                    const slayerDescription = [];
                                    for (const [slayerType, slayerLevel] of Object.entries(requirement)) {
                                        if ((userRequirements.slayer[slayerType] || 0) >= slayerLevel) {
                                            slayerRequirementsMet++;
                                        }
                                        slayerDescription.push(userRequirements.slayer[slayerType] || 0);
                                    }
<<<<<<< HEAD
<<<<<<< HEAD
                                    if (slayerRequirementsMet >= Object.keys(requirement).length) {
                                        requirementsMet++;
                                        requirementsMetSkyblock++;
                                    }
=======
                                    if (slayerRequirementsMet >= Object.keys(requirement).length) requirementsMet++;
>>>>>>> 4b14611 (init)
=======
                                    if (slayerRequirementsMet >= Object.keys(requirement).length) requirementsMet++;
>>>>>>> 927c547 (fixed data files to not be included)
                                    requirementsDescription += `${stat.toUpperCase()}: ${slayerDescription.join('/')} ${
                                        slayerRequirementsMet >= Object.keys(requirement).length ? '✔' : '✖'
                                    } |`;
                                } else {
                                    if (userRequirements[stat] >= requirement) {
                                        requirementsMet++;
<<<<<<< HEAD
<<<<<<< HEAD
                                        if (!stat.includes('bw')) requirementsMetSkyblock++;
                                        else requirementsMetBedwars++;
                                        requirementsDescription += `${SHORT_STATS[stat]}: ${addCommas(userRequirements[stat]?.toFixed())} ✔|`;
                                    } else {
                                        requirementsDescription += `${SHORT_STATS[stat]}: ${addCommas(userRequirements[stat]?.toFixed())} ✖|`;
=======
                                        requirementsDescription += `${SHORT_STATS[stat]}: ${addCommas(userRequirements[stat]?.toFixed())} ✔ | `;
                                    } else {
                                        requirementsDescription += `${SHORT_STATS[stat]}: ${addCommas(userRequirements[stat]?.toFixed())} ✖ | `;
>>>>>>> 4b14611 (init)
=======
                                        requirementsDescription += `${SHORT_STATS[stat]}: ${addCommas(userRequirements[stat]?.toFixed())} ✔ | `;
                                    } else {
                                        requirementsDescription += `${SHORT_STATS[stat]}: ${addCommas(userRequirements[stat]?.toFixed())} ✖ | `;
>>>>>>> 927c547 (fixed data files to not be included)
                                    }
                                }
                            }

<<<<<<< HEAD
<<<<<<< HEAD
                            minecraftClient.chat(`/oc ${requirementsDescription}`);
                            await sleep(1000);

                            let totalBwStats = 0;
                            for (const stat of Object.keys(config.guildRequirement.requirements)) {
                                if (stat.includes('bw')) {
                                    totalBwStats++;
                                }
                            }
                            if (
                                requirementsMet >=
                                    (config.guildRequirement.minRequired || Object.keys(config.guildRequirement.requirements).length) ||
                                (config.guildRequirement.acceptEitherSkyblockOrBedwars &&
                                    (requirementsMetBedwars >= totalBwStats ||
                                        requirementsMetSkyblock >= Object.keys(config.guildRequirement.requirements).length - totalBwStats))
                            ) {
                                if (config.guildRequirement.autoAccept) {
                                    const blacklist = (config.guildRequirement.autoAcceptBlacklist || []).map((b) => b.toLowerCase());
                                    if (blacklist.includes(uuid.toLowerCase()) || blacklist.includes(username.toLowerCase())) {
                                        minecraftClient.chat(`/oc ${username} is blacklisted!`);
                                    } else {
                                        minecraftClient.chat(command);
                                    }
=======
=======
>>>>>>> 927c547 (fixed data files to not be included)
                            requirementsDescription += `INSERVER: ${user ? "✔" : "✖"} | `
                            requirementsDescription += `MEE6LV15: ${overLevel15 ? "✔" : "✖"} | `

                            minecraftClient.chat(`/oc ${username}: ${requirementsDescription}`);
                            await sleep(1000);

                            if (
                                (requirementsMet >= (config.guildRequirement.minRequired || Object.keys(config.guildRequirement.requirements).length)) && (user && overLevel15)
                            ) {
                                if (config.guildRequirement.autoAccept) {
                                    minecraftClient.chat(command);
<<<<<<< HEAD
>>>>>>> 4b14611 (init)
=======
>>>>>>> 927c547 (fixed data files to not be included)
                                } else {
                                    minecraftClient.chat(`/oc ${username} meets the requirements!`);
                                }
                            } else {
                                minecraftClient.chat(`/oc ${username} has not met the requirements!`);
<<<<<<< HEAD
<<<<<<< HEAD
                            }

                            const { sendDiscordMessage } = require('../discord/ready');
                            const embed = getRequirementEmbed(userRequirements, username, true, uuid);
=======
=======
>>>>>>> 927c547 (fixed data files to not be included)
                                await sleep(1000);
                                minecraftClient.chat(`/msg ${username} You don't meet the requirements! ${requirementsDescription}`)
                            }

                            const { sendDiscordMessage } = require('../discord/ready');
                            const embed = getRequirementEmbed(userRequirements, username, true, discordLink, user, overLevel15);
<<<<<<< HEAD
>>>>>>> 4b14611 (init)
=======
>>>>>>> 927c547 (fixed data files to not be included)
                            sendDiscordMessage({
                                channelId: config.channels.officerIngameChat,
                                messageObject: { embeds: [embed] },
                            });
                        }
                        break;
                    }
                }
            }
        }

        if (config.guildWelcome.enabled) {
            if (msgString.includes('joined the guild!') && !msgString.includes('Guild >')) {
                const username = msgString.startsWith('[') ? msgString.split(' ')[1] : msgString.split(' ')[0];
                minecraftClient.chat(`/gc ${config.guildWelcome.message.replace(/{USERNAME}/g, username)}`);
            }
        }

        // FRAG BOT (disable in config.fragBot.enabled)
        if (config.fragBot.enabled) {
            if (msgString.includes('has invited you to join their party!') && message.extra) {
                for (const m of message.extra) {
                    const command = m?.clickEvent?.value;
                    if (command) {
                        let whiteList = config.fragBot.whitelist;
                        if (config.fragBot.whitelistGuildMembers) {
                            const guildMembers = JSON.parse(fs.readFileSync('./data/guildMembers.json').toString());
                            whiteList = whiteList.concat(guildMembers);
                        }

                        const { 2: playerName } = command.split(' ');
                        if (whiteList.includes(playerName) || !config.fragBot.whitelistEnabled) {
                            fragBotQueue.push(playerName);
                            setTimeout(() => {
                                const index = fragBotQueue.indexOf(playerName);
                                if (index > -1) {
                                    fragBotQueue.splice(index, 1);
                                }
                            }, 1000 * 60); // 1 minute until timeout
                            if (fragBotQueue.length > 1) {
                                await minecraftClient.chat(
                                    `/w ${playerName} ${config.fragBot.addedToQueueMessage}`.replace('{WAIT_TIME}', (fragBotQueue.length - 1) * 7)
                                );
                            }
                            queue(minecraftClient);
                        }
                        break;
                    }
                }
            } else if (
                (msgString.includes('You left the party.') && !msgString.includes(':')) ||
                ((msgString.includes('That party has been disbanded') ||
                    msgString.includes("You don't have an invite to that player's party.") ||
                    msgString.includes('The party was disbanded')) &&
                    !msgString.includes(':'))
            ) {
                queue(minecraftClient);
            }
        }
    },
};

async function queue(minecraftClient) {
    if (isInFragParty) return;
    if (fragBotQueue.length < 1) {
        return (isInFragParty = false);
    }

    isInFragParty = true;
    const playerName = fragBotQueue[0];
    await sleep(1000);
    await minecraftClient.chat(`/p accept ${playerName}`);
    await sleep(1000);
    await minecraftClient.chat(`/pc ${config.fragBot.partyWelcomeMessage}`);
    await sleep(5000);
    const index = fragBotQueue.indexOf(playerName);
    if (index > -1) fragBotQueue.splice(index, 1);
    await minecraftClient.chat('/p leave');
    isInFragParty = false;
}

async function isValidLink(url) {
    if (url.includes('http') || url.includes('https')) {
        try {
            const res = await axios.get(url);
            if (res.status === 200) {
                return true;
            }
        } catch (e) {
            return false;
        }
    }
    return false;
}
