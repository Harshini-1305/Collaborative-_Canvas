

function createDrawingState() {
  const ops = [];   
  const undone = [];

  return {
    addOp(op) {
      ops.push({ ...op, removed: false });
      undone.length = 0; 
    },

    appendPoints(id, points) {
      const found = ops.find(o => o.id === id);
      if (found) {
        found.points = found.points.concat(points);
      }
    },

    finalizeOp(id) {
      const found = ops.find(o => o.id === id);
      if (found) found.finalized = true;
    },

    undo() {
     
      const visible = ops.filter(o => !o.removed);
      if (visible.length === 0) return;
      const last = visible[visible.length - 1];
      last.removed = true;
      undone.push(last);
    },

    redo() {
      const lastUndone = undone.pop();
      if (!lastUndone) return;
      lastUndone.removed = false;
    },

    getVisibleOps() {
      return ops.filter(o => !o.removed);
    }
  };
}

module.exports = { createDrawingState };
