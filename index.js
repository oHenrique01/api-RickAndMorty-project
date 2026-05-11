import { fetchApi } from "./api/fetchApi.js";
import { showFavoriteMessage } from "./components/showFavoriteMessage.js";
import { removeFavorite, saveFavorite } from "./storage/favoriteStorage.js";
import { getCharacterData } from "./utils/getCharacterData.js";
import { validateCharacterId } from "./utils/validateCharacterId.js";

const input = document.getElementById("characterId");
const form = document.querySelector("form");
const btnSearch = document.getElementById("btn-go");
const checkFav = document.getElementById("favorite-character");
const btnFav = document.querySelector(".favorite-button");
const favoriteMessage = document.getElementById("favorite-message");
const img = document.getElementById("img");
const characterName = document.getElementById("character-name");
const characterSpecies = document.getElementById("character-species");

// Tab elements
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

function hideFavoriteButton() {
  checkFav.checked = false;
  checkFav.classList.add("favorite-hidden");
  btnFav.classList.add("favorite-hidden");
}

function showFavoriteButton() {
  checkFav.classList.remove("favorite-hidden");
  btnFav.classList.remove("favorite-hidden");
}

// Gerenciador de abas
function switchTab(tabName) {
  tabButtons.forEach(btn => btn.classList.remove("active"));
  tabContents.forEach(tab => tab.classList.remove("active"));

  document.querySelector(`[data-tab="${tabName}"]`).classList.add("active");
  document.getElementById(`${tabName}-tab`).classList.add("active");
}

tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    switchTab(btn.dataset.tab);
  });
});

// Popula as abas com os dados do personagem
function populateTabs(character, data) {
  // Perfil Tab
  document.getElementById("profile-status").textContent = data.status;
  document.getElementById("profile-type").textContent = character.type || "Desconhecido";
  document.getElementById("profile-location").textContent = character.location?.name || "Desconhecido";
  document.getElementById("profile-origin").textContent = character.origin?.name || "Desconhecido";

  document.querySelector(".profile-content").classList.remove("hidden-init");
  document.querySelector("#profile-tab .empty-state").style.display = "none";

  // Episodes Tab
  const episodesList = document.getElementById("episodes-list");
  episodesList.innerHTML = "";
  data.episodes.forEach((episodeUrl) => {
    const episodeNumber = episodeUrl.split("/").pop();
    const li = document.createElement("li");
    li.textContent = `EP ${episodeNumber}`;
    episodesList.appendChild(li);
  });
  document.querySelector(".episodes-content").classList.remove("hidden-init");
  document.querySelector("#episodes-tab .empty-state").style.display = "none";

  // Details Tab
  document.getElementById("detail-gender").textContent = character.gender;
  document.getElementById("detail-species").textContent = character.species;
  document.getElementById("detail-episodes").textContent = data.episodes.length;
  const created = new Date(character.created).toLocaleDateString("pt-BR");
  document.getElementById("detail-created").textContent = created;
  document.querySelector(".details-content").classList.remove("hidden-init");
  document.querySelector("#details-tab .empty-state").style.display = "none";
}

function resetTabs() {
  tabContents.forEach(tab => tab.classList.remove("active"));
  document.getElementById("profile-tab").classList.add("active");
  tabButtons.forEach(btn => btn.classList.remove("active"));
  tabButtons[0].classList.add("active");

  // Reset profile
  document.querySelector(".profile-content").classList.add("hidden-init");
  document.querySelector("#profile-tab .empty-state").style.display = "grid";

  // Reset episodes
  document.getElementById("episodes-list").innerHTML = "";
  document.querySelector(".episodes-content").classList.add("hidden-init");
  document.querySelector("#episodes-tab .empty-state").style.display = "grid";

  // Reset details
  document.querySelector(".details-content").classList.add("hidden-init");
  document.querySelector("#details-tab .empty-state").style.display = "grid";
}

// Exibe uma mensagem de erro no painel de resultado e limpa a imagem atual.
function showError(message) {
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

  resetTabs();
  img.classList.remove("loaded");
  img.src = "";
  img.alt = "";
  hideFavoriteButton();

  btnSearch.disabled = true;
  btnSearch.textContent = "Buscando...";

  try {
    const result = await fetchApi(val);
    const data = getCharacterData(result);

    // Update header
    img.src = result.image;
    img.alt = `Imagem de ${result.name}`;
    img.classList.add("loaded");

    characterName.textContent = result.name;
    characterSpecies.textContent = `${result.species} - ${result.gender}`;

    // Populate tabs with character data
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
