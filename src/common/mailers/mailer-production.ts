import * as sgMail from "@sendgrid/mail";
import { MailerProps } from "./mailer";
sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

export const mailer = (content: MailerProps) => {
  const fromAddress = process.env.SENDGRID_FROM_ADDRESS;
  if (!fromAddress) {
    console.error("Missing From Address");
    return;
  }

  const msg = {
    from: fromAddress,
    ...content,
  };
  sgMail
    .send(msg)
    .then((response) => {
      console.log("Email sent");
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
      console.error(error.response.body);
    });
};
