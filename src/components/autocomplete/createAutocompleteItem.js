export function createAutocompleteItem(character, onSelect) {
  const suggestionButton = document.createElement("button");
  suggestionButton.type = "button";
  suggestionButton.classList.add("autocomplete-item");
  suggestionButton.textContent = character.name;
  suggestionButton.dataset.characterId = character.id;

  suggestionButton.addEventListener("click", () => {
    onSelect(character);
  });

  return suggestionButton;
}
