const api = require('./axios');

/*
* Get character information by name
*
* @param name string
*/
const getByName = async (name) => await api.get(`characters/${name}.json`);

module.exports = {
  getByName
}