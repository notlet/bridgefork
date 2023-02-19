const Canvas = require('canvas');
const config = require('../config.json');
Canvas.registerFont('./fonts/MinecraftRegular-Bmg3.ttf', { family: 'Minecraft' });
Canvas.registerFont('./fonts/unifont.ttf', { family: 'MinecraftUnicode' });

const RGBA_COLOR = {
    0: 'rgba(0,0,0,1)',
    1: 'rgba(0,0,170,1)',
    2: 'rgba(0,170,0,1)',
    3: 'rgba(0,170,170,1)',
    4: 'rgba(170,0,0,1)',
    5: 'rgba(170,0,170,1)',
    6: 'rgba(255,170,0,1)',
    7: 'rgba(170,170,170,1)',
    8: 'rgba(85,85,85,1)',
    9: 'rgba(85,85,255,1)',
    a: 'rgba(85,255,85,1)',
    b: 'rgba(85,255,255,1)',
    c: 'rgba(255,85,85,1)',
    d: 'rgba(255,85,255,1)',
    e: 'rgba(255,255,85,1)',
    f: 'rgba(255,255,255,1)',
};

const multiplier = config?.options?.imageSizeMultiplier || 1;

function getHeight(message) {
    const canvas = Canvas.createCanvas(1, 1);
    const ctx = canvas.getContext('2d');
    const splitMessageSpace = message.split(' ');
    for (const [i, msg] of Object.entries(splitMessageSpace)) {
        if (!msg.startsWith('§')) splitMessageSpace[i] = `§r${msg}`;
    }
    const splitMessage = splitMessageSpace.join(' ').split(/§|\n/g);
    splitMessage.shift();
    ctx.font = `${(40 * multiplier).toFixed()}px Minecraft, MinecraftUnicode`;

    let width = 5;
    let height = 35 * multiplier;

    for (const msg of splitMessage) {
        const currentMessage = msg.substring(1);
        if (width + ctx.measureText(currentMessage).width > 1000 || msg.charAt(0) === 'n') {
            width = 5;
            height += 40 * multiplier;
        }
        width += ctx.measureText(currentMessage).width;
    }
    if (width == 5) height -= 40 * multiplier;

    return height + (10 * multiplier);
}

function generateMessageImage(message) {
    const canvasHeight = getHeight(message);
    const canvas = Canvas.createCanvas(1000, canvasHeight);
    const ctx = canvas.getContext('2d');
    const splitMessageSpace = message.split(' ');
    for (const [i, msg] of Object.entries(splitMessageSpace)) {
        if (!msg.startsWith('§')) splitMessageSpace[i] = `§r${msg}`;
    }
    const splitMessage = splitMessageSpace.join(' ').split(/§|\n/g);
    splitMessage.shift();
    ctx.shadowOffsetX = 4 * multiplier;
    ctx.shadowOffsetY = 4 * multiplier;
    ctx.shadowColor = '#131313';
    ctx.font = `${(40 * multiplier).toFixed()}px Minecraft, MinecraftUnicode`;

    let width = 5;
    let height = 35 * multiplier;
    for (const msg of splitMessage) {
        const colorCode = RGBA_COLOR[msg.charAt(0)];
        const currentMessage = msg.substring(1);
        if (width + ctx.measureText(currentMessage).width > 1000 || msg.charAt(0) === 'n') {
            width = 5;
            height += 40 * multiplier;
        }
        if (colorCode) {
            ctx.fillStyle = colorCode;
        }
        ctx.fillText(currentMessage, width, height);
        width += ctx.measureText(currentMessage).width;
    }
    return canvas.toBuffer();
}

module.exports = generateMessageImage;
