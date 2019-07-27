import { WINDOW_SIZE } from "./constants";
import Ball from "./Ball";

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

const balls = [...Array(175).keys()].map(() => new Ball(10));

const animate = () => {
  c.clearRect(0, 0, WIDTH, HEIGHT);
  balls.forEach(ball => {
    ball.draw();
    ball.run(mouseX, mouseY);
    ball.update();
  });
  requestAnimationFrame(animate);
};

animate();
