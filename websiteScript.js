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

setHeight();
window.onresize = setHeight();

const svgWave = document.getElementById("svgWave");
setInterval(() => {
  changeColor(svgWave);
}, 50);
