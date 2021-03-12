const firstLetterUppercased = (word) => (word.charAt(0).toUpperCase() + word.substring(1).trim());

const formatCharacterResponseFromApi = (character) => 
  `
    Nome do char: ${character.name},
    Título: ${character.title},
    Sexo: ${character.sex},
    Vocação: ${character.vocation},
    Level: ${character.level},
    Pontos Achievement: ${character.achievementPoints},
    Mundo: ${character.world},
    Residência: ${character.residence},
    Status da Conta: ${character.accountStatus},
    Status: ${character.status}
  `

module.exports = {
  firstLetterUppercased,
  formatCharacterResponseFromApi,
}