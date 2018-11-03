var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

  //Emit create message event to server side
  // socket.emit('createMessage', {
  //   from: 'Andrew',
  //   text: 'Yup, that works for me.'
  // });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

//Receive new message event from server side
socket.on('newMessage', function (message) {
  console.log('newMessage', message);
});
