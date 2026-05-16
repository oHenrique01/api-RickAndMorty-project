let messageTimer;

// Mostra um aviso temporario quando o favorito e salvo, removido ou invalido.
export function showFavoriteMessage(favoriteMessage, message, type = "success") {
  clearTimeout(messageTimer);

  favoriteMessage.textContent = message;
  favoriteMessage.className = `favorite-message ${type} show`;

  messageTimer = setTimeout(() => {
    favoriteMessage.classList.remove("show");
  }, 2600);
}
