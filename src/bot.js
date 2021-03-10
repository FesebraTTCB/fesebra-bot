const tmi = require('tmi.js');
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
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  client.say(target, 'TESTANDO2');
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Conectado em ${addr}:${port}`);
}