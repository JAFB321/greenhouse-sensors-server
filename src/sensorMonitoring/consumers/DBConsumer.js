const { QueueConsumer } = require('../../RabbitMQ/QueueConsumer');
const { RABBIT_URL: HOST, RABBIT_DB_QUEUE: Queue } = process.env;

class DBConsumer extends QueueConsumer {
	constructor() {
		super({ HOST, Queue });
	}

	async consume(onMessage) {
		await super.consume(onMessage, false);
	}
}

module.exports = { DBConsumer };
