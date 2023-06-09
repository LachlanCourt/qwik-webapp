import { mailer as sendEmail } from "./mailer-production";
import { mailer as previewEmail } from "./mailer-dev";

export interface MailerProps {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export const mailer = (msg: MailerProps) => {
  return {
    async send() {
      if (process.env.NODE_ENV === "production" || true) {
        sendEmail(msg);
      } else {
        previewEmail(msg);
      }
    },
  };
};
