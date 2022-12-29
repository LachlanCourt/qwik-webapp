import { JSXChildren } from '@builder.io/qwik'
// let previewEmail: Function;
// if (process.env.NODE_ENV !== "production") {
//     previewEmail = require("preview-email")
// }

const getPreviewEmail = async () => {
    if (process.env.NODE_ENV !== "production") {
        const dependency = await import('preview-email');
        return dependency;
    }
    return null;
}

interface MailerProps {
    to: string;
    from?: string;
    subject: string;
    html: JSXChildren;
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
                const previewEmail = await getPreviewEmail()
                await previewEmail.default(msg)
            }
        },
    }
}