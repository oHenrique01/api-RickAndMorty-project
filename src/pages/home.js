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
  const input = document.getElementById("characterId");
  const form = document.querySelector("form");
  const btnSearch = document.getElementById("btn-go");
  const checkFav = document.getElementById("favorite-character");
  const favoriteMessage = document.getElementById("favorite-message");
  const img = document.getElementById("img");
  const tabButtons = document.querySelectorAll(".tab-btn");

  setupAutocomplete();

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      switchTab(btn.dataset.tab);
    });
  });

  checkFav.addEventListener("change", async () => {
    const val = validateCharacterId(input.value);

    if (!val) {
      checkFav.checked = false;
      showFavoriteMessage(favoriteMessage, "Informe um ID valido antes de favoritar.", "warning");
      input.focus();
      return;
    }

    if (checkFav.checked) {
      try {
        const character = await fetchApi(val);
        const characterData = getCharacterData(character);

        saveFavorite(characterData);
        showFavoriteMessage(favoriteMessage, `${characterData.name} foi salvo nos favoritos.`);
      } catch (error) {
        checkFav.checked = false;
        showFavoriteMessage(favoriteMessage, error.message || "Nao foi possivel salvar o favorito.", "warning");
      }

      return;
    }

    removeFavorite();
    showFavoriteMessage(favoriteMessage, "Personagem removido dos favoritos.", "removed");
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const valName = validateCharacterName(input.value);
    const valId = validateCharacterId(input.value);

    if (!valName && !valId) {
      showError("Digite um nome valido ou um ID entre 1 e 826.");
      return;
    }

    resetTabs();
    img.classList.remove("loaded");
    img.src = "";
    img.alt = "";
    hideFavoriteButton();

    btnSearch.disabled = true;
    btnSearch.textContent = "Buscando...";

    try {
      let result = valId ? await fetchApi(valId) : await fetchNameApi(valName);

      if (valName && result.results) {
        result = result.results[0];
      }

      const data = getCharacterData(result);

      renderCharacter(result);
      populateTabs(result, data);
      showFavoriteButton();
      switchTab("profile");
    } catch (error) {
      showError(error.message || "Erro ao buscar personagem. Verifique o ID e tente novamente.");
    } finally {
      btnSearch.disabled = false;
      btnSearch.textContent = "Buscar";
    }
  });
}
