import sgMail from "@sendgrid/mail";
import { emailTemplates } from "./emailTemplate.js";

const sendMail = (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const { type, to } = req.body;

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
    from: process.env.SENDGRID_VERIFIED_SENDER || "asatwe@gmail.com",
    subject: template.subject,
    html: template.html,
  };

  sgMail
    .send(msg)
    .then(() => {
      res.status(200).send({ message: "Email sent successfully" });
    })
    .catch((error) => {
      res.status(400).send({ error: error.message });
      console.error(error);
    });
};

export default sendMail;
