const WS = (() => {
  const socket = io();

  socket.on('connect', () => {
    const name = prompt("Enter your name:");
    socket.emit('join', name || 'Anonymous');
  });

  socket.on('init', (history) => {
    CanvasApp.applyHistory(history);
  });

  socket.on('op:start', (data) => CanvasApp.remoteStart(data));
  socket.on('op:points', (data) => CanvasApp.remotePoints(data));
  socket.on('op:end', (data) => CanvasApp.remoteEnd(data));
  socket.on('history:update', (history) => CanvasApp.applyHistory(history));

  return {
    emit: (event, data) => socket.emit(event, data)
  };
})();
