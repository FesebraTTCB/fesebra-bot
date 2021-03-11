const tmi = require('tmi.js');
const applicationService = require('./applicationServices/character');
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

  if (msg.startsWith('!char ')){

    const characterData = await applicationService.handleCharacterName(msg);

    if (!characterData){
      return client.say(target, `@${context.username} "Char não encontrado."`);
    }      

    client.say(
      target, 
      helperFunctions
        .formatCharacterResponseFromApi(characterData)
    );
  }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Conectado em ${addr}:${port}`);
}

/*
* Return all the commands available
*
* @param world string
*/
const helpCommand = async () => (
  '!char <nome do char> => Pesquisa algumas informações do char'
)