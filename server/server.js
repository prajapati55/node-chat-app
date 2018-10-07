const express = require('express');
var app = express();
const http = require('http');
const path = require('path');
const publicPath = path.join(__dirname,  '../public');
const socketIO = require('socket.io');

app.use(express.static(publicPath));
const port = process.env.PORT || 3000;

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',(socket) => {
    console.log('Welcome new connection');

    socket.on('createMessage', (data) => {
        console.log('new message created ');
        // console.log(data);
        // io.emit('newMessage',{
        //     from: data.from,
        //     text: data.text
        // })

        socket.broadcast.emit('newMessage',{
            from: data.from,
            text: data.text
        })
    })

    socket.emit('newMessage',{
        from: 'tony@gmail.com',
        text: "Hello bro"
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
server.listen(port,() => {
    console.log(`server is up on ${port}`);
});