    var socket = io();

    socket.on('connect',function(){
      console.log('connection established');
      socket.emit('createEmail',{
          to: "julie@example.com",
          text: "Hey  whats up",
          cretaedAt: new Date().toDateString()
      })
    });

    socket.on('disconnect',function(){
      console.log('discoonected from tge server');
    });

    //new email
    socket.on('newEmail', function(emailData){
        console.log('new email got',emailData);
    });