import { RequestHandler } from "@builder.io/qwik-city";
import { db } from "db";
import cryptojs from "crypto-js";
import { Tokens } from "~/common/constants";
import { mailer } from "~/common/mailers/mailer";

export const onPost: RequestHandler = async (requestEvent) => {
  const { request, url, json } = requestEvent;

  const formData = await request.formData();
  const email = formData.get("email")?.toString() || "";

  const user = await db.user.findFirst({ where: { email } });

  const successMessage = {
    message:
      "If your account exists, an email has been sent to the specified address",
  };

  if (!user) {
    const securityDelay = async () => {
      return new Promise((resolve) => {
        const randomByte = new Uint32Array(1);
        const randomDelay = (randomByte[0] % 200) + 100;
        setTimeout(() => {
          resolve(null);
        }, randomDelay);
      });
    };
    await securityDelay();
    json(200, successMessage);
    return;
  }
  const token = cryptojs.lib.WordArray.random(32).toString();
  // 24 hours
  const expiry = new Date(Date.now() + 1000 * 60 * 60 * 24);

  await db.token.deleteMany({
    where: { email, type: Tokens.FORGOT_PASSWORD },
  });
  await db.token.create({
    data: { email, token, type: Tokens.FORGOT_PASSWORD, expiry },
  });

  const origin = url.origin;

  const emailLink = `${origin}/users/reset?token=${token}`;

  //TODO THis should probably be pulled out to a template
  const html = `
        <div>
            A request was made to reset your password.
            Click the link below to complete the reset.
            
            <a href=${emailLink}>Reset</a>
        </div>`;
  const text = `A request was made to reset your password.
  Click the link below to complete the reset.
  ${emailLink}`;

  const mailProvider = mailer({
    to: email,
    html,
    subject: "Forgot password",
    text,
  });
  await mailProvider.send();
  json(200, successMessage);
};
