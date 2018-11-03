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

  //Emit new message event to a specific client
  // socket.emit('newMessage', {
  //   from: 'John',
  //   text: 'See you then',
  //   createdAt: 123123
  // });

  //Will show welome message to specific client
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app',
    createdAt: new Date().getTime()
  });

  //Like io.emit, will emit messages to all single users but except the sender(this socket user)
  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user joined',
    createdAt: new Date().getTime()
  });

  //Receive create message event from client side
  socket.on('createMessage', (message) => {
    console.log('createMessage', message);

    //io.emit will emit messages to all single users
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });

  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
