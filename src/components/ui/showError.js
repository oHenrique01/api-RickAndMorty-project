import { resetTabs } from "../tabs/resetTabs.js";
import { hideFavoriteButton } from "./favoriteButton.js";

export function showError(message) {
  const img = document.getElementById("img");
  const characterName = document.getElementById("character-name");
  const characterSpecies = document.getElementById("character-species");

  img.src = "";
  img.alt = "Erro ao carregar imagem";
  img.classList.remove("loaded");
  hideFavoriteButton();
  resetTabs();

  characterName.textContent = "Pronto para buscar";
  characterSpecies.textContent = "";

  const profileEmpty = document.querySelector("#profile-tab .empty-state");

  if (profileEmpty) {
    profileEmpty.querySelector(".empty-kicker").textContent = "Ops";
    profileEmpty.querySelector("p").textContent = message;
    profileEmpty.querySelector("strong").textContent = "Tente novamente.";
  }
}
