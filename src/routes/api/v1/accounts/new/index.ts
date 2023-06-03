import { RequestHandler } from "@builder.io/qwik-city";
import { verifyToken } from "~/common/authentication/verifyToken";
import cryptojs from "crypto-js";
import { db } from "db";
import { Tokens } from "~/common/constants";
import { mailer } from "~/common/mailers/mailer";

export const onPost: RequestHandler = async (requestEvent) => {
  const { request, url, redirect, error } = requestEvent;
  const payload = await verifyToken(requestEvent);
  if (!payload) throw redirect(302, "/login");

  const { isGlobalAdmin } = payload;
  if (!isGlobalAdmin) throw error(403, "Missing Permissions");

  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  if (!email) throw error(400, "Email is a required field");

  const token = cryptojs.lib.WordArray.random(32).toString();
  // 24 hours
  const expiry = new Date(Math.floor(Date.now() / 1000) + 1440);

  await db.token.deleteMany({ where: { email, type: Tokens.ADD_NEW_ACCOUNT } });
  await db.token.create({
    data: { email, token, type: Tokens.ADD_NEW_ACCOUNT, expiry },
  });

  const origin = url.origin;

  //TODO This should probably be pulled out to a template
  const html = `
        <div>
            You have been added as an admin for a new account!
            Click the following link if you want to join!
            <a href="${origin}/api/v1/users/adduser?token=${token}">Howdy</a>
        </div>`;

  const mailProvider = mailer({
    to: "lachourt.dev",
    html,
    subject: "Add Account",
    text: "HTML ONLY FOR NOW",
  });
  await mailProvider.send();

  throw redirect(302, `/accounts`);
};

export const onGet: RequestHandler<Response> = async (requestEvent) => {
  const { url, error, redirect } = requestEvent;
  const token = url.searchParams.get("token");
  if (!token) throw error(401, "Invalid Token. Error Code 1");
  const tokenData = await db.token.findFirst({ where: { token } });
  if (!tokenData) throw error(401, "Invalid Token. Error Code 2");
  const { type, expiry, email } = tokenData;
  const expired = expiry.getTime() < Math.floor(Date.now() / 1000);
  if (expired) throw error(401, "Invalid Token. Error Code 3");
  if (type !== Tokens.ADD_NEW_ACCOUNT)
    throw error(401, "Invalid Token. Error Code 4");

  const user = await db.user.findFirst({ where: { email } });
  if (!user) throw error(404, "User Not Found");

  const account = await db.account.create({
    data: { name: "New Account", adminId: user.id },
  });

  throw redirect(302, `/accounts/${account.id}/edit`);
};
