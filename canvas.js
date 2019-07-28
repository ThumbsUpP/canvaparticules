import { WINDOW_SIZE } from "./constants";
import Ball from "./Ball";
import Line from "./Line";
import { compact } from "lodash/fp";

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

const balls = [...Array(150).keys()].map(() => new Ball(10));
const lines = [...Array(150).keys()].map(() => new Line());

const computeDistance = (ball1, ball2) => {
  const { x: x1, y: y1 } = ball1;
  const { x: x2, y: y2 } = ball2;
  return Math.pow(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2), 0.5);
};

const getLinePath = (ballsPos, limit) => {
  return ballsPos.map(position => {
    const positions = ballsPos.map((pos, i) => {
      const dist = computeDistance(position, pos);
      return dist < limit ? { position, pos } : null;
    });

    return compact(positions);
  });
};

const animate = () => {
  c.clearRect(0, 0, WIDTH, HEIGHT);
  ballPosition = [];
  balls.forEach(ball => {
    ball.draw();
    ball.run(mouseX, mouseY);
    ball.update();
    const pos = { x: ball.x, y: ball.y };
    ballPosition = [...ballPosition, pos];
  });

  const paths = getLinePath(ballPosition, 100);
  //console.log(paths);
  paths.forEach(path => {
    path.forEach(p => {
      c.beginPath();
      c.moveTo(p.position.x, p.position.y);
      c.lineTo(p.pos.x, p.pos.y);
      c.stroke();
      c.strokeStyle = "white";
    });
  });

  /* lines.forEach((line, i) => {
    const { x: x1, y: y1 } = ballPosition[i];
    const { x: x2, y: y2 } =
      ballPosition.length - 1 === i ? ballPosition[i] : ballPosition[i + 1];
    line.draw(x1, y1, x2, y2);
  }); */

  requestAnimationFrame(animate);
};

animate();
