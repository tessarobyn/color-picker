import { ColorPicker } from "/colorPicker.js";

const container = document.getElementById("colorPicker");
container.style.backgroundColor = "#222222";
const components = ["colorBar", "hex", "rgb", "hsl", "hsv", "cmyk"];
const colorPicker = new ColorPicker(
  container,
  container.style.width.slice(0, container.style.width.length - 2),
  container.style.height.slice(0, container.style.height.length - 2),
  components
);

let updateHueSlider;
let updateTransparencySlider;
let updatePointer;
colorPicker.canvas.addEventListener("mousedown", (event) => {
  colorPicker.hueBar.slider.drag(event);
  if (colorPicker.transparencyBar) {
    colorPicker.transparencyBar.slider.drag(event);
  }
  colorPicker.mainScreen.colorPointer.drag(event);
  colorPicker.colorData.update();
  colorPicker.colorBar.update();
});
window.addEventListener("mousemove", (event) => {
  if (colorPicker.hueBar.slider.dragging) {
    updateHueSlider = window.requestAnimationFrame(function () {
      colorPicker.hueBar.slider.update(event);
    });
  }
  if (colorPicker.transparencyBar) {
    if (colorPicker.transparencyBar.slider.dragging) {
      updateTransparencySlider = window.requestAnimationFrame(function () {
        colorPicker.transparencyBar.slider.update(event);
      });
    }
  }
  if (colorPicker.mainScreen.colorPointer.dragging) {
    updatePointer = window.requestAnimationFrame(function () {
      colorPicker.mainScreen.colorPointer.update(event);
    });
  }
  colorPicker.colorData.update();
  colorPicker.colorBar.update();
});
window.addEventListener("mouseup", (event) => {
  if (colorPicker.hueBar.slider.dragging) {
    window.cancelAnimationFrame(updateHueSlider);
    colorPicker.hueBar.slider.finishDrag();
  }
  if (colorPicker.transparencyBar) {
    if (colorPicker.transparencyBar.slider.dragging) {
      window.cancelAnimationFrame(updateTransparencySlider);
      colorPicker.transparencyBar.slider.finishDrag();
    }
  }
  if (colorPicker.mainScreen.colorPointer.dragging) {
    window.cancelAnimationFrame(updatePointer);
    colorPicker.mainScreen.colorPointer.finishDrag();
  }
});
