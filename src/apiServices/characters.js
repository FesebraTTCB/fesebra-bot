const api = require('./axios');

/*
* Get character information by name
*
* @param name string
*/
const getByName = async (name) => {
  const character = {};

  try {
    const response = await api.get(
      `characters/${name}.json`
    );
  
    const { characters } = response.data;

    if (characters.error) return false;
  
    character.name = characters.data.name;
    character.title = characters.data.title;
    character.sex = characters.data.sex;
    character.vocation = characters.data.vocation;
    character.level = characters.data.level;
    character.achievementPoints = characters.data.achievement_points;
    character.world = characters.data.world;
    character.residence = characters.data.residence;
    character.lastLogin = characters.data.last_login;
    character.accountStatus = characters.data.account_status;
    character.status = characters.data.status;
    character.achievements = characters.achievements;
    character.deaths = characters.deaths;
    character.accountInformation = characters.account_information;
  
    return character;

  } catch (error) {
    console.log("Error: " + error);
    return false;
  }
}

module.exports = {
  getByName
}