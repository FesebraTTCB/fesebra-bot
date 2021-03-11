const api = require('./services/axios');
const helperFunctions = require('./utils');

/*
* Anything related to Highscores
*
* @param world string
*/
const getHighscores = async (world) => {
  const data = {
    world: "",
    highscores: []
  }

  const response = await api.get(
    `highscores/
    ${helperFunctions.firstLetterUppercased(world)}.json`
  );

  const { highscores } = response.data;

  data.world = highscores.filters.world;
  data.highscores = highscores.data

  return data;
}



module.exports = {
  getHighscores
}