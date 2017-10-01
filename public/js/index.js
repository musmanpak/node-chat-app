function generateTag(val){
  return `<${val}></${val}>`;
}

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
  var formattedTime =   moment(message.createdAt).format('h:mm a');
  var li = $('<li></li>');
  li.text(`${message.from} ${formattedTime}: ${message.text}`);
  $("#messages").append(li);
});

// Receiving Location
socket.on('newLocationMessage', function(message){
  var formattedTime =   moment(message.createdAt).format('h:mm a');
  var li = $('<li></li>');
  var a = $('<a tagert="_blank">My Current Location</a>');
  li.text(`${message.from} ${formattedTime}: `);
  a.attr('href', message.url);
  li.append(a);
  $("#messages").append(li);
});



// Sending Message
$("#message-form").on('submit', function(e){
  var messageTextBox = $("#name");
  e.preventDefault();
  if(messageTextBox.val() != ''){
    socket.emit('createMessage', {
      from : 'Frank2',
      text : messageTextBox.val()
      }, function (){
      // res is from server callback
      messageTextBox.val('');
    });
  }
});


// Sending Location
var locationBtn = $("#send-location");
locationBtn.on('click', function(){
  if(!navigator.geolocation)
    return alert('Geolocation not supported for your browser');

  locationBtn.attr('disabled', true).text('Sending location');
  navigator.geolocation.getCurrentPosition( function(position){
    locationBtn.removeAttr('disabled').text('Send location');
    console.log(position);
    socket.emit('createLocationMessage',{
      longitude: position.coords.longitude,
      latitude: position.coords.latitude
    }, );

  }, function(){
    alert('Unable to fetch Location');
  });
});
