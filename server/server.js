const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;

app.use(express.static('client'));

let history = []; 
let undone = [];  

io.on('connection', (socket) => {
  console.log('✅ New user connected:', socket.id);

  socket.on('join', (name) => {
    socket.data.name = name;
    socket.emit('init', history);
    socket.broadcast.emit('user:join', name);
  });

  socket.on('op:start', (data) => {
    io.emit('op:start', { ...data, user: socket.data.name });
  });

  socket.on('op:points', (data) => {
    io.emit('op:points', { ...data, user: socket.data.name });
  });

  socket.on('op:end', (data) => {
    history.push(data.op);
    undone = []; 
    io.emit('op:end', { ...data, user: socket.data.name });
  });

  
  socket.on('history:undo', () => {
    if (history.length > 0) {
      const stroke = history.pop();
      undone.push(stroke);
      io.emit('history:update', history);
    }
  });


  socket.on('history:redo', () => {
    if (undone.length > 0) {
      const stroke = undone.pop();
      history.push(stroke);
      io.emit('history:update', history);
    }
  });
socket.on('board:clear', () => {
  history = [];
  undone = [];
  io.emit('history:update', history);
});


  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.data.name);
    io.emit('user:left', socket.data.name);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
