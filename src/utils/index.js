const firstLetterUppercased = word => 
  (word.charAt(0).toUpperCase() + word.substring(1).trim());

const formatCharacterResponseFromApi = character => 
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
    Status: ${character.status}.
  `;

const formatGuildResponseFromApi = guild => 
  `
    Nome: ${capitalizeFirstLetterEachWord(guild.name)},
    Aceitando membros? ${guild.application ? 'Sim' : 'Não'},
    Em guerra? ${guild.war ? 'Sim' : 'Não'},
    Membros online: ${guild.online_status},
    Total membros: ${guild.totalmembers},
    Mundo: ${guild.world},
    Data de criação: ${formatDateToPtbr(guild.founded)},
    Status: ${guild.active ? 'Ativa' : 'Desativada'}.
  `;

const formatHighscoreLevelByWorldResponseFromApi = highscore => 
  `
    Rank: ${highscore.rank},
    Nome: ${highscore.name},
    Vocação: ${highscore.vocation},
    Level: ${highscore.level}.
    //
  `;

const formatWorldsResponseFromApi = world => 
  `
    Nome: ${world.name},
    Jogadores online: ${world.online},
    Localização: ${world.location},
    Tipo: ${world.worldtype}.
    //
  `;

const formatWorldResponseFromApi = world => 
  `
    Nome: ${world.name},
    Jogadores online: ${world.players_online},
    Recorde jogadores online: ${world.online_record.players},
    Localização: ${world.location},
    Tipo: ${world.pvp_type}.
  `

const formatDateToPtbr = date => {
  const dateObj = new Date(date);
	const timezoneOffset = dateObj.getTimezoneOffset();

	return new Date(dateObj.getTime() + timezoneOffset * 60 * 1000).toLocaleDateString();
}

const capitalizeFirstLetterEachWord = sentence => {
  const words = sentence.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  return words.join(" ");
}

module.exports = {
  firstLetterUppercased,
  formatCharacterResponseFromApi,
  formatGuildResponseFromApi,
  formatDateToPtbr,
  capitalizeFirstLetterEachWord,
  formatHighscoreLevelByWorldResponseFromApi,
  formatWorldsResponseFromApi,
  formatWorldResponseFromApi,
}