const tmi = require('tmi.js');
const characterApplicationService = require('./applicationServices/character');
const guildApplicationService = require('./applicationServices/guilds');
const highscoreApplicationService = require('./applicationServices/highscores');
const worldsApplicationService = require('./applicationServices/worlds');
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
      return client.say(target, `Char não encontrado. @${context.username}`);
    }      

    client.say(
      target, 
      helperFunctions
        .formatCharacterResponseFromApi(characterData)
    );
  }

  // Busca todas as guilds de um mundo
  // if (msg.startsWith('!guilds ')){
  //   const allGuildNames = await guildApplicationService.handleGuildsByWorld(msg);

  //   if (!allGuildNames){
  //     return client.say(target, `Mundo não encontrado. @${context.username}`);  
  //   }

  //   client.say(target, `@${context.username} ${allGuildNames}`);
  // }

  // Busca uma guild específica
  if (msg.startsWith('!guild ')){
    const guildData = await guildApplicationService.handleGuildByName(msg);

    if (!guildData){
      return client.say(target, `Guild não encontrada. @${context.username}`);  
    }

    client.say(target, `@${context.username} ${guildData}`);
  }

  // Ranking de level por mundo
  if (msg.startsWith('!toplvl ')){
    const highscoresWorld = await highscoreApplicationService.handleHighscoreLevelByWorld(msg);

    if (!highscoresWorld){
      return client.say(target, `Mundo não encontrado. @${context.username}`); 
    }

    client.say(target, `@${context.username} ${highscoresWorld}`);
  }

  // Busca todos os mundos
  // if (msg.startsWith('!mundos')){
  //   const worlds = await worldsApplicationService.handleAllWorlds(msg);

  //   if (!worlds){
  //     return client.say(target, `Houve um problema, tente novamente mais tarde. @${context.username}`); 
  //   }

  //   return client.say(target, `@${context.username} ${worlds}`); 
  // }

  if (msg.startsWith('!mundo ')){
    const world = await worldsApplicationService.handleWorldByName(msg);

    if (!world){
      return client.say(target, `Mundo não encontrado. @${context.username}`); 
    }

    client.say(target, `@${context.username} ${world}`);
  }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Conectado em ${addr}:${port}`);
}