const amqp = require('amqplib');

class QueueConsumer {
	constructor({ HOST, Queue }) {
		this.HOST = HOST;
		this.Queue = Queue;
	}

	async init() {
		try {
			this.connection = await amqp.connect(this.HOST);
			this.channel = await this.connection.createChannel();
			await this.channel.assertQueue(this.Queue, {
				durable: true,
			});
		} catch (error) {
			console.log(error);
		}
	}

	async consume(onMessage, noAck) {
		if (this.channel) {
			this.channel.consume(this.Queue, (msg) => onMessage(msg.content.toString()), {
				noAck,
			});
		}
	}
}

module.exports = {
	QueueConsumer,
};
