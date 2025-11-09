

const { createDrawingState } = require('./drawing-state');

const rooms = {};

function createRoom(name) {
  if (rooms[name]) return rooms[name];
  const room = {
    name,
    users: {}, 
    state: createDrawingState(),

    addUser(id) {
      this.users[id] = { id };
    },

    removeUser(id) {
      delete this.users[id];
    },

    updateUser(id, meta) {
      if (!this.users[id]) this.users[id] = { id };
      Object.assign(this.users[id], meta);
    },

    getUsers() {
      return Object.values(this.users);
    },

    addOp(op) {
      this.state.addOp(op);
    },

    appendPoints(id, pts) {
      this.state.appendPoints(id, pts);
    },

    finalizeOp(id) {
      this.state.finalizeOp(id);
    },

    undo() {
      this.state.undo();
    },

    redo() {
      this.state.redo();
    },

    getVisibleOps() {
      return this.state.getVisibleOps();
    }
  };
  rooms[name] = room;
  return room;
}

function getRoom(name) {
  return rooms[name];
}

module.exports = { createRoom, getRoom };
