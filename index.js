const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        executablePath: '/usr/bin/google-chrome'
    }
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('QR CODE IMEFIKA! Scan sasa hivi:');
});

client.on('ready', () => {
    console.log('Boti imewaka! Client is ready!');
});

client.on('message', async (msg) => {
    if (msg.body === '!ping') {
        msg.reply('pong');
    }
});

client.initialize();
