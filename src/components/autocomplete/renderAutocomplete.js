import { createAutocompleteItem } from "./createAutocompleteItem.js";

export function renderAutocomplete(characters, autocompleteList, input) {
  autocompleteList.innerHTML = "";

  if (!characters || characters.length === 0) {
    autocompleteList.classList.remove("autocomplete-list-visible");
    autocompleteList.closest(".hero")?.style.removeProperty("--autocomplete-space");
    return;
  }

  const fragment = document.createDocumentFragment();
  const visibleCharacters = characters.slice(0, 6);

  visibleCharacters.forEach((character) => {
    const item = createAutocompleteItem(character, (selectedCharacter) => {
      input.value = selectedCharacter.name;
      autocompleteList.innerHTML = "";
      autocompleteList.classList.remove("autocomplete-list-visible");
      autocompleteList.closest(".hero")?.style.removeProperty("--autocomplete-space");
      input.focus();
    });

    fragment.appendChild(item);
  });

  autocompleteList
    .closest(".hero")
    ?.style.setProperty("--autocomplete-space", `${visibleCharacters.length * 46}px`);

  autocompleteList.appendChild(fragment);
  autocompleteList.classList.add("autocomplete-list-visible");
}
