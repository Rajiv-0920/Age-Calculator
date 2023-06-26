const themeBtn = document.querySelectorAll(".theme-btn");

var selectedTheme;
window.addEventListener("DOMContentLoaded", () => {
  themeBtn.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      let themes = ["theme1", "theme2", "theme3", "theme4", "theme5"];
      selectedTheme = themes[index];

      location.reload();
      localStorage.setItem("theme", JSON.stringify(selectedTheme));
    });
  });
});
let t = JSON.parse(localStorage.getItem("theme"));
document.body.classList.add(t);
console.log(t);
