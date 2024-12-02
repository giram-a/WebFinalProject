// // const nodemailer = require("nodemailer");
// import nodemailer from "nodemailer";

// // Generate SMTP service account from ethereal.email
// const sendMail = () => {
//   nodemailer.createTestAccount((err, account) => {
//     if (err) {
//       console.error("Failed to create a testing account. " + err.message);
//       return process.exit(1);
//     }

//     console.log("Credentials obtained, sending message...");

//     // Create a SMTP transporter object
//     let transporter = nodemailer.createTransport({
//       host: account.smtp.host,
//       port: account.smtp.port,
//       secure: account.smtp.secure,
//       auth: {
//         user: account.user,
//         pass: account.pass,
//       },
//     });

//     // Message object
//     let message = {
//       from: "Sender Name <sender@example.com>",
//       to: "Recipient <asatwe@gmail.com>",
//       subject: "Nodemailer is unicode friendly ✔",
//       text: "Hello to myself!",
//       html: "<p><b>Hello</b> to myself!</p>",
//     };

//     transporter.sendMail(message, (err, info) => {
//       if (err) {
//         console.log("Error occurred. " + err.message);
//         return process.exit(1);
//       }

//       console.log("Message sent: %s", info.messageId);
//       // Preview only available when sending through an Ethereal account
//       console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//     });
//   });
// };

// export default sendMail;

// using Twilio SendGrid's v3 Node.js Library

import sgMail from "@sendgrid/mail";
const sendMail = (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: "satwe.a@northeastern.edu", // Change to your recipient
    from: "asatwe@gmail.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };
  sgMail
    .send(msg)
    .then(() => {
      res.status(200).send({ message: "Email sent successfully" });
      console.log("Email sent");
    })
    .catch((error) => {
      res.status(400).send({ error: error.message });
      console.error(error);
    });
};

export default sendMail;
