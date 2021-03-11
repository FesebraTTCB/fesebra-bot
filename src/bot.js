const tmi = require('tmi.js');
const applicationService = require('./applicationServices/character');
const AC = require('../config');
require('dotenv').config();

// Define configuration options
const opts = {
  connection: {
		reconnect: true,
		secure: true
	},
  identity: {
    username: 'FesebraBOT',
    password: process.env.TWITCH_IRC_OAUTH
  },
  channels: AC.ALLOWED_CHANNELS
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
      return client.say(target, `@${context.username} "Char não encontrado."`);
    }      

    client.say(target, `@${context.username}
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