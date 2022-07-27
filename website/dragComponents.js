import { hsvToRgb } from "/colorConversions.js";
import { mouseDown } from "/mouseFunctions.js";

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

export class Slider extends DragComponents {
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
    mainScreen,
    theme
  ) {
    super();
    this.x = x;
    this.y = y;
    this.starty = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.canvas = canvas;
    this.container = container;
    this.containerY = containerY;
    this.containerHeight = containerHeight;
    this.mainScreen = mainScreen;
    this.theme = theme;
    this.dragging = false;
  }

  draw() {
    const rectangle = new Path2D();
    rectangle.rect(this.x, this.y, this.width, this.height);
    this.center = this.y - this.containerY + this.height / 2;
    this.hue = (this.center / this.containerHeight) * 360;
    this.ctx.fillStyle = "hsl(" + this.hue + ",100%,50%)";
    this.ctx.fill(rectangle);
    this.ctx.strokeStyle = this.theme.color;
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

  inputUpdateDraw() {
    this.center = this.starty + (this.hue / 360) * this.containerHeight;
    this.center += 4.5;
    this.y = this.center - this.height / 2;
    const rectangle = new Path2D();
    rectangle.rect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = "hsl(" + this.hue + ",100%,50%)";
    this.ctx.fill(rectangle);
    this.ctx.strokeStyle = "#ffffff";
    this.ctx.stroke(rectangle);
  }

  inputUpdate(h) {
    this.hue = h;
    this.ctx.clearRect(
      this.x,
      this.containerY - 5,
      this.width + 1,
      this.containerHeight + 10
    );
    this.container.draw();
    this.inputUpdateDraw();
    if (this.hue >= 360) {
      this.hue = 359;
    }
  }
}

export class ColorPointer extends DragComponents {
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
    hue
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

  inputUpdate(hsv) {
    this.hue = hsv[0];
    this.saturation = hsv[1];
    this.value = hsv[2];
    this.x =
      this.containerX +
      this.containerWidth * (this.saturation / 100) -
      this.width / 2;
    this.y =
      this.containerHeight -
      (this.containerY + this.containerHeight - this.containerY) *
        (this.value / 100) +
      this.height;
    this.centerX = this.x + this.width / 2;
    this.centerY = this.y + this.height / 2;
    this.inputUpdateDraw();
  }

  inputUpdateDraw() {
    this.ctx.clearRect(
      this.containerX - this.width / 2 - 1,
      this.containerY - this.height / 2 - 1,
      this.containerWidth + this.width * 2,
      this.containerHeight + this.height * 2
    );
    this.container.draw();
    const rectangle = new Path2D();
    rectangle.rect(this.x, this.y, this.width, this.height);
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
    this.container.draw();
    this.draw();
  }
}
