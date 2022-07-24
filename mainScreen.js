import { hsvToRgb } from "/colorConversions.js";
import { ColorPointer } from "./dragComponents.js";

export class MainScreen {
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
