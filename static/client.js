
$(function () {
  var socket = io(); // magic library stuff
  $('form').submit(function(){
    socket.emit('chat message', $('#m').val()); // key: 'chat message' value 'form input'
    $('#messages').append($('<li class = right>').text($('#m').val())); // append the message when the user presses enter

    $('#m').val(''); // clears the message input form
    return false; // don't do any form realted things that would normally happen
  });
  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg)); // adds the new message to the messages list
  });
});
