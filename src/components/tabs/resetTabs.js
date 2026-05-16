export function resetTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabContents.forEach((tab) => tab.classList.remove("active"));
  document.getElementById("profile-tab").classList.add("active");

  tabButtons.forEach((btn) => btn.classList.remove("active"));
  tabButtons[0].classList.add("active");

  document.querySelector(".profile-content").classList.add("hidden-init");
  document.querySelector("#profile-tab .empty-state").style.display = "grid";

  document.getElementById("episodes-list").innerHTML = "";
  document.querySelector(".episodes-content").classList.add("hidden-init");
  document.querySelector("#episodes-tab .empty-state").style.display = "grid";

  document.querySelector(".details-content").classList.add("hidden-init");
  document.querySelector("#details-tab .empty-state").style.display = "grid";
}
