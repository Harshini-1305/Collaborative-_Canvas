const CanvasApp = (() => {
  let canvas, ctx;
  let drawing = false;
  let currentStroke = null;
  let tool = 'brush';
  let color = '#000000';
  let size = 5;
  let history = [];

  function init() {
    canvas = document.getElementById('main-canvas');
    ctx = canvas.getContext('2d');
    resizeCanvas();

    canvas.addEventListener('pointerdown', startDraw);
    canvas.addEventListener('pointermove', drawMove);
    canvas.addEventListener('pointerup', endDraw);

    window.addEventListener('resize', resizeCanvas);
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth - 50;
    canvas.height = window.innerHeight - 150;
    redraw();
  }

  function startDraw(e) {
    drawing = true;
    const pos = getPos(e);
    currentStroke = { id: Date.now(), tool, color, size, points: [pos] };
    WS.emit('op:start', { op: currentStroke });
  }

  function drawMove(e) {
    if (!drawing) return;
    const pos = getPos(e);
    currentStroke.points.push(pos);
    drawStroke(currentStroke);
    WS.emit('op:points', { id: currentStroke.id, points: [pos] });
  }

  function endDraw() {
    if (!drawing) return;
    drawing = false;
    history.push(currentStroke);
    WS.emit('op:end', { op: currentStroke });
    currentStroke = null;
  }

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function drawStroke(stroke) {
    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.size;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalCompositeOperation = stroke.tool === "eraser" ? "destination-out" : "source-over";

    ctx.beginPath();
    const pts = stroke.points;
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) {
      ctx.lineTo(pts[i].x, pts[i].y);
    }
    ctx.stroke();
  }

  function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const stroke of history) {
      drawStroke(stroke);
    }
  }


  function remoteStart(data) {
    const op = data.op;
    drawStroke(op);
  }
  function remotePoints(data) {
    const { id, points } = data;
    const stroke = history.find((s) => s.id === id);
    if (stroke) {
      stroke.points.push(...points);
      drawStroke(stroke);
    }
  }
  function applyHistory(newHistory) {
  history = newHistory || [];
  redraw();
}

  function remoteEnd(data) {
    history.push(data.op);
    drawStroke(data.op);
  }

  function applyHistory(newHistory) {
    history = newHistory || [];
    redraw();
  }

  return {
    init,
    setTool: (t) => (tool = t),
    setColor: (c) => (color = c),
    setSize: (s) => (size = s),
    applyHistory,
    remoteStart,
    remotePoints,
    remoteEnd,
  };
})();

window.CanvasApp = CanvasApp;
