import { WINDOW_SIZE } from "./constants";
import Ball from "./Ball";
import Line from "./Line";

const { WIDTH, HEIGHT } = WINDOW_SIZE;
const canvas = document.getElementById("my-canvas");

canvas.width = WIDTH;
canvas.height = HEIGHT;

const c = canvas.getContext("2d");

let mouseX = 0;
let mouseY = 0;

const getMousePosition = e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
};

addEventListener("mousemove", getMousePosition, false);

let ballPosition = [];

const updateBallPosition = (array, pos) => [...array, pos];

const balls = [...Array(150).keys()].map(() => new Ball(10));
const lines = [...Array(150).keys()].map(() => new Line());

const animate = () => {
  c.clearRect(0, 0, WIDTH, HEIGHT);
  ballPosition = [];
  balls.forEach(ball => {
    ball.draw();
    ball.run(mouseX, mouseY);
    ball.update();
    const pos = ball.getballPosition();

    ballPosition = [...ballPosition, pos];
  });

  lines.forEach((line, i) => {
    const { x: x1, y: y1 } = ballPosition[i];
    const { x: x2, y: y2 } =
      ballPosition.length - 1 === i ? ballPosition[i] : ballPosition[i + 1];
    line.draw(x1, y1, x2, y2);
  });

  requestAnimationFrame(animate);
};

animate();
