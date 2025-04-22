let cols;
let rows;
let size = 20;
let c = [];
let squareColors = [];

function setup() {
  createCanvas(800, 800);
  cols = (width - 400) / size;
  rows = (height - 400) / size;
  for (let i = 0; i < 5; i++) {
    squareColors.push(color(random(254), random(254), random(254)));
  }

  for (let i = 0; i < cols; i++) {
    c[i] = [];
    for (let j = 0; j < rows; j++) {
      c[i][j] = color(
        Math.floor(Math.random() * 254),
        Math.floor(Math.random() * 254),
        Math.floor(Math.random() * 254)
      );
    }
  }
}

function draw() {
  background(220);
  fill(0);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      fill(c[i][j]);
      rect(i * size, j * size, size, size);
    }
  }

  rectMode(CENTER);
  let sz_sqr = 400;
  let x_sqr = (width + 400) / 2;
  let y_sqr = (height - 400) / 2;

  fill(0);
  for (let k = 0; k < 5; k++) {
    fill(squareColors[k]);
    rect(x_sqr, y_sqr, sz_sqr, sz_sqr);
    sz_sqr *= 0.5;
  }
}
