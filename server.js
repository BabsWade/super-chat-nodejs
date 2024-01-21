var express = require('express'); 
var app = express(); 
var http = require('http').Server(app);
var io = require('socket.io')(http); 
	app.use("/", express.static(__dirname + "/public"));  
	io.on('connection', function(socket){   
	console.log('a user connected'); 
	socket.on('disconnect', function(){     
	console.log('user disconnected');   
});
 
	socket.on('chat-message', function (message) {     
	console.log('message : ' + message.text);   
}); 
}); 
	http.listen(3000, function(){   
	console.log('Server is listening on *:3000'); 
});
 