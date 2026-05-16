// Separa apenas os dados que serao usados na renderizacao e nos favoritos.
export function getCharacterData(character) {
  return {
    name: character.name,
    status: character.status,
    species: character.species,
    episodes: character.episode,
  };
}
