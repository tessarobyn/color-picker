export class ColorData {
  constructor(parent, padding, colorPointer, canvasHeight) {
    this.padding = padding + "px";
    this.container = document.createElement("div");
    this.parent = parent;
    this.parent.appendChild(this.container);
    this.colorPointer = colorPointer;
    this.canvasHeight = canvasHeight;
    this.styleContainer();
  }
  styleContainer() {
    this.container.style.height =
      this.parent.style.height.slice(0, -2) -
      this.canvasHeight -
      this.padding.slice(0, -2) +
      "px";
    this.container.style.padding = this.padding;
    this.container.style.paddingBottom = "0";
    this.container.style.marginTop = "-4px";
    this.container.style.display = "flex";
    this.container.style.flexDirection = "column";
  }
  newInput(type) {
    const inputContainer = document.createElement("div");
    inputContainer.style.flex = "1";
    inputContainer.style.width = "100%";
    inputContainer.style.fontFamily = "'roboto',sans-serif";
    inputContainer.style.display = "flex";
    inputContainer.style.alignItems = "center";
    inputContainer.style.marginBottom = this.padding;

    const label = document.createElement("p");
    label.innerText = type;
    label.style.flex = "1";
    label.style.width = "100%";
    label.style.textAlign = "center";
    label.style.color = "#ffffff";
    inputContainer.appendChild(label);

    const input = document.createElement("input");
    input.style.flex = "1";
    input.style.height = "100%";
    input.style.boxSizing = "border-box";
    input.style.textAlign = "center";
    input.type = "text";
    inputContainer.appendChild(input);

    return [inputContainer, input];
  }
  rgb() {
    this.rgbInput = this.newInput("rgb");
    this.rgbInput[1].value = this.colorPointer.rgb.join(", ");
    this.container.appendChild(this.rgbInput[0]);
  }
  hex() {
    this.hexInput = this.newInput("hex");
    this.hexInput[1].value = this.colorPointer.rgb.join(", ");
    this.container.appendChild(this.hexInput[0]);
  }
  hsl() {
    this.hslInput = this.newInput("hsl");
    this.hslInput[1].value = this.colorPointer.rgb.join(", ");
    this.container.appendChild(this.hslInput[0]);
  }
  hsv() {
    this.hsvInput = this.newInput("hsv");
    this.hsvInput[1].value = this.colorPointer.rgb.join(", ");
    this.container.appendChild(this.hsvInput[0]);
  }
  cmyk() {
    this.cmykInput = this.newInput("cmyk");
    this.cmykInput[1].value = this.colorPointer.rgb.join(", ");
    this.container.appendChild(this.cmykInput[0]);
  }
}
