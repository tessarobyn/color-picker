import { ColorData } from "/colorData.js";
import { MainScreen } from "/mainScreen.js";
import { ColorBar, HueBar } from "/bars.js";

export class ColorPicker {
  constructor(container, width, height, components, theme) {
    this.container = container;
    this.h = 0;
    this.width = width;
    this.height = height;
    this.components = components;
    this.theme = theme;
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
      this.canvas.width = this.height;
      this.componentWidth = this.canvas.width;
      if (this.colorBar) {
        this.componentHeight = this.height - this.padding * 2 - this.height / 5;
        this.dataStartX = this.padding;
        this.dataStartY = this.componentHeight + this.padding * 2;
        this.dataWidth = this.componentWidth - this.padding * 2;
        this.dataHeight = this.height / 5 - this.padding;
      } else {
        this.componentHeight = this.height - this.padding * 2;
      }
    } else {
      this.landscape = false;
      this.canvas.width = this.componentWidth = this.width;
      this.componentHeight =
        this.componentWidth - this.width / 5 - this.padding * 2;
      this.dataStartY = this.componentHeight + this.padding * 2;
      this.dataStartX = this.startx;
      this.dataWidth = this.componentWidth - this.padding * 2;
      this.dataHeight = this.componentHeight / 3;
      if (this.components.includes("colorBar")) {
        this.canvas.height = this.componentHeight + this.dataHeight;
      } else {
        this.canvas.height = this.componentHeight;
      }
    }
    if (this.canvas.getContext) {
      this.ctx = this.canvas.getContext("2d");
    }
    this.container.appendChild(this.canvas);

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
      this.canvas
    );
    this.mainScreen.draw();
    this.mainScreen.addColorPointer();

    this.hueBar.addSlider(this.mainScreen, this.theme);

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
        this,
        this.canvas.height,
        this.canvas.width,
        this.landscape,
        this.theme
      );

      for (let i = 0; i < this.components.length; i++) {
        if (this.components[i] === "rgb") {
          this.colorData.rgb();
        }
        if (this.components[i] === "hex") {
          this.colorData.hex();
        }
        if (this.components[i] === "hsl") {
          this.colorData.hsl();
        }
        if (this.components[i] === "hsv") {
          this.colorData.hsv();
        }
        if (this.components[i] === "cmyk") {
          this.colorData.cmyk();
        }
      }
    }
  }
}
