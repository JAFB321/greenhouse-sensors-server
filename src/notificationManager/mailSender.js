const nodemailer = require('nodemailer');

class MailSender {
	constructor(user, pass) {
		this.pass;
		this.user;
	}

	async init() {
		this.transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: this.user,
				pass: this.pass,
			},
		});
	}

	async sendEmail({ from, to, subject, html }) {
		return await this.transporter.sendMail({
			from,
			to,
			subject,
			html,
		});
	}
}

module.exports = { MailSender };
