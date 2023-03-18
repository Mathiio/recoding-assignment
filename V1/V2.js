const GRAY_SCALE = [
  [0, 0, 0],
  [40, 40, 40],
  [100, 100, 100],
  [255, 255, 255]
];

function setup() {
  createCanvas(600, 400);
  noStroke();
  background(255);
  drawSquare(0, 0, width, height, 0);
}

function draw() {}

function drawSquare(x, y, w, h, level) {
  if (level < 7) {
    let subW = w / 2;
    let subH = h / 2;
    drawSquare(x, y, subW, subH, level + 1);
    drawSquare(x + subW, y, subW, subH, level + 1);
    drawSquare(x + subW, y + subH, subW, subH, level + 1);
    drawSquare(x, y + subH, subW, subH, level + 1);
  } else {
    let noiseVal = noise(x / 100, y / 100);
    let grayIndex = Math.random() < 0.4 + noiseVal * 0.4 ? 3 : Math.floor(random(3));
    fill(color(...GRAY_SCALE[grayIndex]));
    noStroke(); 
    rect(x, y, w, h);
  }
}