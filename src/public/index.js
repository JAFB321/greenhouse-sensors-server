var socket = io.connect('http://localhost:3000', { forceNew: true });

socket.on('sensor', function (data) {
	console.log(data);
});
