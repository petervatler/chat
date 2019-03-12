const express = require('express');
const app = express();
const server = app.listen(3000); // Creating a HTTP server
const io = require('socket.io').listen(server); // Creating a WS server from HTTP server

//listen on every connection
io.on('connection', (socket) => {
	console.log('New user connected')

	//default username
	socket.username = 'Anonymous'

    //listen on change_username
    socket.on('changeUsername', (data) => {
        socket.username = data.username
    })

    //listen on new_message
    socket.on('newMessage', (data) => {
        //broadcast the new message
        io.sockets.emit('newMessage', {message : data.message, username : socket.username});
    })

    //listen on typing
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })
})

// Assets middleware
app.use(express.static(`${__dirname}/public`));

// Routes
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
})