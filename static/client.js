
// keep message scrolled to the bottom
function updateScroll(){
  var messages = document.getElementById("messages");
  messages.scrollTop = messages.scrollHeight;
  }


$(function () {
  var socket = io(); // magic library stuff
  $('form').submit(function(){
    //If form input is empty don't print message
    if ($('#m').val() == "") {return false;}

    socket.emit('chat message', $('#m').val()); // key: 'chat message' value 'form input'
    $('#messages').append(
      $('<div>').addClass("message-container"
    ).append(
      $('<div>').text($('#m').val()).addClass("message right")
    )); // append the message when the user presses enter
    updateScroll();
    $('#m').val(''); // clears the message input form
    return false; // don't do any form related things that would normally happen
  });

  socket.on('chat message', function(msg){
    $('#messages').append(
      $('<div>').addClass("message-container"
    ).append(
      $('<div>').text(msg).addClass("message")
    )); // adds the new message to the messages list
    updateScroll();
  });
});
