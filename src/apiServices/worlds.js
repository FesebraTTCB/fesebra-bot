const api = require('./axios');

/*
* Retrieve all worlds in the game
*
* @param void
*/
const getAllWorlds = () => api.get(`worlds.json`);

/*
* Retrieve a single world
*
* @param world string
*/
const getWorldByName = world => api.get(`world/${world}.json`);

module.exports = {
  getAllWorlds,
  getWorldByName,
}