import { ColorPicker } from "/colorPicker.js";

let colorPickers = [];
const containers = document.querySelectorAll(".colorPicker");
containers.forEach((container) => {
  container.style.backgroundColor = "#222222";
  let components = ["colorBar", "hex", "rgb", "hsl", "hsv", "cmyk"];
  let colorPicker = new ColorPicker(
    container,
    container.style.width.slice(0, container.style.width.length - 2),
    container.style.height.slice(0, container.style.height.length - 2),
    components
  );

  // Sliders/pointer updates
  colorPicker.canvas.addEventListener("mousedown", (event) => {
    colorPicker.hueBar.slider.drag(event);
    colorPicker.mainScreen.colorPointer.drag(event);
    colorPicker.colorData.update();
    colorPicker.colorBar.update();
  });

  window.addEventListener("mousemove", (event) => {
    if (colorPicker.hueBar.slider.dragging) {
      colorPicker.updateHueSlider = window.requestAnimationFrame(function () {
        colorPicker.hueBar.slider.update(event);
      });
      colorPicker.colorData.update();
    }

    if (colorPicker.mainScreen.colorPointer.dragging) {
      colorPicker.updatePointer = window.requestAnimationFrame(function () {
        colorPicker.mainScreen.colorPointer.update(event);
      });
      colorPicker.colorData.update();
    }
    colorPicker.colorBar.update();
  });

  window.addEventListener("mouseup", () => {
    if (colorPicker.hueBar.slider.dragging) {
      window.cancelAnimationFrame(colorPicker.updateHueSlider);
      colorPicker.hueBar.slider.finishDrag();
    }

    if (colorPicker.mainScreen.colorPointer.dragging) {
      window.cancelAnimationFrame(colorPicker.updatePointer);
      colorPicker.mainScreen.colorPointer.finishDrag();
    }
  });

  // For color data:
  const inputBoxes = document.querySelectorAll(".colorDataInputs");
  inputBoxes.forEach((input) => {
    if (input.parentNode.parentNode.parentNode == container) {
      input.addEventListener("keydown", (event) => {
        colorPicker.colorData.checkKey(event, input);
      });
    }
  });
  colorPickers.push(colorPicker);
});
