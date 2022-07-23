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

function mouseUp(event) {}

class Slider {
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
    this.y = pos[1];
    this.center = this.y + this.height / 2;
    if (this.center > this.containerY + this.containerHeight) {
      this.y = this.containerY + this.containerHeight - this.height / 2;
    } else if (this.center < this.containerY) {
      this.y = this.containerY - this.height / 2;
    }
    this.container.draw();
    this.draw();
  }

  drag(event) {
    const mousePos = mouseDown(event, this.canvas);
    if (this.x <= mousePos[0] && mousePos[0] <= this.x + this.width) {
      if (this.y <= mousePos[1] && mousePos[1] <= this.y + this.height) {
        this.dragging = true;
        console.log("slider clicked");
      }
    }
  }

  finishDrag() {
    this.mainScreen.update(this.hue);
    this.dragging = false;
  }
}

class HueBar {
  constructor(x, y, width, height, ctx, canvas) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.canvas = canvas;
  }
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

class MainScreen {
  constructor(x, y, width, height, h, ctx) {
    this.startx = x;
    this.starty = y;
    this.width = width;
    this.height = height;
    this.hue = h;
    this.ctx = ctx;
  }
  draw() {
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
  update(h) {
    this.hue = h;
    this.ctx.clearRect(this.startx, this.starty, this.width, this.height);
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

  addTransparencyBar(x, y, width, height) {
    let t = 0;
    const addT = 255 / height;
    for (let i = 0; i < height; i++) {
      const rectangle = new Path2D();
      rectangle.rect(x, y, width, 1);
      this.ctx.fillStyle = "rgba(255,255,255," + t / 255 + ")";
      this.ctx.fill(rectangle);
      t += addT;
      y += 1;
    }
  }

  calculateSizes() {
    this.padding = 10;
    this.startx = this.padding;
    this.starty = this.padding;
    if (this.components.includes("transparencyBar")) {
      this.addTransparencyBar(
        this.startx,
        this.starty,
        this.width / 10,
        this.height - 20
      );
      this.startx += this.width / 10 + this.padding;
    }

    if (this.components.includes("hueBar")) {
      this.hueBar = new HueBar(
        this.startx,
        this.starty,
        this.width / 10,
        this.height - 20,
        this.ctx,
        this.canvas
      );
      this.hueBar.draw();
      this.startx += this.width / 10 + this.padding;
    }

    if (this.components.includes("mainScreen")) {
      this.mainScreen = new MainScreen(
        this.startx,
        this.starty,
        this.width - this.startx - this.padding,
        this.height - 20,
        0,
        this.ctx
      );
      this.mainScreen.draw();
    }

    if (this.components.includes("hueBar")) {
      this.hueBar.addSlider(this.mainScreen);
    }
  }
}

const canvas = document.getElementById("colorPicker");
const components = ["transparencyBar", "hueBar", "mainScreen"];
colorPicker = new ColorPicker(canvas, canvas.width, canvas.height, components);

canvas.addEventListener("mousedown", (event) => {
  colorPicker.hueBar.slider.drag(event);
});
canvas.addEventListener("mousemove", (event) => {
  if (colorPicker.hueBar.slider.dragging) {
    updateSlider = window.requestAnimationFrame(function () {
      colorPicker.hueBar.slider.update(event);
    });
  }
});
window.addEventListener("mouseup", (event) => {
  if (colorPicker.hueBar.slider.dragging) {
    window.cancelAnimationFrame(updateSlider);
    colorPicker.hueBar.slider.finishDrag();
  }
});
