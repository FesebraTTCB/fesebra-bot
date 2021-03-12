const tmi = require('tmi.js');
const characterApplicationService = require('./applicationServices/character');
const guildApplicationService = require('./applicationServices/guilds');
const helperFunctions = require('./utils');
const AC = require('../config');
require('dotenv').config();

// Define configuration options
const opts = {
  connection: {
		reconnect: true,
		secure: true
	},
  identity: {
    username: 'fesebrabot',
    password: process.env.TWITCH_IRC_OAUTH
  },
  channels: AC.AC
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

  // Busca por char
  if (msg.startsWith('!char ')){
    const characterData = await characterApplicationService.handleCharacterName(msg);

    if (!characterData){
      return client.say(target, `@${context.username} "Char não encontrado."`);
    }      

    client.say(
      target, 
      helperFunctions
        .formatCharacterResponseFromApi(characterData)
    );
  }

  // Busca todas as guilds de um mundo
  if (msg.startsWith('!guilds ')){
    const allGuildNames = await guildApplicationService.handleGuildsByWorld(msg);

    if (!allGuildNames){
      client.say(target, `@${context.username} Mundo não encontrado.`);  
    }

    client.say(target, `@${context.username} ${allGuildNames}`);
  }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Conectado em ${addr}:${port}`);
}