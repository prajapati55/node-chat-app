const express = require('express');
var app = express();
const http = require('http');
const path = require('path');
const publicPath = path.join(__dirname,  '../public');
const socketIO = require('socket.io');
const { generateMessage } = require('./utils/message');

app.use(express.static(publicPath));
const port = process.env.PORT || 3000;

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',(socket) => {
    console.log('new user connected');

    socket.emit('newMessage',generateMessage('Admin','Welcome new user'));
    socket.broadcast.emit('newMessage',generateMessage('Admin','new user joined'));

    socket.on('createMessage', (data,callback) => {
        console.log('new message created ');        
        io.emit('newMessage',generateMessage(data.from, data.text));
        callback('this is from the server');
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
server.listen(port,() => {
    console.log(`server is up on ${port}`);
});