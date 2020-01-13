const config = require('config');
const nodemailer = require('nodemailer');
const htmlToText = require('nodemailer-html-to-text').htmlToText;
const pug = require('pug');
const path = require('path');
const SMTPTransport = require('nodemailer-smtp-transport');

const transporter = nodemailer.createTransport(new SMTPTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  debug: true,
  auth: {
    user: config.get('mailUser.email'),
    pass: config.get('mailUser.password'),
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
  }
}));

transporter.use('compile', htmlToText());

module.exports = async function sendEmail(options) {
  const sender = config.get('mailer').senders.default;

  const html = pug.renderFile(
    path.join(config.get('templatesRoot'), 'email', `${options.template}.pug`),
    options.locals
  );

  const message = {
    from: {
      address: sender.email,
      name: sender.name,
    },
    html,
    to: {
      address: options.to,
    },
    subject: options.subject,
    headers: options.headers || {},
  };

  return await transporter.sendMail(message);
};
