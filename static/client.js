// The client side javascript
$(document).ready( function () {
  $('nameInput').click();
});

$(function () {

  var socket = io(); // magic library stuff
  var username


  // keep message scrolled to the bottom
  function updateScroll(){
    var messages = document.getElementById("messages");
    messages.scrollTop = messages.scrollHeight;
  }

  //Set nickname of user
  $('#nameForm').submit(function(){
    username = $('#nameInput').val();   //set username varaible
    $('#nameForm').remove();   //remove nameForm div

    $('#messages').append( //adds welcome message
      $('<div>').addClass("message-container"
    ).append( //
      $('<div>').text('Hi ' + username + ', welcome to chat application.').addClass("update")
    ));

    $("#m").prop('disabled', false);  // enable message form input
    $('#messages').css('display', 'block')   //
    $('#messageForm').css('opacity', '1.0')   // update opacity of message form
    $('#m').focus(); //focus on message input
    return false;   // don't do any form related things that would normally happen
  });

  //Handles messages sent by the user
  $('#messageForm').submit(function(){
    var time = moment().format('LT');

    //If form input is empty don't print message
    if ($('#m').val() == "") {return false;}

    socket.emit('add username', username); // Sends key: 'add username' value 'username'
    socket.emit('chat message', $('#m').val()); // Sends key: 'chat message' value 'form input'

    $('#messages').append(
      $('<div>').addClass("message-container"
    ).append(   // append the message when the user presses enter
      $('<div>').text($('#m').val()).addClass("message right")
        .append( // adds the new message to the messages list
          $('<span>').text(time).addClass("time")
        )
    ));

    updateScroll();
    $('#m').val(''); // clears the message input form
    return false; // don't do any form related things that would normally happen
  });

  //Handles messages sent by other users
  socket.on('chat message', function(msg){
    var time = moment().format('LT');
    
    $('#messages').append(
      $('<div>').addClass("message-container"
    ).append( // adds the new message to the messages list
      $('<div>').text(msg).addClass("message")
        .append( // adds the new message to the messages list
          $('<span>').text(time).addClass("time")
        )
    ));

    updateScroll();
  });

  //Handle usernames
  socket.on('add username', function(msg){
    $('#messages').append(
      $('<div>').addClass("message-container"
    ).append( // adds the new message to the messages list
      $('<div>').text(msg).addClass("display-username")
    ));

    updateScroll();
  });

  //Handles updates
  socket.on('chat update', function(msg){
    $('#messages').append(
      $('<div>').addClass("message-container"
    ).append( // adds the new message to the messages list
      $('<div>').text(msg).addClass("update")
    ));

    updateScroll();
  });
});
