export function createAutocompleteItem(character, onSelect) {
  const item = document.createElement("button");
  item.type = "button";
  item.classList.add("autocomplete-item");
  item.textContent = character.name;
  item.dataset.characterId = character.id;

  item.addEventListener("click", () => {
    onSelect(character);
  });

  return item;
}
