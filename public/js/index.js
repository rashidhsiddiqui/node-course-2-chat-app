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

//Receive new location message event from server side
socket.on('newLocationMessage', function (message) {
  console.log('newLocationMessage', message);

  var li = $("<li></li>");
  var a = $("<a target='_blank'>My current location</a>");
  li.text(`${message.from}: `);
  a.attr("href", message.url);
  li.append(a);
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

var sendLocationButton = $("#send-location");

sendLocationButton.on("click", function(){

  if(!navigator.geolocation)
  {
    return alert("Geolocation is not available for your browser.");
  }

  navigator.geolocation.getCurrentPosition(function(position) {
    socket.emit("createLocationMessage", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  }, function(){
    alert("Unable to fetch location.");
  });

});
