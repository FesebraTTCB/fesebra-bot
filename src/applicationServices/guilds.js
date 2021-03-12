const guildApiService = require('../apiServices/guilds');

/*
* Handle the guild name to send it to API 
* and format the response to the correct form 
* to send back to bot
*
* @param guild string
*/
const handleGuildsByWorld = (world) => {
  let worldName = world.slice(8);

  return guildApiService.getGuildsByWorld(worldName)
    .then(({ data }) => {
      const guilds = [];
      const activeGuilds = data.guilds.active;

      for (let i = 0; i < activeGuilds.length; ++i){
        guilds.push(activeGuilds[i].name);
      }

      return guilds.toString();
    })
    .catch(({ response }) => {
      console.log("ERROR: " + response)
      return false;
    });;
}

module.exports = {
  handleGuildsByWorld,
}