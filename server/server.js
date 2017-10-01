// Node Modules
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

// Constant declared for app
const generateMessage = require('./utils/message').generateMessage;
const generateLocationMessage = require('./utils/message').generateLocationMessage;
const isRealString = require('./utils/validation').isRealString;
const Users = require('./utils/users').Users;


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();

var server = http.createServer(app);

var io = socketIO(server);

var users = new Users();

app.use(express.static(publicPath));

// Using Socket.IO for handling connection

// Incomming connections
io.on('connection', (socket)  =>  {

  console.log('New user connected')

  // upon joining chat room
  socket.on('join', (params, callback) => {
    if(!(isRealString(params.name) && isRealString(params.room))){
      return callback('Name and Room Name are required');
    }


    // This line will join people in the same room
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    // welcome to chat
    socket.emit('newMessage',generateMessage('Admin', 'Welcome to chat app'));

    // alerting other users
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', params.name + ' has joined '));

  });

  // sending message
  socket.on('createMessage', (message, callback) => {
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  //creating location
  socket.on('createLocationMessage', (coords) => {
    // io.emit('newMessage', generateMessage('Admin',`${coords.latitude}, ${coords.longitude}`));
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);
    if(user){
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', user.name + ' has left'));
    }
    console.log('user was disconnected');

  });
})

server.listen(port, () => {
    console.log('Server running successfully');
});
