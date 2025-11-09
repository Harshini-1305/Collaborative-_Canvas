window.addEventListener("DOMContentLoaded", () => {
  CanvasApp.init();

  document.getElementById("brushBtn").addEventListener("click", () => {
    CanvasApp.setTool("brush");
    setActive("brushBtn");
  });
  document.getElementById("eraserBtn").addEventListener("click", () => {
    CanvasApp.setTool("eraser");
    setActive("eraserBtn");
  });
  document.getElementById("colorPicker").addEventListener("input", (e) => CanvasApp.setColor(e.target.value));
  document.getElementById("sizeSlider").addEventListener("input", (e) => CanvasApp.setSize(e.target.value));
  document.getElementById("undoBtn").addEventListener("click", () => WS.emit("history:undo"));
  document.getElementById("redoBtn").addEventListener("click", () => WS.emit("history:redo"));
  document.getElementById("clearBtn").addEventListener("click", () => {
    if (confirm("Clear the entire board for everyone?")) {
      WS.emit("board:clear");
    }
  });

  function setActive(id) {
    document.querySelectorAll(".tool-btn").forEach(b => b.classList.remove("active"));
    document.getElementById(id).classList.add("active");
  }
});
