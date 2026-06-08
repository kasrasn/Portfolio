document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("background-canvas");
  var ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let resizeTimer;
  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  var t = 0;
  var num_lines = 800;
  var innerScale = 1;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const shiftX = canvas.width / 2;
    const shiftY = canvas.height / 2;
    const gap = 100;
    const margin = 250;

    // ── First ball (pink, above center) ──
    ctx.beginPath();
    ctx.strokeStyle = "rgb(213, 80, 107)";
    ctx.lineWidth = 0.4;
    for (let i = 0; i < num_lines; i++) {
      ctx.moveTo(x1(t + i) * 2 + shiftX, y1(t + i) * 2 + shiftY - gap + margin);
      ctx.lineTo(x2(t + i) * 2 + shiftX, y2(t + i) * 2 + shiftY - gap + margin);
    }
    ctx.stroke();

    // ── Second ball (dark red, below center) ──
    ctx.beginPath();
    ctx.strokeStyle = "rgb(70, 5, 5)";
    ctx.lineWidth = 0.4;
    for (let i = 0; i < num_lines; i++) {
      ctx.moveTo(x1(t + i) * 2 + shiftX, y1(t + i) * 2 + shiftY + gap + margin);
      ctx.lineTo(x2(t + i) * 2 + shiftX, y2(t + i) * 2 + shiftY + gap + margin);
    }
    ctx.stroke();

    // ── Inner first ball (teal, opposite direction, above center) ──
    ctx.beginPath();
    ctx.strokeStyle = "rgb(10, 180, 180)";
    ctx.lineWidth = 0.4;
    for (let i = 0; i < num_lines; i++) {
      ctx.moveTo(x1(-t + i) * innerScale + shiftX, y1(-t + i) * innerScale + shiftY - gap + margin);
      ctx.lineTo(x2(-t + i) * innerScale + shiftX, y2(-t + i) * innerScale + shiftY - gap + margin);
    }
    ctx.stroke();

    // ── Inner second ball (rose, opposite direction, below center) ──
    ctx.beginPath();
    ctx.strokeStyle = "rgb(222, 62, 123)";
    ctx.lineWidth = 0.4;
    for (let i = 0; i < num_lines; i++) {
      ctx.moveTo(x1(-t + i) * innerScale + shiftX, y1(-t + i) * innerScale + shiftY + gap + margin);
      ctx.lineTo(x2(-t + i) * innerScale + shiftX, y2(-t + i) * innerScale + shiftY + gap + margin);
    }
    ctx.stroke();

    // ── Inner third ball (black, scale 0.5, below center) ──
    ctx.beginPath();
    ctx.strokeStyle = "rgba(0, 0, 0, 0.6)";
    ctx.lineWidth = 0.4;
    for (let i = 0; i < num_lines; i++) {
      ctx.moveTo(x1(t + i) * 0.5 + shiftX, y1(t + i) * 0.5 + shiftY + gap + margin);
      ctx.lineTo(x2(t + i) * 0.5 + shiftX, y2(t + i) * 0.5 + shiftY + gap + margin);
    }
    ctx.stroke();

    // ── Inner fourth ball (black, scale 0.5, above center) ──
    ctx.beginPath();
    ctx.strokeStyle = "rgba(0, 0, 0, 0.6)";
    ctx.lineWidth = 0.4;
    for (let i = 0; i < num_lines; i++) {
      ctx.moveTo(x1(t + i) * 0.5 + shiftX, y1(t + i) * 0.5 + shiftY - gap + margin);
      ctx.lineTo(x2(t + i) * 0.5 + shiftX, y2(t + i) * 0.5 + shiftY - gap + margin);
    }
    ctx.stroke();

    t += 0.0045;
    requestAnimationFrame(draw);
  }

  draw();
});

const x1 = (t) => Math.cos(0.3 * t) * 100 + Math.sin(t / 10) * 4;
const y1 = (t) => Math.sin(0.3 * t) * 100;
const x2 = (t) => Math.sin(t / 6.5) * 100 + Math.sin(t) * 4;
const y2 = (t) => Math.cos(t / 6.5) * 100 + Math.cos(t / 10) * 4;