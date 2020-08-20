const Mailgen = require('mailgen');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const sendEmail = async (verificationToken, email, name) => {
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'GoIT Node.js',
      link: `http://localhost:${process.env.PORT || 3000}/`,
    },
  });

  const template = {
    body: {
      name,
      intro:
        "Welcome to GoIT Node.js! We're very excited to have you on board.",
      action: {
        instructions: 'To get started with GoIT Node.js, please click here:',
        button: {
          color: '#22BC66',
          text: 'Confirm your account',
          link: `http://localhost:${
            process.env.PORT || 3000
          }/auth/verify/${verificationToken}`,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  const emailBody = mailGenerator.generate(template);

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const message = {
    to: email,
    from: 'garnetfly@meta.ua',
    subject: 'Confirm your account',
    text: 'to access GoIT Node.js',
    html: emailBody,
  };

  try {
    await sgMail.send(message);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
};

module.exports = sendEmail;
