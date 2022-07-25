// class from dragComponents.js
export class TransparencySlider extends DragComponents {
  constructor(
    x,
    y,
    width,
    height,
    ctx,
    canvas,
    container,
    containerY,
    containerHeight,
    rgb
  ) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.canvas = canvas;
    this.container = container;
    this.containerY = containerY;
    this.containerHeight = containerHeight;
    this.transparency = 0;
    this.dragging = false;
  }

  draw() {
    const rectangle = new Path2D();
    rectangle.rect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = "#000000";
    this.ctx.fill(rectangle);
    this.center = this.y - this.containerY + this.height / 2;
    this.transparency = 1 - this.center / this.containerHeight;
    this.ctx.fillStyle = "rgba(255,255,255," + this.transparency + ")";
    this.ctx.fill(rectangle);
    if (this.transparency > 0.7) {
      this.ctx.strokeStyle = "#777777";
    } else {
      this.ctx.strokeStyle = "#ffffff";
    }
    this.ctx.stroke(rectangle);
  }
  update(event) {
    this.ctx.clearRect(
      this.x,
      this.containerY - 5,
      this.width + 1,
      this.containerHeight + 10
    );
    const pos = mouseDown(event, this.canvas);
    this.y = pos[1] + 0.5;
    this.center = this.y + this.height / 2;
    if (this.center > this.containerY + this.containerHeight) {
      this.y = this.containerY + this.containerHeight - this.height / 2;
    } else if (this.center < this.containerY) {
      this.y = this.containerY - this.height / 2;
    }
    this.container.draw();
    this.draw();
  }
}

// Sliders/pointer updates from colorPickerScript.js
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
    colorPicker.colorData.update();
  }
  if (colorPicker.transparencyBar) {
    if (colorPicker.transparencyBar.slider.dragging) {
      updateTransparencySlider = window.requestAnimationFrame(function () {
        colorPicker.transparencyBar.slider.update(event);
      });
      colorPicker.colorData.update();
    }
  }
  if (colorPicker.mainScreen.colorPointer.dragging) {
    updatePointer = window.requestAnimationFrame(function () {
      colorPicker.mainScreen.colorPointer.update(event);
    });
    colorPicker.colorData.update();
  }
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
