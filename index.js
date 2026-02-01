const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});

const myEmojis = ['🥰', '😍', '❤️‍🔥', '💥', '💘', '💝', '❤️', '💞', '💯', '💜', '🔥'];

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
    console.log('--- SCAN QR CODE MPYA HAPA ---');
});

client.on('ready', () => {
    console.log('StatusTurboBot: IKO ONLINE SASA!');
});

client.on('message_create', async (msg) => {
    if (msg.from === 'status@broadcast') {
        try {
            // View status
            await client.sendSeen(msg.from);
            
            // Like na Random Emoji
            const pickEmoji = myEmojis[Math.floor(Math.random() * myEmojis.length)];
            await msg.react(pickEmoji);
            
            console.log('Turbo Action: Viewed & Reacted!');
        } catch (err) {
            // Skip errors
        }
    }
});

client.initialize();