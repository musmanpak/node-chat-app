
function scrollBottom(){

  var messages = $("#messages");
  var newMessage = messages.children('li:last-child');

  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollHeight + newMessageHeight + lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
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
  var template = $("#message-template").html();
  var formattedTime =   moment(message.createdAt).format('h:mm a');

  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  $("#messages").append(html);
  scrollBottom();
});

// Receiving Location
socket.on('newLocationMessage', function(message){
  var template = $("#location-message-template").html();
  var formattedTime =   moment(message.createdAt).format('h:mm a');

  var html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });
  $("#messages").append(html);
  scrollBottom();
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
