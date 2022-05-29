class Gate {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.offsetX = 0;
    this.offsetY = 0;
    this.dragging = false;

    this.input = [];
    this.output = [];
    this.state = false;
  }

  checkState() {
    return this.state;
  }

  checkIfThereIsAChange() {
    if (visited.has(this)) {
      return;
    }

    visited.add(this);
    let temp = this.checkState();

    if (temp != this.state) {
      this.state = temp;
      for (let i = 0; i < this.output.length; ++i) {
        if (this.output[i].connected) {
          this.output[i].connected.parent.checkIfThereIsAChange();
        }
      }
    }
  }

  checkInputs(len) {
    if (this.input.length < len) {
      return false;
    }

    for (let i = 0; i < len; ++i) {
      if (!this.input[i].connected) {
        return false;
      }
    }
    return true;
  }

  pressed(px, py) {
    if (
      px > this.x - this.width / 2 &&
      px < this.x + this.width / 2 &&
      py < this.y + this.width / 2 &&
      py > this.y - this.width / 2
    ) {
      this.dragging = true;
      this.offsetX = this.x - px;
      this.offsetY = this.y - py;
      return true;
    }

    for (let i = 0; i < this.input.length; ++i) {
      if (this.input[i].pressed(px, py)) {
        _handleClick(this.input[i]);
        return true;
      }
    }

    for (let i = 0; i < this.output.length; ++i) {
      if (this.output[i].pressed(px, py)) {
        _handleClick(this.output[i]);
        return true;
      }
    }
    return false;
  }

  notPressed() {
    this.dragging = false;
  }
}
