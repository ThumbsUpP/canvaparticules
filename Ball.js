import { WINDOW_SIZE } from "./constants";

const { WIDTH, HEIGHT } = WINDOW_SIZE;

var canvas = document.getElementById("my-canvas");
var c = canvas.getContext("2d");

class Ball {
  constructor(f) {
    this.x = Math.random() * WIDTH;
    this.y = Math.random() * HEIGHT;
    this.radius = Math.random() * 1;
    this.dx = (Math.random() - 0.5) * Math.random() * f;
    this.dy = (Math.random() - 0.5) * Math.random() * f;
    this.fill = Math.random();
    this.trackPos = [];
    this.enterCircle = false;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, 2 * this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = `rgba(255,255,255,${this.fill.toFixed(2)})`;
    c.fillStyle = `rgba(255,255,255,${this.fill.toFixed(2)})`;
    c.fill();
    c.stroke();
  }

  run(x, y) {
    const isInsideCircle =
      Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2) < 10000;

    if (!this.enterCircle && isInsideCircle) {
      this.trackPos = [-this.dx, -this.dy];
      this.dx = -this.dx * 5;
      this.dy = -this.dy * 5;
    } else if (this.enterCircle && !isInsideCircle) {
      this.dx = this.trackPos[0];
      this.dy = this.trackPos[1];
    }
    if (isInsideCircle) {
      this.enterCircle = true;
    } else {
      this.enterCircle = false;
    }
  }

  update() {
    if (this.x + this.radius > WIDTH || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > HEIGHT || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
  }

  getballPosition() {
    return {
      x: this.x,
      y: this.y
    };
  }
}

export default Ball;
