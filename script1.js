const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

let userCount = 0;

io.on('connection', (socket) => {
  userCount++;
  io.emit('updateUserCount', { userCount });

  socket.on('disconnect', () => {
    userCount--;
    io.emit('updateUserCount', { userCount });
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
