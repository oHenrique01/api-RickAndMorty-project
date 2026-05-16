import { renderEpisodes } from "../character/renderEpisodes.js";

export function populateTabs(character, data) {
  document.getElementById("profile-status").textContent = data.status;
  document.getElementById("profile-type").textContent = character.type || "Desconhecido";
  document.getElementById("profile-location").textContent = character.location?.name || "Desconhecido";
  document.getElementById("profile-origin").textContent = character.origin?.name || "Desconhecido";

  document.querySelector(".profile-content").classList.remove("hidden-init");
  document.querySelector("#profile-tab .empty-state").style.display = "none";

  renderEpisodes(data.episodes);
  document.querySelector(".episodes-content").classList.remove("hidden-init");
  document.querySelector("#episodes-tab .empty-state").style.display = "none";

  document.getElementById("detail-gender").textContent = character.gender;
  document.getElementById("detail-species").textContent = character.species;
  document.getElementById("detail-episodes").textContent = data.episodes.length;
  document.getElementById("detail-created").textContent = new Date(character.created).toLocaleDateString("pt-BR");

  document.querySelector(".details-content").classList.remove("hidden-init");
  document.querySelector("#details-tab .empty-state").style.display = "none";
}
