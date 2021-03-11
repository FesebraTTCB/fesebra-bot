const characterApiService = require('../apiServices/characters');

/*
* Handle the character name to send to API
*
* @param name string
*/
const handleCharacterName = async (name) => {
  let characterName = "";
  const characterNameSplited = name.slice(6).split(" ");

  if (characterNameSplited.length > 1){
    characterName = characterNameSplited.join("+");
  } else {
    characterName = characterNameSplited.join("");
  }

  return characterApiService.getByName(characterName);
}

module.exports = {
  handleCharacterName,
}