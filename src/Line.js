var canvas = document.getElementById("my-canvas");
var c = canvas.getContext("2d");

class Line {
  constructor() {}
  draw(x1, y1, x2, y2) {
    console.log({ x1, y1, x2, y2 });
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.stroke();
    c.strokeStyle = "white";
  }
}

export default Line;
