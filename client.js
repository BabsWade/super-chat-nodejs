var socket = io();
$('form').submit(function(e) {  
	e.preventDefault(); 
	var message = {   
		text : $('#m').val()
		}  
		$('#m').val('');
if (message.text.trim().length !== 0) { 
	socket.emit('chat-message', message); 
}     
$('#chat input').focus(); 
socket.on('chat-message', function (message) {
    $('#messages').append($('<li>').text(message.text));
	}); 
})