const typeOf = (obj) => {
  let type = {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1];
  if (type === "Object") {
    const results = /^(function|class)\s+(\w+)/.exec(
      obj.constructor.toString()
    );
    type = results && results.length > 2 ? results[2] : "";
  }
  return type.toLowerCase();
};

class IOGates {
  constructor(x, y, offsetX, offsetY, r, parent) {
    this.x = x;
    this.y = y;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.r = r;
    this.parent = parent;
    this.connected = null;
  }

  getX() {
    return this.x + this.offsetX;
  }

  getY() {
    return this.y + this.offsetY;
  }

  draw() {
    if (this == clicked) stroke(255, 204, 0);
    circle(this.getX(), this.getY(), this.r);
    stroke(0);
    if (this.connected && typeOf(this) == "outputgate") {
      if (this.parent.state) {
        stroke(255, 204, 0);
      }
      noFill();
      curve(
        this.getX() -
          2 *
            dist(
              this.getX(),
              this.getY(),
              this.connected.getX(),
              this.connected.getY()
            ),
        this.getY(),
        this.getX(),
        this.getY(),
        this.connected.getX(),
        this.connected.getY(),
        this.connected.getX() +
          2 *
            dist(
              this.getX(),
              this.getY(),
              this.connected.getX(),
              this.connected.getY()
            ),
        this.connected.getY()
      );
      fill(255);
      stroke(0);
    }
  }

  pressed(px, py) {
    if (dist(this.getX(), this.getY(), px, py) <= this.r) {
      return true;
    }
    return false;
  }
}

class InputGate extends IOGates {
  constructor(x, y, offsetX, offsetY, r, parent) {
    super(x, y, offsetX, offsetY, r, parent);
  }

  connect(gate) {
    if (
      this.connected ||
      typeOf(gate) != "outputgate" ||
      gate.parent == this.parent ||
      gate.connected
    ) {
      return;
    }

    this.connected = gate;

    gate.connected = this;

    visited.clear();
    gate.connected.parent.checkIfThereIsAChange();
    this.connected.parent.checkIfThereIsAChange();
  }
}

class OutputGate extends IOGates {
  constructor(x, y, offsetX, offsetY, r, parent) {
    super(x, y, offsetX, offsetY, r, parent);
  }

  connect(gate) {
    if (
      this.connected ||
      typeOf(gate) != "inputgate" ||
      gate.parent == this.parent ||
      gate.connected
    ) {
      return;
    }

    this.connected = gate;

    gate.connected = this;

    visited.clear();
    gate.connected.parent.checkIfThereIsAChange();
    this.connected.parent.checkIfThereIsAChange();
  }
}
