export function switchTab(tabName) {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((btn) => btn.classList.remove("active"));
  tabContents.forEach((tab) => tab.classList.remove("active"));

  document.querySelector(`[data-tab="${tabName}"]`).classList.add("active");
  document.getElementById(`${tabName}-tab`).classList.add("active");
}
