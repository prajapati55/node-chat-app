var socket = io();

socket.on('connect',function(){
    console.log('connected to the server');

    socket.emit('createMessage',{
        to:"jain@example.com",
        text: "How are you doing man"
    })
});

socket.on('newMessage',function(message){
    console.log('we got new message');
    console.log(message);
})

socket.on('disconnect',function(){
    console.log('You are disconnected');
})