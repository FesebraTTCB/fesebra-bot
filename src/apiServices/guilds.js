const api = require('./axios');

/*
* Retrieve all guilds in a given world
*
* @param name string
*/
const getGuildsByWorld = (world) => api.get(`guilds/${world}.json`);

/*
* Retrieve a single guild by its name
*
* @param name string
*/
const getGuildByName = (guild) => api.get(`guild/${guild}.json`);

module.exports = {
  getGuildsByWorld,
  getGuildByName,
}