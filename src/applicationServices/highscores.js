const highscoreApiService = require('../apiServices/highscores');
const helperFunctions = require('../utils');
require('dotenv').config();

/*
* Handle the world name to send it to API 
* and format the response to the correct form 
* to send back to bot
*
* @param world string
*/
const handleHighscoreLevelByWorld = world => {
  let worldName = world.slice(8).trim();

  return highscoreApiService.getHighscoreLevelByWorld(worldName)
    .then(({ data }) => {
      const LIMIT = process.env.LIMIT_HIGHSCORE_LVL_PLAYERS_BY_WORLD-1;
      const levelHighscoresPlayers = [];
      const topLevels = [];

      for (let i = 0; i <= LIMIT; ++i){
        levelHighscoresPlayers.push(data.highscores.data[i]);
      }

      for (let i = 0; i < levelHighscoresPlayers.length; ++i){
        topLevels
          .push(
            helperFunctions
              .formatHighscoreLevelByWorldResponseFromApi(
                levelHighscoresPlayers[i]
              )
          );
      }

      return topLevels.toString();
    })
    .catch(response => {
      console.log("ERROR: " + response);
      return false;
    });
}

module.exports = {
  handleHighscoreLevelByWorld,
}