import { getCharacterData } from "../utils/getCharacterData.js";

// Monta o card com as informacoes do personagem retornado pela API.
export function createCard(character) {
  const card = document.createElement("article");
  card.className = "character-card";

  const data = getCharacterData(character);

  const header = document.createElement("div");
  header.className = "card-header";

  const statusChip = document.createElement("span");
  statusChip.className = `chip status-${data.status.toLowerCase().replace(/[^a-z]/g, "")}`;
  statusChip.textContent = data.status;

  const name = document.createElement("h2");
  name.textContent = data.name;

  const subtitle = document.createElement("p");
  subtitle.className = "subtitle";
  subtitle.textContent = `${data.species} - ${character.gender}`;

  header.append(statusChip, name, subtitle);

  const locationDiv = document.createElement("div");
  locationDiv.className = "location";

  const locationLabel = document.createElement("span");
  locationLabel.textContent = "Localizacao";

  const locationName = document.createElement("strong");
  locationName.textContent = character.location.name;

  locationDiv.append(locationLabel, locationName);

  const episodeList = document.createElement("div");
  episodeList.className = "episode-list";

  const episodeTitle = document.createElement("h3");
  episodeTitle.textContent = "Episodios";

  const episodeUl = document.createElement("ul");

  data.episodes.slice(0, 10).forEach((episodeUrl) => {
    const li = document.createElement("li");
    const episodeNumber = episodeUrl.split("/").pop();
    li.textContent = `EP ${episodeNumber}`;
    episodeUl.appendChild(li);
  });

  episodeList.append(episodeTitle, episodeUl);
  card.append(header, locationDiv, episodeList);

  return card;
}
