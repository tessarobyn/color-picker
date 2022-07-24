import { ColorData } from "/colorData.js";
import { MainScreen } from "/mainScreen.js";
import { ColorBar, HueBar, TransparencyBar } from "/bars.js";

export class ColorPicker {
  constructor(container, width, height, components) {
    this.container = container;
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
    this.canvas = document.createElement("canvas");
    if (parseInt(this.width) > parseInt(this.height)) {
      this.landscape = true;
      this.container.style.display = "flex";
      this.canvas.height = this.height;
      this.componentHeight = this.height - this.padding * 2;
      this.canvas.width = this.componentWidth =
        this.componentHeight + this.padding * 2;
    } else {
      this.landscape = false;
      this.canvas.width = this.componentWidth = this.width;
      this.componentHeight =
        this.componentWidth - this.width / 5 - this.padding * 2;
      this.dataStartY = this.componentHeight + this.padding * 2;
      this.dataStartX = this.startx;
      this.dataWidth = this.componentWidth - this.padding * 2;
      this.dataHeight =
        (this.height - this.componentHeight - this.padding * 3) / 5;
      this.canvas.height = this.componentHeight + this.dataHeight;
    }
    if (this.canvas.getContext) {
      this.ctx = this.canvas.getContext("2d");
    }
    this.container.appendChild(this.canvas);

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

    this.hueBar.addSlider(this.mainScreen);

    // Color bar
    if (this.components.includes("colorBar")) {
      this.colorBar = new ColorBar(
        this.dataStartX,
        this.dataStartY,
        this.dataWidth,
        this.dataHeight,
        this.ctx,
        this.mainScreen.colorPointer.rgb,
        this.mainScreen.colorPointer
      );
      this.colorBar.draw();
      this.dataStartY +=
        (this.dataHeight - this.padding * 3) / 4 + this.padding;
    }

    // Color data
    if (
      this.components.includes("hex") ||
      this.components.includes("rgb") ||
      this.components.includes("hsl") ||
      this.components.includes("hsv") ||
      this.components.includes("cmyk")
    ) {
      this.colorData = new ColorData(
        this.container,
        this.padding,
        this.mainScreen.colorPointer,
        this.canvas.height,
        this.canvas.width,
        this.landscape
      );
      if (this.components.includes("rgb")) {
        this.colorData.rgb();
      }
      if (this.components.includes("hex")) {
        this.colorData.hex();
      }
      if (this.components.includes("hsl")) {
        this.colorData.hsl();
      }
      if (this.components.includes("hsv")) {
        this.colorData.hsv();
      }
      if (this.components.includes("cmyk")) {
        this.colorData.cmyk();
      }
    }
  }
}