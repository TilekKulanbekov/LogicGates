const width = 700;
const height = 500;

const gates = [];
let clicked = null;

const visited = new Set();

function setup() {
  print(
    "%cWelcome to Gate Stimulator",
    "color: white; background-color: red; padding: 10px; font-size: 20px;"
  );

  createCanvas(width, height);
}

function draw() {
  background(255);
  for (let i = 0; i < gates.length; ++i) {
    gates[i].draw(mouseX, mouseY);
  }
}

function mousePressed() {
  for (let i = gates.length - 1; i >= 0; --i) {
    if (gates[i].pressed(mouseX, mouseY)) {
      return;
    }
  }
  clicked = null;
}

function mouseReleased() {
  for (let i = 0; i < gates.length; ++i) {
    gates[i].notPressed();
  }
}

function _handleClick(node) {
  if (!clicked) {
    clicked = node;
    return;
  }
  clicked.connect(node);
  clicked = null;
}

