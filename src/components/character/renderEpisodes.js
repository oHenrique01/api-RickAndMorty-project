export function renderEpisodes(episodes) {
  const episodesList = document.getElementById("episodes-list");

  episodesList.innerHTML = "";

  episodes.forEach((episodeUrl) => {
    const episodeNumber = episodeUrl.split("/").pop();
    const li = document.createElement("li");
    li.textContent = `EP ${episodeNumber}`;
    episodesList.appendChild(li);
  });
}
