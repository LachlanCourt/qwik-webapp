import { MailerProps } from "./mailer";

const getPreviewEmail = async () => {
  if (process.env.NODE_ENV !== "production") {
    const dependency = await import("preview-email");
    return dependency;
  }
  return null;
};

export const mailer = async (msg: MailerProps) => {
  // Preview email in the browser when in development
  const showEmail = await getPreviewEmail();
  await showEmail.default(msg);
};
