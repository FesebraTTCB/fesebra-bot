const tmi = require('tmi.js');
const applicationService = require('./applicationServices/character');
require('dotenv').config();

// Define configuration options
const opts = {
  identity: {
    username: 'FesebraBOT',
    password: process.env.TWITCH_IRC_OAUTH
  },
  channels: [
    'broca11'
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
async function onMessageHandler (target, context, msg, self) {
  if (self) return; 

  if (msg.startsWith('!char ')){

    const characterData = await applicationService.handleCharacterName(msg);

    if (!characterData){
      return client.say(target, "Char não encontrado.");
    }      

    client.say(target, `
      Nome do char: ${characterData.name},
      Título: ${characterData.title},
      Sexo: ${characterData.sex},
      Vocação: ${characterData.vocation},
      Level: ${characterData.level},
      Pontos Achievement: ${characterData.achievementPoints},
      Mundo: ${characterData.world},
      Residência: ${characterData.residence},
      Último login: ${characterData.lastLogin.date},
      Status da Conta: ${characterData.accountStatus},
      Status: ${characterData.status}
    `);
  }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Conectado em ${addr}:${port}`);
}