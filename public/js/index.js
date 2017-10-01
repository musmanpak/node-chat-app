// Reqest server to open web socket
var socket = io();

// upon successfull connection
socket.on('connect', function(){

  console.log('connected to server');

});


socket.on('disconnect', function(){
  console.log('disconnected from server');
});

socket.on('newMessage', function (email) {
  console.log('New Mesasge', email);
});
