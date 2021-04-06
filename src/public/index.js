var socket = io.connect('http://localhost:3000', { forceNew: true });

socket.on('message', function (data) {
	console.log(data);
});
