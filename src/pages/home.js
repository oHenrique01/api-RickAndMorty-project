import { fetchApi } from "../api/fetchApi.js";
import { fetchNameApi } from "../api/fetchNameApi.js";
import { populateTabs } from "../components/tabs/populateTabs.js";
import { resetTabs } from "../components/tabs/resetTabs.js";
import { switchTab } from "../components/tabs/switchTab.js";
import { renderCharacter } from "../components/character/renderCharacter.js";
import { hideFavoriteButton, showFavoriteButton } from "../components/ui/favoriteButton.js";
import { setupAutocomplete } from "../components/autocomplete/setupAutocomplete.js";
import { showError } from "../components/ui/showError.js";
import { showFavoriteMessage } from "../components/ui/showFavoriteMessage.js";
import { removeFavorite, saveFavorite } from "../storage/favoriteStorage.js";
import { getCharacterData } from "../utils/getCharacterData.js";
import { validateCharacterId } from "../utils/validateCharacterId.js";
import { validateCharacterName } from "../utils/validateCharacterName.js";

export function initHomePage() {
  const searchInput = document.getElementById("characterId");
  const searchForm = document.querySelector("form");
  const searchButton = document.getElementById("btn-go");
  const favoriteCheckbox = document.getElementById("favorite-character");
  const favoriteMessage = document.getElementById("favorite-message");
  const characterImage = document.getElementById("img");
  const tabButtons = document.querySelectorAll(".tab-btn");
  let currentCharacterData = null;

  setupAutocomplete();

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      switchTab(btn.dataset.tab);
    });
  });

  searchInput.addEventListener("input", () => {
    currentCharacterData = null;
    favoriteCheckbox.checked = false;
    hideFavoriteButton();
  });

  favoriteCheckbox.addEventListener("change", async () => {
    const characterId = validateCharacterId(searchInput.value);

    if (!characterId && !currentCharacterData) {
      favoriteCheckbox.checked = false;
      showFavoriteMessage(favoriteMessage, "Busque um personagem antes de favoritar.", "warning");
      searchInput.focus();
      return;
    }

    if (favoriteCheckbox.checked) {
      try {
        const characterData = currentCharacterData || getCharacterData(await fetchApi(characterId));

        saveFavorite(characterData);
        showFavoriteMessage(favoriteMessage, `${characterData.name} foi salvo nos favoritos.`);
      } catch (error) {
        favoriteCheckbox.checked = false;
        showFavoriteMessage(favoriteMessage, error.message || "Nao foi possivel salvar o favorito.", "warning");
      }

      return;
    }

    removeFavorite();
    showFavoriteMessage(favoriteMessage, "Personagem removido dos favoritos.", "removed");
  });

  searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const characterName = validateCharacterName(searchInput.value);
    const characterId = validateCharacterId(searchInput.value);

    if (!characterName && !characterId) {
      showError("Digite um nome valido ou um ID entre 1 e 826.");
      return;
    }

    currentCharacterData = null;
    favoriteCheckbox.checked = false;
    resetTabs();
    characterImage.classList.remove("loaded");
    characterImage.src = "";
    characterImage.alt = "";
    hideFavoriteButton();

    searchButton.disabled = true;
    searchButton.textContent = "Buscando...";

    try {
      let characterResponse = characterId ? await fetchApi(characterId) : await fetchNameApi(characterName);

      if (characterName && characterResponse.results) {
        characterResponse = characterResponse.results[0];
      }

      currentCharacterData = getCharacterData(characterResponse);

      renderCharacter(characterResponse);
      populateTabs(characterResponse, currentCharacterData);
      showFavoriteButton();
      switchTab("profile");
    } catch (error) {
      showError(error.message || "Erro ao buscar personagem. Verifique o ID e tente novamente.");
    } finally {
      searchButton.disabled = false;
      searchButton.textContent = "Buscar";
    }
  });
}
