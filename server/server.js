// Node Modules
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

// Constant declared for app
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();

var server = http.createServer(app);

var io = socketIO(server);

app.use(express.static(publicPath));

// Using Socket.IO for handling connection

// Incomming connections
io.on('connection', (socket)  =>  {

  console.log('New user connected')

  socket.emit('newMessage', {
    from : 'Admin',
    text : 'Welcome to chat app',
    createdAt : new Date().getTime()
  });

  // socket.broadcaste.emit from Admin text New User joined
  socket.broadcast.emit('newMessage', {
    from : 'Admin',
    text : 'New User Joined',
    createdAt : new Date().getTime()
  });

  // socket.on('createMessage', (newMessage) =>  {
  //   console.log('createMessage', newMessage);
  //
  // });



  socket.on('disconnect', () => {
    console.log('user was disconnected');
  });
})

server.listen(port, () => {
    console.log('Server running successfully');
});
