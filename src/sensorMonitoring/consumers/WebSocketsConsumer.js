const { QueueConsumer } = require('../../RabbitMQ/QueueConsumer');
const { RABBIT_URL: HOST, RABBIT_WEBSOCKETS_QUEUE: Queue } = process.env;

class WebSocketsConsumer extends QueueConsumer {
	constructor() {
		super({ HOST, Queue });
	}

	async consume(onMessage) {
		super.consume(onMessage, true);
	}
}

module.exports = { WebSocketsConsumer };
