class Color {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  get rgb() {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }

  static interpolate(c1, c2, t) {
    let r = Math.round(c1.r + (c2.r - c1.r) * t);
    let g = Math.round(c1.g + (c2.g - c1.g) * t);
    let b = Math.round(c1.b + (c2.b - c1.b) * t);
    return new Color(r, g, b);
  }
}

let canvas = document.querySelector("#grid");
const ctx = canvas.getContext("2d");

let colors = [];

function hexToColor(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? new Color(
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
      )
    : null;
}

function getColors() {
  const c1 = hexToColor(document.querySelector("#c1").value);
  const c2 = hexToColor(document.querySelector("#c2").value);
  const c3 = hexToColor(document.querySelector("#c3").value);
  const c4 = hexToColor(document.querySelector("#c4").value);

  return [c1, c2, c3, c4];
}

function paintGrid(cellWidth, cellHeight) {
  colors = getColors();

  let cols = Math.floor(canvas.width / cellWidth);
  let rows = Math.floor(canvas.height / cellHeight);

  for (let i = 0; i <= rows; i++) {
    for (let j = 0; j <= cols; j++) {
      let x = j * cellWidth;
      let y = i * cellHeight;
      let tHoriz = j / cols;
      let tVert = i / rows;

      let top = Color.interpolate(colors[0], colors[1], tHoriz);
      let bottom = Color.interpolate(colors[2], colors[3], tHoriz);
      let finalColor = Color.interpolate(top, bottom, tVert);

      ctx.fillStyle = finalColor.rgb;
      ctx.fillRect(x + 0.5, y + 0.5, cellWidth - 1, cellHeight - 1);
    }
  }
}

function drawGrid(lineWidth, cellWidth, cellHeight, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;

  let width = canvas.width;
  let height = canvas.height;

  for (let i = 0; i <= width; i += cellWidth) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, height);
    ctx.stroke();
  }

  for (let i = 0; i < height; i += cellHeight) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(width, i);
    ctx.stroke();
  }

  paintGrid(cellWidth, cellHeight, "#0ff");
}

function loop() {
  drawGrid(2, 43, 43, "#000");
}
loop();
