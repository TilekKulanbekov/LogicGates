class AND extends Gate {
  constructor(x, y) {
    super(x=100, y=50);

    this.input.push(
      new InputGate(
        this.x,
        this.y,
        -1 * this.width,
        -1 * (this.width / 4),
        this.width / 5,
        this
      )
    );

    this.input.push(
      new InputGate(
        this.x,
        this.y,
        -1 * this.width,
        this.width / 4,
        this.width / 5,
        this
      )
    );


    this.output.push(
      new OutputGate(this.x, this.y, this.width, 0, this.width / 5, this)
    );
  }

  checkState() {

    for (let i = 0; i < this.input.length; ++i) {
      if (!this.input[i].connected || !this.input[i].connected.parent.state) {
        return false;
      }
    }
    return true;

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

    square(
      this.x - this.width / 2,
      this.y - this.width / 2,
      this.width,
      0,
      this.width / 2,
      this.width / 2,
      0
    );


    line(this.x + this.width / 2, this.y, this.x + this.width, this.y);


    line(
      this.x - this.width,
      this.y - this.width / 4,
      this.x - this.width / 2,
      this.y - this.width / 4
    );
    line(
      this.x - this.width,
      this.y + this.width / 4,
      this.x - this.width / 2,
      this.y + this.width / 4
    );


    for (let i = 0; i < this.input.length; ++i) {
      this.input[i].draw();
    }


    for (let i = 0; i < this.output.length; ++i) {
      this.output[i].draw();
    }
  }
}
