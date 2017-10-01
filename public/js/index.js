// Reqest server to open web socket
var socket = io();

// upon successfull connection
socket.on('connect', function(){

  console.log('connected to server');

});

// Disconnection
socket.on('disconnect', function(){
  console.log('disconnected from server');
});


// Receiving new message
socket.on('newMessage', function (message) {
  console.log('New Mesasge', message);
  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  $("#messages").append(li);

});




$("#message-form").on('submit', function(e){

  e.preventDefault();

  socket.emit('createMessage', {

    from : 'Frank2',
    text : $("#name").val()

  }, function (res){
    // res is from server callback
    console.log('Success!');
  });

});
