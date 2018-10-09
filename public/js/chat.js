var socket = io();

socket.on('connect',function(){
    console.log('connected to the server');
    // socket.emit('createMessage',{
    //     to:"jain@example.com",
    //     text: "How are you doing man"
    // },function(data){
    //     console.log('got it');
    //     console.log(data);
    // })
});

socket.on('newMessage',function(message){
    var li = jQuery('<li></li>');
    li.text(`${message.from} : ${message.text}`);
    jQuery('#messages').append(li);
})

socket.on('disconnect',function(){
    console.log('You are disconnected');
})

jQuery('#message-form').on('submit',function(ev){
    ev.preventDefault();
    socket.emit('createMessage',{
        from: 'User',
        text:jQuery('[name=message]').val()
    },function(){
        
    })
})