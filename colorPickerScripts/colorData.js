import {
  cmykToRgb,
  hexToRgb,
  hslToRgb,
  hsvToRgb,
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
    landscape,
    theme
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
    this.theme = theme;
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
    label.style.color = this.theme.color;
    label.style.fontFamily = "'roboto',sans-serif";
    label.style.marginRight = this.padding;
    inputContainer.appendChild(label);

    const input = document.createElement("input");

    input.style.height = "100%";
    input.style.boxSizing = "border-box";
    input.style.width = "100%";
    input.style.textAlign = "center";
    input.style.color = this.theme.color;
    input.style.fontFamily = "'roboto',sans-serif";
    if (this.canvasWidth <= 200) {
      input.style.fontSize = "12px";
    } else {
      input.style.fontSize = "14px";
    }
    input.style.borderStyle = "none";
    input.style.backgroundColor = this.theme.inputBackgroundColor;
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
      this.hsvValue[i] = Math.round(this.hsvValue[i]);
    }
    this.hsvValue[1] += "%";
    this.hsvValue[2] += "%";

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
        this.hsvValue[i] = Math.round(this.hsvValue[i]);
      }
      this.hsvValue[1] += "%";
      this.hsvValue[2] += "%";
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

  rgbCheck(rgb) {
    this.valid = true;
    if (rgb.length != 3) {
      this.valid = false;
    } else {
      for (let i = 0; i < rgb.length; i++) {
        if (isNaN(rgb[i])) {
          this.valid = false;
        } else if (0 > parseInt(rgb[i]) || parseInt(rgb[i]) > 255) {
          this.valid = false;
        }
      }
    }
  }

  hexCheck() {
    let hex = this.temp;
    this.valid = true;
    if (hex[0] === "#") {
      hex = hex.slice(1, hex.length);
    } else if (hex[0] === "0" && hex[1] === "x") {
      hex = hex.slice(2, hex.length);
    }
    if (hex.length != 3) {
      if (hex.length != 6) {
        this.valid = false;
      }
    }
    if (this.valid) {
      const hexValues = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
      ];
      for (let i = 0; i < hex.length; i++) {
        if (!hexValues.includes(hex[i])) {
          this.valid = false;
        }
      }
    }
    this.temp = hex;
  }

  hslHsvCheck() {
    this.valid = true;
    let hsl = this.temp;
    let percent1 = false;
    let percent2 = false;

    if (hsl.length != 3) {
      this.valid = false;
    } else {
      for (let i = 0; i < hsl.length; i++) {
        if (hsl[i].includes(" ") || hsl[i] === "") {
          this.valid = false;
        }
      }
      const sl = hsl[1].length;
      const vl = hsl[2].length;
      hsl[1] = hsl[1].replace("%", "");
      hsl[2] = hsl[2].replace("%", "");
      if (sl > hsl[1].length) {
        percent1 = true;
      }
      if (vl > hsl[2].length) {
        percent1 = true;
      }
      if (isNaN(hsl[0]) || isNaN(hsl[1]) || isNaN(hsl[2])) {
        this.valid = false;
      } else if (hsl[0] < 0 || hsl[0] > 360) {
        this.valid = false;
      } else if (hsl[1] < 0 || hsl[1] > 100) {
        this.valid = false;
      } else if (hsl[2] < 0 || hsl[2] > 100) {
        this.valid = false;
      }

      if (this.valid) {
        if (
          (hsl[1] % 1 !== 0 || hsl[1] === "1" || hsl[1] === "0") &&
          !percent1
        ) {
          hsl[1] *= 100;
          hsl[1] += "%";
        } else {
          hsl[1] += "%";
        }
        if (
          (hsl[2] % 1 !== 0 || hsl[2] === "1" || hsl[2] === "0") &&
          !percent2
        ) {
          hsl[2] *= 100;
          hsl[2] += "%";
        } else {
          hsl[2] += "%";
        }
      }
    }
    this.temp = hsl;
  }

  cmykCheck() {
    this.valid = true;
    let cmyk = this.temp;
    for (let i = 0; i < cmyk.length; i++) {
      let len = cmyk[i].length;
      cmyk[i] = cmyk[i].replace("%", "");
      if (len > cmyk[i].length) {
        cmyk[i] = cmyk[i] / 100;
      }
      if (isNaN(cmyk[i])) {
        this.valid = false;
        console.log("false 1");
      } else if (String(cmyk[i]).includes(" ") || cmyk[i] === "") {
        this.valid = false;
        console.log("false 2");
      } else {
        if (0 > cmyk[i] || cmyk[i] > 1) {
          this.valid = false;
          console.log("false 3");
        }
      }
    }
    this.temp = cmyk;
  }

  checkKey(event, input) {
    if (event.key === "Enter") {
      if (input.id === "rgb") {
        const temp = input.value.split(",");
        this.rgbCheck(temp);
        if (this.valid) {
          this.rgbValue = temp;
          this.hsvValue = rgbToHsv(
            this.rgbValue[0],
            this.rgbValue[1],
            this.rgbValue[2]
          );
        }
      } else if (input.id === "hex") {
        this.temp = input.value.toUpperCase();
        this.hexCheck();
        if (this.valid) {
          if (this.temp[0] != "#") {
            this.temp = "#" + this.temp;
          }
          this.hexValue = this.temp;
          this.rgbValue = hexToRgb(this.hexValue);
          this.hsvValue = rgbToHsv(
            this.rgbValue[0],
            this.rgbValue[1],
            this.rgbValue[2]
          );
        }
      } else if (input.id === "hsl") {
        this.temp = input.value.split(",");
        this.hslHsvCheck();
        if (this.valid) {
          this.hslValue = this.temp;
          this.rgbValue = hslToRgb(
            this.hslValue[0],
            this.hslValue[1],
            this.hslValue[2]
          );
          this.hsvValue = rgbToHsv(
            this.rgbValue[0],
            this.rgbValue[1],
            this.rgbValue[2]
          );
        }
      } else if (input.id === "hsv") {
        this.temp = input.value.split(",");
        this.hslHsvCheck();
        if (this.valid) {
          this.hsvValue = this.temp;
          this.rgbValue = hsvToRgb(
            this.hsvValue[0],
            this.hsvValue[1].slice(0, -1),
            this.hsvValue[2].slice(0, -1)
          );
          this.hsvValue = rgbToHsv(
            this.rgbValue[0],
            this.rgbValue[1],
            this.rgbValue[2]
          );
        }
      } else if (input.id === "cmyk") {
        this.temp = input.value.split(",");
        this.cmykCheck();
        if (this.valid) {
          this.cmykValue = this.temp;
          for (let i = 0; i < this.cmykValue.length; i++) {
            this.cmykValue[i] = parseFloat(this.cmykValue[i]);
          }
          console.log(this.cmykValue);
          this.rgbValue = cmykToRgb(
            this.cmykValue[0],
            this.cmykValue[1],
            this.cmykValue[2],
            this.cmykValue[3]
          );
          this.hsvValue = rgbToHsv(
            this.rgbValue[0],
            this.rgbValue[1],
            this.rgbValue[2]
          );
        }
      }
      if (this.valid) {
        this.colorPicker.mainScreen.update(this.hsvValue[0]);
        this.colorPicker.mainScreen.colorPointer.inputUpdate(
          this.hsvValue,
          this.rgbValue
        );
        this.colorPicker.colorBar.update();
        this.colorPicker.hueBar.slider.inputUpdate(this.hsvValue[0]);
        // Have to update colorPointer before updating this because it uses colorPointer data
        this.update();
      } else {
        this.update();
      }
    }
  }
}
