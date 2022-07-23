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

class ColorPicker {
  constructor(canvas) {
    this.canvas = canvas;
    if (canvas.getContext) {
      this.ctx = canvas.getContext("2d");
    }
  }
}

function addColorPicker(canvas, x, y, width, height, h) {
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    const startx = x;
    const starty = y;
    let s = 0;
    let v = 100;
    const addS = 100 / width;
    const minusV = 100 / height;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const pixel = new Path2D();
        pixel.rect(x + startx, y + starty, 1, 1);
        const rgb = hsvToRgb(h, s, v);
        ctx.fillStyle = "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";
        ctx.fill(pixel);
        s += addS;
      }
      s = 0;
      v -= minusV;
    }
  }
}

function addTransparencyRect(canvas, x, y) {
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    let t = 0;
    const addT = 255 / 280;
    for (let i = 0; i < 280; i++) {
      const rectangle = new Path2D();
      rectangle.rect(x, y, 20, 1);
      ctx.fillStyle = "rgba(255,255,255," + t / 255 + ")";
      ctx.fill(rectangle);
      t += addT;
      y += 1;
    }
  }
}

function addHueRect(canvas, x, y) {
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    const addHue = 360 / 280;
    for (let i = 0; i < 280; i++) {
      const rectangle = new Path2D();
      rectangle.rect(x, y, 20, 1);
      ctx.fillStyle = "hsl(" + addHue * i + ",100%,50%)";
      ctx.fill(rectangle);
      y += 1;
    }
  }
}
const canvas = document.getElementById("colorPicker");
addTransparencyRect(canvas, 10, 10);
addHueRect(canvas, 40, 10);
addColorPicker(canvas, 70, 10, 280, 280, 200);
