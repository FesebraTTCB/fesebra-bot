const guildApiService = require('../apiServices/guilds');
const helperFunctions = require('../utils');

/*
* Handle the world name to send it to API 
* and format the response to the correct form 
* to send back to bot
*
* @param world string
*/
const handleGuildsByWorld = (world) => {
  let worldName = world.slice(8).trim();

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

/*
* Handle the guild name to send it to API 
* and format the response to the correct form 
* to send back to bot
*
* @param guild string
*/
const handleGuildByName = (guild) => {
  const guildName = guild.slice(7).trim();

  return guildApiService.getGuildByName(guildName)
    .then(({ data }) => {
      const guild = data.guild.data;
    
      return helperFunctions.formatGuildResponseFromApi(guild)
    })
    .catch(response => {
      console.log("ERROR: " + response)
      return false;
    });;
}

module.exports = {
  handleGuildsByWorld,
  handleGuildByName
}