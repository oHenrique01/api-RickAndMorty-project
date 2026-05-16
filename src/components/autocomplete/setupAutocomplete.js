import { fetchNameApi } from "../../api/fetchNameApi.js";
import { debounce } from "../../utils/debouce.js";
import { renderAutocomplete } from "./renderAutocomplete.js";

export function setupAutocomplete() {
    const searchInput = document.getElementById("characterId");

    const suggestionsList = document.createElement("div");
    suggestionsList.classList.add("autocomplete-list");

    searchInput.parentElement.appendChild(suggestionsList);

    const hideAutocomplete = () => {
        suggestionsList.innerHTML = "";
        suggestionsList.classList.remove("autocomplete-list-visible");
        suggestionsList.closest(".hero")?.style.removeProperty("--autocomplete-space");
    };

    const handleAutocomplete = debounce(async () => {
        const searchQuery = searchInput.value.trim();

        if (searchQuery.length < 2) {
            hideAutocomplete();
            return;
        }

        try {
            const characterResults = await fetchNameApi(searchQuery);
            renderAutocomplete(characterResults.results, suggestionsList, searchInput);
        } catch (error) {
            hideAutocomplete();
        }
    }, 350);

    searchInput.addEventListener("input", handleAutocomplete);

    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            hideAutocomplete();
        }
    });

    document.addEventListener("click", (event) => {
        if (!suggestionsList.contains(event.target) && event.target !== searchInput) {
            hideAutocomplete();
        }
    });
}

