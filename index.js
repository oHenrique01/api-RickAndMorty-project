import { fetchApi } from "./api/fetchApi.js";
import { createCard } from "./components/createCard.js";
import { showFavoriteMessage } from "./components/showFavoriteMessage.js";
import { removeFavorite, saveFavorite } from "./storage/favoriteStorage.js";
import { getCharacterData } from "./utils/getCharacterData.js";
import { validateCharacterId } from "./utils/validateCharacterId.js";

const input = document.getElementById("characterId");
const content = document.getElementById("content");
const form = document.querySelector("form");
const btnSearch = document.getElementById("btn-go");
const checkFav = document.getElementById("favorite-character");
const btnFav = document.querySelector(".favorite-button");
const favoriteMessage = document.getElementById("favorite-message");
const img = document.getElementById("img");

function hideFavoriteButton() {
  checkFav.checked = false;
  checkFav.classList.add("favorite-hidden");
  btnFav.classList.add("favorite-hidden");
}

function showFavoriteButton() {
  checkFav.classList.remove("favorite-hidden");
  btnFav.classList.remove("favorite-hidden");
}

// Exibe uma mensagem de erro no painel de resultado e limpa a imagem atual.
function showError(message) {
  img.src = "";
  img.alt = "Erro ao carregar imagem";
  img.classList.remove("loaded");
  hideFavoriteButton();
  content.innerHTML = `<div class="empty-state"><span class="empty-kicker">Ops</span><p>${message}</p></div>`;
}

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
  } else {
    removeFavorite();
    showFavoriteMessage(favoriteMessage, "Personagem removido dos favoritos.", "removed");
  }
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const val = validateCharacterId(input.value);
  if (!val) {
    showError("Digite um ID valido entre 1 e 826.");
    return;
  }

  content.innerHTML = "";
  img.classList.remove("loaded");
  img.src = "";
  img.alt = "";
  hideFavoriteButton();

  const loading = document.createElement("p");
  loading.className = "loading";
  loading.textContent = "Buscando personagem...";
  content.appendChild(loading);

  btnSearch.disabled = true;
  btnSearch.textContent = "Buscando...";

  try {
    const result = await fetchApi(val);

    img.src = result.image;
    img.alt = `Imagem de ${result.name}`;
    img.classList.add("loaded");

    const card = createCard(result);
    loading.remove();
    content.appendChild(card);
    showFavoriteButton();

  } catch (error) {
    showError(error.message || "Erro ao buscar personagem. Verifique o ID e tente novamente.");

  } finally {
    btnSearch.disabled = false;
    btnSearch.textContent = "Buscar";
  }
});
