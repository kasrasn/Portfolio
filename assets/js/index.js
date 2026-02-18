document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("background-canvas");
  var ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Reload the page after user stops resizing for 300ms
  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      window.location.reload();
    });
  });

  var t = 0;
  var num_lines = 800;
  var innerScale = 1;    // inner balls are half the size (2 vs 4)

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let shiftX = canvas.width / 2;
    let shiftY = canvas.height / 2;
    let gap = 100;
    margin = 250;

    // ── First ball (orange, above center) ──
    for (let i = 0; i < num_lines; i++) {
      lx1 = x1(t + i) * 2 + shiftX;
      ly1 = y1(t + i) * 2 + shiftY - gap + margin;
      lx2 = x2(t + i) * 2 + shiftX;
      ly2 = y2(t + i) * 2 + shiftY - gap + margin;

      ctx.beginPath();
      ctx.moveTo(lx1, ly1);
      ctx.lineTo(lx2, ly2);
      ctx.strokeStyle = `rgb(213, 80, 107)`;
      //rgb(213, 80, 107)
      ctx.lineWidth = 0.4;
      ctx.stroke();
      ctx.closePath();
    }

    // ── Second ball (dark red, below center) ──
    for (let i = 0; i < num_lines; i++) {
      lx1 = x1(t + i) * 2 + shiftX;
      ly1 = y1(t + i) * 2 + shiftY + gap + margin;
      lx2 = x2(t + i) * 2 + shiftX;
      ly2 = y2(t + i) * 2 + shiftY + gap + margin;

      ctx.beginPath();
      ctx.moveTo(lx1, ly1);
      ctx.lineTo(lx2, ly2);
      ctx.strokeStyle = `rgb(70, 5, 5)`;
      //rgb(70, 5, 5)
      ctx.lineWidth = 0.4;
      ctx.stroke();
      ctx.closePath();
    }

    // ── Inner first ball (opposite direction, above center) ──
    for (let i = 0; i < num_lines; i++) {
      lx1 = x1(-t + i) * innerScale + shiftX;
      ly1 = y1(-t + i) * innerScale + shiftY - gap + margin;
      lx2 = x2(-t + i) * innerScale + shiftX;
      ly2 = y2(-t + i) * innerScale + shiftY - gap + margin;

      ctx.beginPath();
      ctx.moveTo(lx1, ly1);
      ctx.lineTo(lx2, ly2);
      ctx.strokeStyle = `rgb(10, 180, 180)`;
      ctx.lineWidth = 0.4;
      ctx.stroke();
      ctx.closePath();
    }

    // ── Inner second ball (opposite direction, below center) ──
    for (let i = 0; i < num_lines; i++) {
      lx1 = x1(-t + i) * innerScale + shiftX;
      ly1 = y1(-t + i) * innerScale + shiftY + gap + margin;
      lx2 = x2(-t + i) * innerScale + shiftX;
      ly2 = y2(-t + i) * innerScale + shiftY + gap + margin;

      ctx.beginPath();
      ctx.moveTo(lx1, ly1);
      ctx.lineTo(lx2, ly2);
      ctx.strokeStyle = `rgb(222, 62, 123)`;
      //rgb(222, 62, 123)
      //rgb(95, 8, 41)
      ctx.lineWidth = 0.4;
      ctx.stroke();
      ctx.closePath();
    }


    // ── Inner third ball (same direction as outer, below center) scale * 0.5, black ──
    for (let i = 0; i < num_lines; i++) {
      lx1 = x1(t + i) * 0.5 + shiftX;
      ly1 = y1(t + i) * 0.5 + shiftY + gap + margin; 
      lx2 = x2(t + i) * 0.5 + shiftX;
      ly2 = y2(t + i) * 0.5 + shiftY + gap + margin;
      ctx.beginPath();
      ctx.moveTo(lx1, ly1);
      ctx.lineTo(lx2, ly2);
      ctx.strokeStyle = `rgba(0, 0, 0, 0.6)`;
      //rgb(0, 0, 0, 0.6)
      ctx.lineWidth = 0.4;
      ctx.stroke();
      ctx.closePath();
    }

        // ── Inner third ball (same direction as outer, below center) scale * 0.5, black ──
    for (let i = 0; i < num_lines; i++) {
      lx1 = x1(t + i) * 0.5 + shiftX;
      ly1 = y1(t + i) * 0.5 + shiftY - gap + margin;
      lx2 = x2(t + i) * 0.5 + shiftX;
      ly2 = y2(t + i) * 0.5 + shiftY - gap + margin;
      ctx.beginPath();
      ctx.moveTo(lx1, ly1);
      ctx.lineTo(lx2, ly2);
      ctx.strokeStyle = `rgba(0, 0, 0, 0.6)`;
      ctx.lineWidth = 0.4;
      ctx.stroke();
      ctx.closePath();
    }

    t += 0.0045;
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