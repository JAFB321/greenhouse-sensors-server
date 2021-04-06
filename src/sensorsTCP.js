const net = require('net');
const serverTCP = net.createServer();

// TCP/IP Server to communicate with the Gateway
const PORT = 4000;
const HOST = 'localhost';

serverTCP.listen(PORT, HOST, () => console.log('TCP/IP server running on port 4000'));

serverTCP.on('connection', (socket) => {
	console.log(`Client connection from: ${socket.remoteAddress}`);
	socket.setEncoding('utf8');

	socket.on('data', (data) => {
		// Gateway sensor info recieved
		// ...
		console.log(`Content: ${data}\n`);
	});

	socket.on('close', () => {
		// Gateway connection closed
		console.log(`Client connection closed: ${socket.remoteAddress}`);
	});

	socket.on('error', () => {
		// Gateway connection closed
		console.log(`Client connection error: ${socket.remoteAddress}`);
	});
});
