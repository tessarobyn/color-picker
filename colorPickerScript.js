function hsvToRgb(h, s, v) {
  s = s / 100;
  v = v / 100;
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let arr;
  if (0 <= h && h < 60) {
    arr = [c, x, 0];
  } else if (60 <= h && h < 120) {
    arr = [x, c, 0];
  } else if (120 <= h && h < 180) {
    arr = [0, c, x];
  } else if (180 <= h && h < 240) {
    arr = [0, x, c];
  } else if (240 <= h && h < 300) {
    arr = [x, 0, c];
  } else if (300 <= h && h < 360) {
    arr = [c, 0, x];
  }
  const rgb = [];
  rgb.push(Math.round((arr[0] + m) * 255));
  rgb.push(Math.round((arr[1] + m) * 255));
  rgb.push(Math.round((arr[2] + m) * 255));
  return rgb;
}

function getOffset(canvas) {
  const rect = canvas.getBoundingClientRect();
  return [rect.left + window.scrollX, rect.top + window.scrollY];
}

function mouseDown(event, canvas) {
  const pos = getOffset(canvas);
  mouseX = event.clientX - pos[0];
  mouseY = event.clientY - pos[1];
  return [mouseX, mouseY];
}

class DragComponents {
  constructor() {}
  drag(event) {
    const mousePos = mouseDown(event, this.canvas);
    if (this.x <= mousePos[0] && mousePos[0] <= this.x + this.width) {
      if (this.y <= mousePos[1] && mousePos[1] <= this.y + this.height) {
        this.dragging = true;
      }
    }
  }

  finishDrag() {
    this.dragging = false;
  }
}

class Slider extends DragComponents {
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
    mainScreen
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
    this.mainScreen = mainScreen;
    this.dragging = false;
  }

  draw() {
    const rectangle = new Path2D();
    rectangle.rect(this.x, this.y, this.width, this.height);
    this.center = this.y - this.containerY + this.height / 2;
    this.hue = (this.center / this.containerHeight) * 360;
    this.ctx.fillStyle = "hsl(" + this.hue + ",100%,50%)";
    this.ctx.fill(rectangle);
    this.ctx.strokeStyle = "#ffffff";
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
    if (this.hue >= 360) {
      this.hue = 359;
    }
    this.mainScreen.update(this.hue);
  }
}

class TransparencySlider extends DragComponents {
  constructor(
    x,
    y,
    width,
    height,
    ctx,
    canvas,
    container,
    containerY,
    containerHeight
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

class ColorPointer extends DragComponents {
  constructor(
    width,
    height,
    container,
    containerX,
    containerY,
    containerWidth,
    containerHeight,
    ctx,
    canvas,
    hue,
    colorPicker
  ) {
    super();
    this.width = width;
    this.height = height;
    this.x = containerX + containerWidth - width / 2;
    this.y = containerY - height / 2;
    this.centerX = this.x + width / 2;
    this.centerY = this.y + height / 2;
    this.container = container;
    this.containerX = containerX;
    this.containerY = containerY;
    this.containerWidth = containerWidth;
    this.containerHeight = containerHeight;
    this.canvas = canvas;
    this.ctx = ctx;
    this.hue = hue;
    this.colorPicker = colorPicker;
    this.saturation = 100;
    this.value = 0;
    this.dragging = false;
    this.rgb = [];
  }
  draw() {
    const rectangle = new Path2D();
    rectangle.rect(this.x, this.y, this.width, this.height);
    this.saturation =
      ((this.centerX - this.containerX) / this.containerWidth) * 100;
    this.value =
      100 - ((this.centerY - this.containerY) / this.containerHeight) * 100;
    this.rgb = hsvToRgb(this.hue, this.saturation, this.value);
    localStorage.setItem("rgb", this.rgb.join(","));
    this.ctx.fillStyle =
      "rgb(" + this.rgb[0] + "," + this.rgb[1] + "," + this.rgb[2] + ")";
    this.ctx.fill(rectangle);
    if (this.value > 70) {
      this.ctx.strokeStyle = "#000000";
    } else {
      this.ctx.strokeStyle = "#ffffff";
    }
    this.ctx.stroke(rectangle);
  }
  update(event) {
    this.ctx.clearRect(
      this.containerX - this.width / 2 - 1,
      this.containerY - this.height / 2 - 1,
      this.containerWidth + this.width * 2,
      this.containerHeight + this.height * 2
    );
    const pos = mouseDown(event, this.canvas);
    this.x = pos[0] + 0.5 - this.width / 2;
    this.y = pos[1] + 0.5 - this.height / 2;
    this.centerX = this.x + this.width / 2;
    if (this.centerX > this.containerX + this.containerWidth) {
      this.x = this.containerX + this.containerWidth - this.width / 2;
      this.centerX = this.x + this.width / 2;
    } else if (this.centerX < this.containerX) {
      this.x = this.containerX - this.width / 2;
      this.centerX = this.x + this.width / 2;
    }
    this.centerY = this.y + this.height / 2;
    if (this.centerY > this.containerY + this.containerHeight) {
      this.y = this.containerY + this.containerHeight - this.height / 2;
      this.centerY = this.y + this.height / 2;
    } else if (this.centerY < this.containerY) {
      this.y = this.containerY - this.height / 2;
      this.centerY = this.y + this.height / 2;
    }
    this.colorPicker.colorBar.update();
    this.container.draw();
    this.draw();
  }
}

class Bars {
  constructor(x, y, width, height, ctx, canvas) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.canvas = canvas;
  }
}

class HueBar extends Bars {
  draw() {
    const addHue = 360 / this.height;
    let y = this.y;
    for (let i = 0; i < this.height; i++) {
      const rectangle = new Path2D();
      rectangle.rect(this.x, y, this.width, 1);
      this.ctx.fillStyle = "hsl(" + addHue * i + ",100%,50%)";
      this.ctx.fill(rectangle);
      y += 1;
    }
  }
  addSlider(mainScreen) {
    this.slider = new Slider(
      this.x - 4.5,
      this.y - 4.5,
      this.width + 9,
      9,
      this.ctx,
      this.canvas,
      this,
      this.y,
      this.height,
      mainScreen
    );
    this.slider.draw();
  }
}

class TransparencyBar extends Bars {
  draw() {
    let t = 255;
    let y = this.y;
    const minusT = 255 / this.height;
    for (let i = 0; i < this.height; i++) {
      const rectangle = new Path2D();
      rectangle.rect(this.x, y, this.width, 1);
      this.ctx.fillStyle = "rgba(255,255,255," + t / 255 + ")";
      this.ctx.fill(rectangle);
      t -= minusT;
      y += 1;
    }
  }
  addSlider() {
    this.slider = new TransparencySlider(
      this.x - 4.5,
      this.y - 4.5,
      this.width + 9,
      9,
      this.ctx,
      this.canvas,
      this,
      this.y,
      this.height
    );
    this.slider.draw();
  }
}

class MainScreen {
  constructor(x, y, width, height, h, ctx, canvas, colorPicker) {
    this.startx = x;
    this.starty = y;
    this.width = width;
    this.height = height;
    this.hue = h;
    this.ctx = ctx;
    this.canvas = canvas;
    this.colorPicker = colorPicker;
  }
  draw() {
    // Low resolution = faster rendering speeds
    // 100 x 100 colors
    let s = 0;
    let v = 100;
    const sizeX = this.width / 100;
    const sizeY = this.height / 100;
    for (let y = 0; y < 100; y++) {
      for (let x = 0; x < 100; x++) {
        const pixel = new Path2D();
        pixel.rect(
          sizeX * x + this.startx - 1,
          sizeY * y + this.starty - 1,
          sizeX + 2,
          sizeY + 2
        );
        const rgb = hsvToRgb(this.hue, s, v);
        this.ctx.fillStyle =
          "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";
        this.ctx.fill(pixel);
        s++;
      }
      s = 0;
      v--;
    }
  }
  drawHighRes() {
    // High resolution = slow rendering speeds
    // 1 color = 1 pixel (width x height colors)
    let s = 0;
    let v = 100;
    const addS = 100 / this.width;
    const minusV = 100 / this.height;
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const pixel = new Path2D();
        pixel.rect(x + this.startx, y + this.starty, 1, 1);
        const rgb = hsvToRgb(this.hue, s, v);
        this.ctx.fillStyle =
          "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";
        this.ctx.fill(pixel);
        s += addS;
      }
      s = 0;
      v -= minusV;
    }
  }
  addColorPointer() {
    this.colorPointer = new ColorPointer(
      10.5,
      10.5,
      this,
      this.startx,
      this.starty,
      this.width,
      this.height,
      this.ctx,
      this.canvas,
      this.hue,
      this.colorPicker
    );
    this.colorPointer.draw();
  }

  update(h) {
    this.hue = h;
    this.colorPointer.hue = this.hue;
    this.ctx.clearRect(this.startx, this.starty, this.width, this.height);
    this.draw();
    this.colorPointer.draw();
    this.colorPicker.colorBar.update();
  }
}

class ColorBar {
  constructor(x, y, width, height, ctx, rgb, colorPointer) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.rgb = rgb;
    this.colorPointer = colorPointer;
  }
  draw() {
    const rectangle = new Path2D();
    rectangle.rect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle =
      "rgb(" + this.rgb[0] + "," + this.rgb[1] + "," + this.rgb[2] + ")";
    this.ctx.fill(rectangle);
  }
  update() {
    this.rgb = this.colorPointer.rgb;
    this.draw();
  }
}

class ColorPicker {
  constructor(canvas, width, height, components) {
    this.canvas = canvas;
    if (canvas.getContext) {
      this.ctx = canvas.getContext("2d");
    }
    this.h = 0;
    this.width = width;
    this.height = height;
    this.components = components;
    this.calculateSizes();
  }

  calculateSizes() {
    this.padding = 15;
    this.startx = this.padding;
    this.starty = this.padding;
    if (this.width > this.height) {
      this.componentHeight = this.height - this.padding * 2;
      this.componentWidth =
        this.componentHeight + this.width / 5 + this.padding * 2;
      this.dataStartY = this.starty;
      this.dataStartX = this.componentWidth + this.padding * 2;
    } else {
      this.componentWidth = this.width;
      this.componentHeight =
        this.componentWidth - this.width / 5 - this.padding * 2;
      this.dataStartY = this.componentHeight + this.padding * 2;
      this.dataStartX = this.startx;
    }
    if (this.components.includes("transparencyBar")) {
      this.transparencyBar = new TransparencyBar(
        this.startx,
        this.starty,
        this.componentWidth / 10,
        this.componentHeight,
        this.ctx,
        this.canvas
      );
      this.transparencyBar.draw();
      this.transparencyBar.addSlider();
      this.startx += this.componentWidth / 10 + this.padding;
    }

    if (this.components.includes("hueBar")) {
      this.hueBar = new HueBar(
        this.startx,
        this.starty,
        this.componentWidth / 10,
        this.componentHeight,
        this.ctx,
        this.canvas
      );
      this.hueBar.draw();
      this.startx += this.componentWidth / 10 + this.padding;
    }

    if (this.components.includes("mainScreen")) {
      this.mainScreen = new MainScreen(
        this.startx,
        this.starty,
        this.componentWidth - this.startx - this.padding,
        this.componentHeight,
        0,
        this.ctx,
        this.canvas,
        this
      );
      this.mainScreen.draw();
      this.mainScreen.addColorPointer();
    }

    if (this.components.includes("hueBar")) {
      this.hueBar.addSlider(this.mainScreen);
    }

    // Color data components
    if (this.components.includes("colorBar")) {
      this.colorBar = new ColorBar(
        this.dataStartX,
        this.dataStartY,
        20,
        20,
        this.ctx,
        this.mainScreen.colorPointer.rgb,
        this.mainScreen.colorPointer
      );
      this.colorBar.draw();
    }
  }
}

const canvas = document.getElementById("colorPicker");
const components = ["transparencyBar", "hueBar", "mainScreen", "colorBar"];
colorPicker = new ColorPicker(canvas, canvas.width, canvas.height, components);

canvas.addEventListener("mousedown", (event) => {
  colorPicker.hueBar.slider.drag(event);
  colorPicker.transparencyBar.slider.drag(event);
  colorPicker.mainScreen.colorPointer.drag(event);
});
canvas.addEventListener("mousemove", (event) => {
  if (colorPicker.hueBar.slider.dragging) {
    updateHueSlider = window.requestAnimationFrame(function () {
      colorPicker.hueBar.slider.update(event);
    });
  }
  if (colorPicker.transparencyBar.slider.dragging) {
    updateTransparencySlider = window.requestAnimationFrame(function () {
      colorPicker.transparencyBar.slider.update(event);
    });
  }
  if (colorPicker.mainScreen.colorPointer.dragging) {
    updatePointer = window.requestAnimationFrame(function () {
      colorPicker.mainScreen.colorPointer.update(event);
    });
  }
});
window.addEventListener("mouseup", (event) => {
  if (colorPicker.hueBar.slider.dragging) {
    window.cancelAnimationFrame(updateHueSlider);
    colorPicker.hueBar.slider.finishDrag();
  }
  if (colorPicker.transparencyBar.slider.dragging) {
    window.cancelAnimationFrame(updateTransparencySlider);
    colorPicker.transparencyBar.slider.finishDrag();
  }
  if (colorPicker.mainScreen.colorPointer.dragging) {
    window.cancelAnimationFrame(updatePointer);
    colorPicker.mainScreen.colorPointer.finishDrag();
  }
});
