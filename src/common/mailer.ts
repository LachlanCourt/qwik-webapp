let previewEmail: Function;
if (process.env.NODE_ENV !== "production") {
    previewEmail = () => require("preview-email")
}

interface MailerProps {
    to: string;
    from?: string;
    subject: string;
    html: string;
    text: string;
}

export const mailer = ({ to, from = "lachourt.dev", subject, html, text }: MailerProps) => {
    const msg = {
        to,
        subject,
        html,
        text
    }

    return {
        async send() {
            if (process.env.NODE_ENV === "production") {
                //TODO Add sendgrid integration
                // mailer(msg)
            } else {
                // Preview email in the browser when in development
                await previewEmail(msg)
            }
        },
    }
}