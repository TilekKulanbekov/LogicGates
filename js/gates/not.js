class NOT extends Gate {
  constructor(x, y) {
    super(x=100, y=50);

    this.input.push(
      new InputGate(this.x, this.y, -1 * this.width, 0, this.width / 5, this)
    );

    this.output.push(
      new OutputGate(this.x, this.y, this.width, 0, this.width / 5, this)
    );
  }

  checkState() {
    if (!this.input[0].connected || !this.input[0].connected.parent.state) {
      return true;
    }
    return false;
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

    triangle(
      this.x - this.width / 2,
      this.y - this.width / 2,
      this.x + this.width / 2,
      this.y,
      this.x - this.width / 2,
      this.y + this.width / 2
    );

    line(this.x - this.width, this.y, this.x - this.width / 2, this.y);

    line(this.x + this.width / 2, this.y, this.x + this.width, this.y);

    circle(this.x + this.width / 2, this.y, this.width / 5);

    for (let i = 0; i < this.input.length; ++i) {
      this.input[i].draw();
    }

    for (let i = 0; i < this.output.length; ++i) {
      this.output[i].draw();
    }
  }
}
