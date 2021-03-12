const worldsApiService = require('../apiServices/worlds');
const helperFunctions = require('../utils');
require('dotenv').config();

/*
* Handle the world name to send it to API 
* and format the response to the correct form 
* to send back to bot
*
* @param world string
*/
const handleAllWorlds = () => 
  worldsApiService.getAllWorlds()
    .then(({ data }) => {
      const allWorlds = data.worlds.allworlds
      const formatedWorlds = [];

      for (let i = 0; i < allWorlds.length; ++i){
        formatedWorlds.push(helperFunctions.formatWorldsResponseFromApi(allWorlds[i]));
      }

      return formatedWorlds.toString();
    })
    .catch(response => {
      console.log("ERROR: " + response);
      return false;
    })

const handleWorldByName = world => {
  const worldName = world.slice(7).trim();

  return worldsApiService.getWorldByName(worldName)
    .then(({ data }) => {
      const world = data.world.world_information;

      return helperFunctions.formatWorldResponseFromApi(world);
    })
    .catch(response => {
      console.log("ERROR: " + response);
      return false;
    })
}

module.exports = {
  handleAllWorlds,
  handleWorldByName
}