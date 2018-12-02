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

  var li = $("<li></li>");
  li.text(`${message.from}: ${message.text}`);
  $("#messages").append(li);
});

// socket.emit('createMessage', {
//   from: 'Frank',
//   text: 'Hi.'
// }, function(data){ //callback function to receive response from server after sending the data whether it is received or not
//   console.log("Got it!", data);
// });

$("#message-form").on("submit", function(e){
  e.preventDefault();

  socket.emit('createMessage', {
    from: "user",
    text: $("[name=message]").val()
  });
});
