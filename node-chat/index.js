// import required packages
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// set the port no.
var port = process.env.PORT || 3000;

server.listen(port, function() {
	console.log('Serving at port %d', port);
});

// serve public dir
app.use(express.static(__dirname + '/public'));

// users which are currently connected to the chat
var onlineClients = {};
var usernames = {};
var numUsers = 0;

io.on('connection', function(socket) {
	var addedUser = false;

	// when the client emits 'new message', this listens and executes
	socket.on('new message', function(data) {
		// we tell the client to execute 'new message'
		socket.broadcast.emit('new message', {
			username: socket.username,
			message: data
		});
	});

	// when the client emits 'add user', this listens and executes
	socket.on('add user', function(username) {
		// we store the username in the socket session for this client
		socket.username = username;
		// add the client's username to the global list
		usernames[username] = username;
		onlineClients[username] = socket.id;
		++numUsers;
		addedUser = true;
		socket.emit('login', {
			usernames: usernames,
			numUsers: numUsers
		});
		// echo globally (all clients) that a person has connected
		socket.broadcast.emit('user joined', {
			username: socket.username,
			numUsers: numUsers
		});
	});

	// when the client emits 'typing', we broadcast it to others
	socket.on('typing', function() {
		socket.broadcast.emit('typing', {
			username: socket.username
		});
	});

	// when the client emits 'stop typing', we broadcast it to others
	socket.on('stop typing', function() {
		socket.broadcast.emit('stop typing', {
			username: socket.username
		});
	});

	// when the user disconnects.. perform this
	socket.on('disconnect', function() {
		// remove the username from global usernames list
		if (addedUser) {
			delete usernames[socket.username];
			--numUsers;

			// echo globally that this client has left
			socket.broadcast.emit('user left', {
				username: socket.username,
				numUsers: numUsers
			});
		}
	});
	// private message
	socket.on('pm', function(to,user, message) {
    	var id = onlineClients[to];
    	console.log('pm :' + to);
    	if(io.sockets.connected[id]){
    		io.sockets.connected[id].emit('pm', {
    				username:user,
    				message: message
    			});
    	}
	});
});