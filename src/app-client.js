import './style.scss';
import 'jquery';
import 'socket.io-client';

$(function(){

 var socket = io.connect('localhost:3000')


 var message = $("#message")
 
 
 var username = $("#username")
 var send_message = $("#send_message")
 var send_username = $("#send_username")
 var chatroom = $("#chatroom")
 var feedback = $("#feedback")


 send_message.click(function(){
     socket.emit('newMessage', {message : message.val()})
 })


 socket.on("newMessage", (data) => {
     feedback.html('');
     message.val('');
     chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
 })


 send_username.click(function(){
     socket.emit('changeUsername', {username : username.val()})
 })


 message.bind("keypress", () => {
     socket.emit('typing')
 })


 socket.on('typing', (data) => {
     feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
 })
});