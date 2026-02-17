document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("background-canvas");
  var ctx = canvas.getContext("2d");

  // Only resize on width change to prevent flicker on mobile scroll
  // (mobile browsers resize viewport height when address bar hides/shows)
  var lastWidth = window.innerWidth;

  function resizeCanvas() {
    var newWidth = window.innerWidth;
    if (newWidth !== lastWidth) {
      canvas.width = newWidth;
      canvas.height = window.innerHeight;
      lastWidth = newWidth;
    }
  }

  // Initial size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", resizeCanvas);

  var t = 0;
  var num_lines = 800;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let shiftX = canvas.width / 2;
    let shiftY = canvas.height / 2;
    let gap = 125; // half the distance between the two balls

    // ── First ball (green, above center) ──
    for (let i = 0; i < num_lines; i++) {
      lx1 = x1(t + i) * 2 + shiftX;
      ly1 = y1(t + i) * 2 + shiftY - gap;
      lx2 = x2(t + i) * 2 + shiftX;
      ly2 = y2(t + i) * 2 + shiftY - gap;

      ctx.beginPath();
      ctx.moveTo(lx1, ly1);
      ctx.lineTo(lx2, ly2);
      ctx.strokeStyle = `rgba(77, 250, 92, 0.45)`;
      ctx.lineWidth = 0.4;
      ctx.stroke();
      ctx.closePath();
    }

    // ── Second ball (purple, below center) ──
    for (let i = 0; i < num_lines; i++) {
      lx1 = x1(t + i) * 2 + shiftX;
      ly1 = y1(t + i) * 2 + shiftY + gap;
      lx2 = x2(t + i) * 2 + shiftX;
      ly2 = y2(t + i) * 2 + shiftY + gap;

      ctx.beginPath();
      ctx.moveTo(lx1, ly1);
      ctx.lineTo(lx2, ly2);
      ctx.strokeStyle = `rgba(180, 77, 250, 0.45)`;
      ctx.lineWidth = 0.4;
      ctx.stroke();
      ctx.closePath();
    }

    t += 0.003;
    requestAnimationFrame(draw);
  }

  draw();
});

const x1 = (t) => {
  return Math.cos(0.3 * t) * 100 + Math.sin(t / 10) * 4;
};

const y1 = (t) => {
  return Math.sin(0.3 * t) * 100;
};

const x2 = (t) => {
  return Math.sin(t / 6.5) * 100 + Math.sin(t) * 4;
};

const y2 = (t) => {
  return Math.cos(t / 6.5) * 100 + Math.cos(t / 10) * 4;
};