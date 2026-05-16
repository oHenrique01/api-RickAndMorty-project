export function hideFavoriteButton() {
  const checkFav = document.getElementById("favorite-character");
  const btnFav = document.querySelector(".favorite-button");

  checkFav.checked = false;
  checkFav.classList.add("favorite-hidden");
  btnFav.classList.add("favorite-hidden");
}

export function showFavoriteButton() {
  document.getElementById("favorite-character").classList.remove("favorite-hidden");
  document.querySelector(".favorite-button").classList.remove("favorite-hidden");
}
