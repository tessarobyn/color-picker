function setHeight() {
  const intro = document.getElementsByClassName("intro")[0];
  const navbar = document.getElementsByClassName("navbar")[0];
  intro.style.height =
    document.body.offsetHeight - navbar.offsetHeight * 3 + "px";
}

function changeColor(svgWave) {
  const color = localStorage.getItem("rgb").split(",");
  svgWave.style.fill =
    "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")";
}

function toFeatures() {
  window.location.href = "features.html";
}

function toSetup() {
  window.location.href = "setup.html";
}

function toHelp() {
  window.location.href = "help.html";
}

setHeight();
window.onresize = setHeight();

const svgWave = document.getElementById("svgWave");
setInterval(() => {
  changeColor(svgWave);
}, 50);

const featuresButtons = document.querySelectorAll(".featuresButton");
featuresButtons.forEach((fb) => {
  fb.addEventListener("click", toFeatures);
});

const setupButtons = document.querySelectorAll(".setupButton");
setupButtons.forEach((sb) => {
  sb.addEventListener("click", toSetup);
});

const helpButtons = document.querySelectorAll(".helpButton");
helpButtons.forEach((hb) => {
  hb.addEventListener("click", toHelp);
});
