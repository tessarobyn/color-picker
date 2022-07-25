import { Slider } from "./dragComponents.js";

class Bars {
  constructor(x, y, width, height, ctx, canvas, rgb, colorPointer) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.canvas = canvas;
    // Only applicable to transparency bar:
    this.rgb = rgb;
    this.colorPointer = colorPointer;
  }
}

export class HueBar extends Bars {
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

export class TransparencyBar extends Bars {
  draw() {
    // Background set to black - maybe change to transparency grid? Note: will also need to change for transparency slider
    const rectangle = new Path2D();
    rectangle.rect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = "#000000";
    this.ctx.fill(rectangle);
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

  update() {
    this.rgb = this.colorPointer.rgb;
    this.draw();
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

export class ColorBar {
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
