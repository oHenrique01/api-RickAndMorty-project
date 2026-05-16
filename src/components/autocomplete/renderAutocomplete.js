import { createAutocompleteItem } from "./createAutocompleteItem.js";

export function renderAutocomplete(characters, suggestionsList, searchInput) {
  suggestionsList.innerHTML = "";

  if (!characters || characters.length === 0) {
    suggestionsList.classList.remove("autocomplete-list-visible");
    suggestionsList.closest(".hero")?.style.removeProperty("--autocomplete-space");
    return;
  }

  const fragment = document.createDocumentFragment();
  const visibleCharacters = characters.slice(0, 6);

  visibleCharacters.forEach((character) => {
    const suggestionItem = createAutocompleteItem(character, (selectedCharacter) => {
      searchInput.value = selectedCharacter.name;
      suggestionsList.innerHTML = "";
      suggestionsList.classList.remove("autocomplete-list-visible");
      suggestionsList.closest(".hero")?.style.removeProperty("--autocomplete-space");
      searchInput.focus();
    });

    fragment.appendChild(suggestionItem);
  });

  suggestionsList
    .closest(".hero")
    ?.style.setProperty("--autocomplete-space", `${visibleCharacters.length * 46}px`);

  suggestionsList.appendChild(fragment);
  suggestionsList.classList.add("autocomplete-list-visible");
}
