const api = require('./axios');

/*
* Retrieve all guilds in a given world
*
* @param name string
*/
const getGuildsByWorld = (world) => api.get(`guilds/${world}.json`);

module.exports = {
  getGuildsByWorld
}