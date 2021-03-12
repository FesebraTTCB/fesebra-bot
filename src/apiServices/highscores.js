const api = require('./axios');

/*
* Get the highscore level by world
*
* @param world string
*/
const getHighscoreLevelByWorld = world => api.get(`highscores/${world}.json`);

module.exports = {
  getHighscoreLevelByWorld,
}