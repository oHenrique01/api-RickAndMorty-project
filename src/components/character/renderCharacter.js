export function renderCharacter(character) {
  const img = document.getElementById("img");
  const characterName = document.getElementById("character-name");
  const characterSpecies = document.getElementById("character-species");

  img.src = character.image;
  img.alt = `Imagem de ${character.name}`;
  img.classList.add("loaded");

  characterName.textContent = character.name;
  characterSpecies.textContent = `${character.species} - ${character.gender}`;
}
