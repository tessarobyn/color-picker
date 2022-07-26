export function rgbToHex(r, g, b) {
  const arr = [r, g, b];
  const hexValues = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];
  const hex = [];
  for (let i = 0; i < arr.length; i++) {
    hex.push(hexValues[Math.floor(arr[i] / 16)]);
    hex.push(hexValues[arr[i] % 16]);
  }
  const hexCode = "#" + hex.join("");
  return hexCode;
}

export function rgbToHsl(r, g, b) {
  const r1 = r / 255;
  const g1 = g / 255;
  const b1 = b / 255;
  const cmax = Math.max(r1, g1, b1);
  const cmin = Math.min(r1, g1, b1);
  const c = cmax - cmin;
  let h;
  if (c === 0) {
    h = 0;
  } else if (cmax === r1) {
    h = 60 * (((g1 - b1) / c) % 6);
  } else if (cmax === g1) {
    h = 60 * ((b1 - r1) / c + 2);
  } else if (cmax === b1) {
    h = 60 * ((r1 - g1) / c + 4);
  }
  if (h < 0) {
    h += 360;
  }

  let l = (cmax + cmin) / 2;

  let s;
  if (c === 0) {
    s = 0;
  } else {
    s = c / (1 - Math.abs(2 * l - 1));
  }

  h = Math.round(h);
  l = Math.round(l * 100) + "%";
  s = Math.round(s * 100) + "%";
  return [h, s, l];
}

export function rgbToHsv(r, g, b) {
  // Note: first part of code is identical to hsl conversion - maybe move to seperate function?
  const r1 = r / 255;
  const g1 = g / 255;
  const b1 = b / 255;
  const cmax = Math.max(r1, g1, b1);
  const cmin = Math.min(r1, g1, b1);
  const c = cmax - cmin;
  let h;
  if (c === 0) {
    h = 0;
  } else if (cmax === r1) {
    h = 60 * (((g1 - b1) / c) % 6);
  } else if (cmax === g1) {
    h = 60 * ((b1 - r1) / c + 2);
  } else if (cmax === b1) {
    h = 60 * ((r1 - g1) / c + 4);
  }
  if (h < 0) {
    h += 360;
  }

  let s;
  if (c === 0) {
    s = 0;
  } else {
    s = c / cmax;
  }

  s = s * 100;
  const v = cmax * 100;

  return [h, s, v];
}

export function rgbToCmyk(r, g, b) {
  const r1 = r / 255;
  const g1 = g / 255;
  const b1 = b / 255;
  const k = 1 - Math.max(r1, g1, b1);
  const c = (1 - r1 - k) / (1 - k);
  const m = (1 - g1 - k) / (1 - k);
  const y = (1 - b1 - k) / (1 - k);
  let cmyk = [c, m, y, k];
  for (let i = 0; i < cmyk.length; i++) {
    cmyk[i] = Math.round(cmyk[i] * 100) + "%";
  }
  if (cmyk.includes(NaN + "%")) {
    cmyk = ["0%", "0%", "0%", "100%"];
  }
  return cmyk;
}

// From color types to rgb

export function hexToRgb(hex) {
  hex = hex.slice(1).toUpperCase();
  const hexSplit = [];
  if (hex.length === 3) {
    for (let i = 0; i < hex.length; i++) {
      hexSplit.push(String(hex[i]) + String(hex[i]));
    }
  } else if (hex.length === 6) {
    for (let i = 0; i < hex.length; i += 2) {
      hexSplit.push(String(hex[i]) + String(hex[i + 1]));
    }
  } else {
    alert("Invalid");
  }

  let rgb = [];
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
  for (let i = 0; i < hexSplit.length; i++) {
    const num =
      hexValues.indexOf(hexSplit[i][0]) * 16 +
      hexValues.indexOf(hexSplit[i][1]);
    rgb.push(num);
  }
  return rgb;
}

export function hslToRgb(h, s, l) {
  s = s.slice(0, -1) / 100;
  l = l.slice(0, -1) / 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
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
  } else if (300 <= h && h <= 360) {
    arr = [c, 0, x];
  }
  let rgb = [];
  rgb.push((arr[0] + m) * 255);
  rgb.push((arr[1] + m) * 255);
  rgb.push((arr[2] + m) * 255);
  return rgb;
}

export function hsvToRgb(h, s, v) {
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
  } else if (300 <= h && h <= 360) {
    arr = [c, 0, x];
  }
  const rgb = [];
  rgb.push((arr[0] + m) * 255);
  rgb.push((arr[1] + m) * 255);
  rgb.push((arr[2] + m) * 255);
  return rgb;
}

export function cmykToRgb(c, m, y, k) {
  let rgb = [];
  rgb.push(255 * (1 - c) * (1 - k));
  rgb.push(255 * (1 - m) * (1 - k));
  rgb.push(255 * (1 - y) * (1 - k));
  console.log(rgb);
  return rgb;
}
