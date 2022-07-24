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
  } else if (300 <= h && h < 360) {
    arr = [c, 0, x];
  }
  const rgb = [];
  rgb.push(Math.round((arr[0] + m) * 255));
  rgb.push(Math.round((arr[1] + m) * 255));
  rgb.push(Math.round((arr[2] + m) * 255));
  return rgb;
}
