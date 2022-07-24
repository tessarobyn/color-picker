import { rgbToCmyk, rgbToHex, rgbToHsl, rgbToHsv } from "./colorConversions.js";

export class ColorData {
  constructor(
    parent,
    padding,
    colorPointer,
    canvasHeight,
    canvasWidth,
    landscape
  ) {
    this.padding = padding + "px";
    this.container = document.createElement("div");
    this.parent = parent;
    this.parent.appendChild(this.container);
    this.colorPointer = colorPointer;
    this.rgbValue = this.colorPointer.rgb;
    this.canvasHeight = canvasHeight;
    this.canvasWidth = canvasWidth;
    this.landscape = landscape;
    this.styleContainer();
  }
  styleContainer() {
    if (!this.landscape) {
      this.container.style.height =
        this.parent.style.height.slice(0, -2) -
        this.canvasHeight -
        this.padding.slice(0, -2) +
        "px";
      this.container.style.marginTop = "-4px";
    } else {
      this.container.style.height = this.canvasHeight - this.padding + "px";
      this.container.style.width =
        this.parent.style.width.slice(0, -2) - this.canvasWidth + "px";
    }

    this.container.style.padding = this.padding;
    this.container.style.paddingBottom = "0";
    this.container.style.display = "flex";
    this.container.style.flexDirection = "column";
  }
  newInput(type) {
    const inputContainer = document.createElement("div");
    inputContainer.style.flex = "1";
    inputContainer.style.minHeight = "0";
    inputContainer.style.width = "100%";
    inputContainer.style.fontFamily = "'roboto',sans-serif";
    inputContainer.style.display = "flex";
    inputContainer.style.alignItems = "center";
    inputContainer.style.marginBottom = this.padding;

    const label = document.createElement("p");
    label.innerText = type;
    label.style.width = "30%";
    label.style.textAlign = "center";
    label.style.color = "#ffffff";
    label.style.marginRight = this.padding;
    inputContainer.appendChild(label);

    const input = document.createElement("input");

    input.style.height = "100%";
    input.style.boxSizing = "border-box";
    input.style.width = "100%";
    input.style.textAlign = "center";
    input.type = "text";
    inputContainer.appendChild(input);

    return [inputContainer, input];
  }
  rgb() {
    this.rgbInput = this.newInput("rgb");
    this.rgbInput[1].value = this.rgbValue.join(", ");
    this.container.appendChild(this.rgbInput[0]);
  }
  hex() {
    this.hexInput = this.newInput("hex");
    this.hexValue = rgbToHex(
      this.rgbValue[0],
      this.rgbValue[1],
      this.rgbValue[2]
    );
    this.hexInput[1].value = this.hexValue;
    this.container.appendChild(this.hexInput[0]);
  }
  hsl() {
    this.hslInput = this.newInput("hsl");
    this.hslValue = rgbToHsl(
      this.rgbValue[0],
      this.rgbValue[1],
      this.rgbValue[2]
    );
    this.hslInput[1].value = this.hslValue.join(", ");
    this.container.appendChild(this.hslInput[0]);
  }
  hsv() {
    this.hsvInput = this.newInput("hsv");
    this.hsvValue = rgbToHsv(
      this.rgbValue[0],
      this.rgbValue[1],
      this.rgbValue[2]
    );
    this.hsvInput[1].value = this.hsvValue.join(", ");
    this.container.appendChild(this.hsvInput[0]);
  }
  cmyk() {
    this.cmykInput = this.newInput("cmyk");
    this.cmykValue = rgbToCmyk(
      this.rgbValue[0],
      this.rgbValue[1],
      this.rgbValue[2]
    );
    this.cmykInput[1].value = this.cmykValue.join(", ");
    this.container.appendChild(this.cmykInput[0]);
  }

  update() {
    this.rgbValue = this.colorPointer.rgb;
    if (this.rgbInput) {
      this.rgbInput[1].value = this.rgbValue.join(", ");
    }
    if (this.hexInput) {
      this.hexValue = rgbToHex(
        this.rgbValue[0],
        this.rgbValue[1],
        this.rgbValue[2]
      );
      this.hexInput[1].value = this.hexValue;
    }
    if (this.hslInput) {
      this.hslValue = rgbToHsl(
        this.rgbValue[0],
        this.rgbValue[1],
        this.rgbValue[2]
      );
      this.hslInput[1].value = this.hslValue.join(", ");
    }
    if (this.hsvInput) {
      this.hsvValue = rgbToHsv(
        this.rgbValue[0],
        this.rgbValue[1],
        this.rgbValue[2]
      );
      this.hsvInput[1].value = this.hsvValue.join(", ");
    }
    if (this.cmykInput) {
      this.cmykValue = rgbToCmyk(
        this.rgbValue[0],
        this.rgbValue[1],
        this.rgbValue[2]
      );
      this.cmykInput[1].value = this.cmykValue.join(", ");
    }
  }
}
