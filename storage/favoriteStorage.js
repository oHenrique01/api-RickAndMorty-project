// Salva o personagem favorito no navegador.
export function saveFavorite(characterData) {
  localStorage.setItem("character", JSON.stringify(characterData));
}

// Remove o personagem favorito salvo no navegador.
export function removeFavorite() {
  localStorage.removeItem("character");
}
