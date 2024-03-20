document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("background-canvas");
  var ctx = canvas.getContext("2d");

  // Set canvas width and height to cover the entire screen
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var dotRadius = 10;
  var dotColor = "black";
  var shiftX = canvas.width / 2; // Center dot horizontally
  var shiftY = canvas.height / 2; // Center dot vertically

  var t = 0; // Initialize the value of t
  var num_lines = 800;

  function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < num_lines; i++) {
      lx1 = x1(t + i) * 4 + shiftX;
      ly1 = y1(t + i) * 4 + shiftY;
      lx2 = x2(t + i) * 4 + shiftX;
      ly2 = y2(t + i) * 4 + shiftY;

      ctx.beginPath();
      ctx.moveTo(lx1, ly1);
      ctx.lineTo(lx2, ly2);
      var hue = ((t + i) / 3) % 360; // Change hue value over time
      //   ctx.strokeStyle = `hsla(${hue}, 95%, 75%, 33%)`; // Set stroke color
      //   ctx.strokeStyle = `rgba(0,0,0,${t+i})`;
      ctx.strokeStyle = `rgba(0,0,0,0.18)`;
      ctx.lineWidth = 0.5; // Define line width
      ctx.stroke();
      ctx.closePath();
    }

    t += 0.01;

    // Request the next frame
    requestAnimationFrame(draw);
  }

  // Start the animation loop
  draw();
});

const x1 = (t) => {
  return Math.cos(t / 10) * 100 + Math.sin(t / 10) * 6;
};
const y1 = (t) => {
  return Math.sin(t / 10) * 100;
};

const x2 = (t) => {
  return Math.sin(t / 10) * 200 + Math.sin(t) * 6;
};
const y2 = (t) => {
  return Math.cos(t / 10) * 100 + Math.cos(t / 8) * 6;
};
