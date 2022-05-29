class Bulb extends Gate {
  constructor(x, y) {
    super(x=100, y=50);

    this.input.push(
      new InputGate(
        this.x,
        this.y,
        0,
        this.width / 2 + this.width / 10,
        this.width / 5,
        this
      )
    );
  }

  checkState() {


    return this.checkInputs(1) && this.input[0].connected.parent.state;
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

    if (this.state) {
      fill(255, 204, 0);
    }

    beginShape();
    curveVertex(this.x - this.width * 0.7, this.y + this.width * 0.5);
    curveVertex(this.x - this.width / 8, this.y + this.width / 8);
    curveVertex(this.x - this.width * 0.4, this.y - this.width / 2);
    curveVertex(this.x, this.y - this.width * 0.75);
    curveVertex(this.x + this.width * 0.4, this.y - this.width / 2);
    curveVertex(this.x + this.width / 8, this.y + this.width / 8);
    curveVertex(this.x + this.width * 0.7, this.y + this.width * 0.5);
    endShape();
    

    fill(0);
    square(this.x - this.width / 8, this.y + this.width / 8, this.width / 4);
    triangle(
      this.x - this.width * 0.12,
      this.y + this.width * 0.38,
      this.x + this.width * 0.12,
      this.y + this.width * 0.38,
      this.x,
      this.y + this.width / 2
    );
    fill(255);

    for (let i = 0; i < this.input.length; ++i) {
      this.input[i].draw();
    }

    for (let i = 0; i < this.output.length; ++i) {
      this.output[i].draw();
    }
  }
}
