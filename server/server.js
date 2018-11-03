const path = require("path");
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

var app = express();
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, "../public");

//middleware
app.use(express.static(publicPath));

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

//on new user connect event
io.on('connection', (socket) => {
  console.log('New user connected');

  //on disconnect event
  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
