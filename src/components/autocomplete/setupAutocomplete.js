import { fetchNameApi } from "../../api/fetchNameApi.js";
import { debounce } from "../../utils/debouce.js";
import { renderAutocomplete } from "./renderAutocomplete.js";

export function setupAutocomplete() {
    const input = document.getElementById("characterId");

    const autocompleteList = document.createElement("div");
    autocompleteList.classList.add("autocomplete-list");

    input.parentElement.appendChild(autocompleteList);

    const hideAutocomplete = () => {
        autocompleteList.innerHTML = "";
        autocompleteList.classList.remove("autocomplete-list-visible");
        autocompleteList.closest(".hero")?.style.removeProperty("--autocomplete-space");
    };

    const handleAutocomplete = debounce(async () => {
        const valueInput = input.value.trim();

        if (valueInput.length < 2) {
            hideAutocomplete();
            return;
        }

        try {
            const data = await fetchNameApi(valueInput);
            renderAutocomplete(data.results, autocompleteList, input);
        } catch (error) {
            hideAutocomplete();
        }
    }, 350);

    input.addEventListener("input", handleAutocomplete);

    input.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            hideAutocomplete();
        }
    });

    document.addEventListener("click", (event) => {
        if (!autocompleteList.contains(event.target) && event.target !== input) {
            hideAutocomplete();
        }
    });
}

