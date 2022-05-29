class Switch extends Gate {
  constructor(x, y) {
    super(x=100, y=50);

    this.output.push(
      new OutputGate(this.x, this.y, this.width, 0, this.width / 5, this)
    );

  }

  checkState() {
    return this.state;
  }

  draw(px, py) {
    if (this.dragging) {
      this.x = px + this.offsetX;
      this.y = py + this.offsetY;

      for (let i = 0; i < this.input.length; ++i) {
        this.input[i].x = this.x;
        this.input[i].y = this.y;
      }

      for (let i = 0; i < this.output.length; ++i) {
        this.output[i].x = this.x;
        this.output[i].y = this.y;
      }
    }

    rect(
      this.x - this.width / 3,
      this.y - this.width / 2,
      this.width / 1.5,
      this.width
    );

    if (this.state) {
      fill(51);
      circle(this.x, this.y - this.width / 10, this.width / 5);
      fill(255);
    } else {
      circle(this.x, this.y + this.width / 10, this.width / 5);
    }

    line(this.x + this.width / 3, this.y, this.x + this.width, this.y);

    for (let i = 0; i < this.input.length; ++i) {
      this.input[i].draw();
    }

    for (let i = 0; i < this.output.length; ++i) {
      this.output[i].draw();
    }
  }

  pressed(px, py) {

    if (
      px > this.x - this.width / 5 &&
      px < this.x + this.width / 5 &&
      py < this.y + this.width / 4 &&
      py > this.y - this.width / 4
    ) {
      this.state = !this.state;


      for (let i = 0; i < this.output.length; ++i) {
        if (this.output[i].connected) {
          visited.clear();
          this.output[i].connected.parent.checkIfThereIsAChange();
        }
      }
      return true;
    }

    return super.pressed(px, py);
  }
}
