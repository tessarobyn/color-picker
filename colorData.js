import {
  hexToRgb,
  hslToRgb,
  rgbToCmyk,
  rgbToHex,
  rgbToHsl,
  rgbToHsv,
} from "./colorConversions.js";

export class ColorData {
  constructor(
    parent,
    padding,
    colorPicker,
    canvasHeight,
    canvasWidth,
    landscape
  ) {
    this.padding = padding + "px";
    this.container = document.createElement("div");
    this.parent = parent;
    this.parent.appendChild(this.container);
    this.colorPicker = colorPicker;
    this.colorPointer = this.colorPicker.mainScreen.colorPointer;
    this.rgbValue = this.colorPicker.mainScreen.colorPointer.rgb;
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
    inputContainer.style.display = "flex";
    inputContainer.style.alignItems = "center";
    inputContainer.style.marginBottom = this.padding;

    const label = document.createElement("p");
    label.innerText = type;
    label.style.width = "30%";
    label.style.textAlign = "center";
    label.style.color = "#ffffff";
    label.style.fontFamily = "'roboto',sans-serif";
    label.style.marginRight = this.padding;
    inputContainer.appendChild(label);

    const input = document.createElement("input");

    input.style.height = "100%";
    input.style.boxSizing = "border-box";
    input.style.width = "100%";
    input.style.textAlign = "center";
    input.style.color = "#ffffff";
    input.style.fontFamily = "'roboto',sans-serif";
    if (this.canvasWidth <= 200) {
      input.style.fontSize = "12px";
    } else {
      input.style.fontSize = "14px";
    }
    input.style.borderStyle = "none";
    input.style.backgroundColor = "#555555";
    input.type = "text";
    inputContainer.appendChild(input);

    return [inputContainer, input];
  }
  rgb() {
    this.rgbInput = this.newInput("rgb");
    for (let i = 0; i < this.rgbValue.length; i++) {
      this.rgbValue[i] = Math.round(this.rgbValue[i]);
    }
    this.rgbInput[1].value = this.rgbValue.join(", ");
    this.container.appendChild(this.rgbInput[0]);
    this.rgbInput = this.rgbInput[1];
    this.rgbInput.id = "rgb";
    this.rgbInput.classList.add("colorDataInputs");
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
    this.hexInput = this.hexInput[1];
    this.hexInput.id = "hex";
    this.hexInput.classList.add("colorDataInputs");
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
    this.hslInput = this.hslInput[1];
    this.hslInput.id = "hsl";
    this.hslInput.classList.add("colorDataInputs");
  }
  hsv() {
    this.hsvInput = this.newInput("hsv");
    this.hsvValue = rgbToHsv(
      this.rgbValue[0],
      this.rgbValue[1],
      this.rgbValue[2]
    );
    for (let i = 0; i < this.hsvValue.length; i++) {
      this.hsvValue[i] = Math.round(this.hsvValue[i]) + "%";
    }
    this.hsvInput[1].value = this.hsvValue.join(", ");
    this.container.appendChild(this.hsvInput[0]);
    this.hsvInput = this.hsvInput[1];
    this.hsvInput.id = "hsv";
    this.hsvInput.classList.add("colorDataInputs");
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
    this.cmykInput = this.cmykInput[1];
    this.cmykInput.id = "cmyk";
    this.cmykInput.classList.add("colorDataInputs");
  }

  update() {
    this.rgbValue = this.colorPointer.rgb;

    if (this.rgbInput) {
      for (let i = 0; i < this.rgbValue.length; i++) {
        this.rgbValue[i] = Math.round(this.rgbValue[i]);
      }
      this.rgbInput.value = this.rgbValue.join(", ");
    }
    if (this.hexInput) {
      this.hexValue = rgbToHex(
        this.rgbValue[0],
        this.rgbValue[1],
        this.rgbValue[2]
      );
      this.hexInput.value = this.hexValue;
    }
    if (this.hslInput) {
      this.hslValue = rgbToHsl(
        this.rgbValue[0],
        this.rgbValue[1],
        this.rgbValue[2]
      );
      this.hslInput.value = this.hslValue.join(", ");
    }
    if (this.hsvInput) {
      this.hsvValue = rgbToHsv(
        this.rgbValue[0],
        this.rgbValue[1],
        this.rgbValue[2]
      );
      for (let i = 0; i < this.hsvValue.length; i++) {
        this.hsvValue[i] = Math.round(this.hsvValue[i]) + "%";
      }
      this.hsvInput.value = this.hsvValue.join(", ");
    }
    if (this.cmykInput) {
      this.cmykValue = rgbToCmyk(
        this.rgbValue[0],
        this.rgbValue[1],
        this.rgbValue[2]
      );
      this.cmykInput.value = this.cmykValue.join(", ");
    }
  }

  checkKey(event, input) {
    if (event.key === "Enter") {
      event.preventDefault();
      if (input.id === "rgb") {
        this.rgbValue = input.value.split(",");
        this.hsvValue = rgbToHsv(
          this.rgbValue[0],
          this.rgbValue[1],
          this.rgbValue[2]
        );
      } else if (input.id === "hex") {
        this.hexValue = input.value;
        this.rgbValue = hexToRgb(this.hexValue);
        this.hsvValue = rgbToHsv(
          this.rgbValue[0],
          this.rgbValue[1],
          this.rgbValue[2]
        );
      }
      this.colorPicker.mainScreen.update(this.hsvValue[0]);
      this.colorPicker.mainScreen.colorPointer.inputUpdate(
        this.hsvValue,
        this.rgbValue
      );
      this.colorPicker.colorBar.update();
      this.colorPicker.hueBar.slider.inputUpdate(this.hsvValue[0]);
      // Have to update colorPointer before updating this because it uses colorPointer data
      this.update();
    }
  }
}
