const themeBtn = document.querySelectorAll(".theme-btn");
var selectedTheme = "theme1";
window.addEventListener("DOMContentLoaded", () => {
  let prev = JSON.parse(localStorage.getItem("theme"));
  if (prev === null) {
    localStorage.setItem("theme", JSON.stringify("theme1"));
  }
  themeBtn.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      let themes = ["theme1", "theme2", "theme3", "theme4", "theme5"];
      selectedTheme = themes[index];
      location.reload();
      localStorage.setItem("theme", JSON.stringify(selectedTheme));
      prev = JSON.parse(localStorage.getItem("theme"));
    });
  });
  document.body.classList.add(prev);
});
