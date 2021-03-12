const characterApiService = require('../apiServices/characters');

/*
* Handle the character name to send to API
*
* @param name string
*/
const handleCharacterName = name => {
  let characterName = "";
  const characterNameSplited = name.slice(6).split(" ");

  if (characterNameSplited.length > 1){
    characterName = characterNameSplited.join("+");
  } else {
    characterName = characterNameSplited.join("");
  }

  return characterApiService.getByName(characterName)
    .then(({ data }) => {
      const character = {};

      const { characters } = data;

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
    })
    .catch(response => {
      console.log("ERROR: " + response)
    });
}


module.exports = {
  handleCharacterName,
}