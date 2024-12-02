import sgMail from "@sendgrid/mail";
import { emailTemplates } from "./emailTemplates.js";

const sendMail = (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const { type, to } = req.body; // Assume the request body contains the email type and recipient

  let template;
  if (type === "premiumPurchase") {
    template = emailTemplates.premiumPurchase;
  } else if (type === "companyApproval") {
    template = emailTemplates.companyApproval;
  } else {
    return res.status(400).send({ error: "Invalid email type" });
  }

  const msg = {
    to: to,
    from: process.env.SENDGRID_VERIFIED_SENDER || "noreply@futurehire.com", // Use an environment variable for the sender
    subject: template.subject,
    html: template.html,
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
