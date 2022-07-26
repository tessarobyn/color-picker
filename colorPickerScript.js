import { Theme } from "/theme.js";
import { ColorPicker } from "/colorPicker.js";

const container = document.getElementsByClassName("colorPicker")[0];
const id = container.id.replace(/\s/g, "");
const arr = id.split(/[;:]+/);
const themes = ["light", "grey", "darkBlue", "dark", "black", "custom"];
let theme;
if (arr.includes("theme")) {
  const t = arr[arr.indexOf("theme") + 1];
  if (themes.includes(t)) {
    theme = new Theme(t);
  }
  if (t == "custom") {
    const colors = arr[arr.indexOf("custom") + 1].split(",");
    theme.custom(colors[0], colors[1], colors[2]);
  }
} else {
  theme = new Theme("dark");
}

let components = ["colorBar", "rgb", "hex", "hsl", "hsv", "cmyk"];
if (arr.includes("features")) {
  components = arr[arr.indexOf("features") + 1].split(",");
}

container.style.backgroundColor = theme.backgroundColor;
const colorPicker = new ColorPicker(
  container,
  container.style.width.slice(0, container.style.width.length - 2),
  container.style.height.slice(0, container.style.height.length - 2),
  components,
  theme
);

// Sliders/pointer updates
let updateHueSlider;
let updatePointer;
colorPicker.canvas.addEventListener("mousedown", (event) => {
  colorPicker.hueBar.slider.drag(event);
  colorPicker.mainScreen.colorPointer.drag(event);
  colorPicker.colorData.update();
  if (colorPicker.colorBar) {
    colorPicker.colorBar.update();
  }
});

window.addEventListener("mousemove", (event) => {
  if (colorPicker.hueBar.slider.dragging) {
    updateHueSlider = window.requestAnimationFrame(function () {
      colorPicker.hueBar.slider.update(event);
    });
    colorPicker.colorData.update();
  }

  if (colorPicker.mainScreen.colorPointer.dragging) {
    updatePointer = window.requestAnimationFrame(function () {
      colorPicker.mainScreen.colorPointer.update(event);
    });
    colorPicker.colorData.update();
  }
  if (colorPicker.colorBar) {
    colorPicker.colorBar.update();
  }
});

window.addEventListener("mouseup", () => {
  if (colorPicker.hueBar.slider.dragging) {
    window.cancelAnimationFrame(updateHueSlider);
    colorPicker.hueBar.slider.finishDrag();
  }

  if (colorPicker.mainScreen.colorPointer.dragging) {
    window.cancelAnimationFrame(updatePointer);
    colorPicker.mainScreen.colorPointer.finishDrag();
  }
});

// For color data:
const inputBoxes = document.querySelectorAll(".colorDataInputs");
inputBoxes.forEach((input) => {
  input.addEventListener("keydown", (event) => {
    colorPicker.colorData.checkKey(event, input);
  });
});
