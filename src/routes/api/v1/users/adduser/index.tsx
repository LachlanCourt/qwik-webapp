import { RequestHandler } from "@builder.io/qwik-city";
import { verifyToken } from "~/common/authentication/verifyToken";
import { db } from "db";
import cryptojs from "crypto-js";
import { Tokens } from "~/common/constants";
import { mailer } from "~/common/mailers/mailer";

export const onPost: RequestHandler = async (requestEvent) => {
  const { request, url, redirect, error } = requestEvent;
  const payload = await verifyToken(requestEvent);
  if (!payload) throw redirect(302, "/login");

  const accountId = Number(url.searchParams.get("accountId"));
  if (!accountId) throw error(400, "Account ID is required");

  const account = await db.account.findFirst({
    where: {
      AND: [
        { id: accountId },
        !payload.isGlobalAdmin ? { adminId: payload.userId } : {},
      ],
    },
  });

  if (!account) throw error(404, "Account Not Found");

  const formData = await request.formData();
  const email = formData.get("email")?.toString() || "";

  const token = cryptojs.lib.WordArray.random(32).toString();
  // 24 hours
  const expiry = new Date(Math.floor(Date.now() / 1000) + 1440);

  await db.token.deleteMany({ where: { email, type: Tokens.ADD_NEW_USER } });
  await db.token.create({
    data: { email, token, type: Tokens.ADD_NEW_USER, expiry, accountId },
  });

  const origin = url.origin;

  //TODO THis should probably be pulled out to a template
  const html = `
        <div>
            You have been added to the team for the account ${account.name}!
            Click the following link if you want to join!
            
            <a href="${origin}/api/v1/users/adduser?token=${token}">Join the team</a>
        </div>`;
  const text = `You have been added to the team for the account ${account.name}!
  Copy the following link into your browser if you want to join!
  http://${origin}/api/v1/users/adduser?token=${token}`;

  const mailProvider = mailer({
    to: email,
    html,
    subject: "Add User",
    text,
  });
  await mailProvider.send();

  throw redirect(302, `/accounts/${accountId}`);
};

export const onGet: RequestHandler<Response> = async (requestEvent) => {
  const { url, error, redirect } = requestEvent;
  const token = url.searchParams.get("token");
  if (!token) throw error(401, "Invalid Token. Error Code 1");
  const tokenData = await db.token.findFirst({ where: { token } });
  if (!tokenData) throw error(401, "Invalid Token. Error Code 2");
  const { type, expiry, email, accountId } = tokenData;
  const expired = expiry.getTime() < Math.floor(Date.now() / 1000);
  if (expired) throw error(401, "Invalid Token. Error Code 3");

  const user = await db.user.findFirst({ where: { email } });

  if (type === Tokens.ADD_NEW_USER) {
    if (user) {
      const { moderators } = (await db.account.findFirst({
        where: { id: Number(accountId) },
        select: { moderators: true },
      })) || { moderators: [] };
      if (
        !moderators.find(
          (moderator) =>
            moderator.accountId === accountId && moderator.userId === user.id
        )
      ) {
        const accountUser = await db.accountUsers.create({
          data: {
            userId: user.id,
            accountId: Number(accountId),
            assignedBy: "",
          },
        });
        moderators.push(accountUser);
      }
      await db.token.deleteMany({
        where: { email, type: Tokens.ADD_NEW_USER },
      });
      await db.account.update({
        where: { id: Number(accountId) },
        data: {
          moderators: {
            set: moderators.map((moderator) => ({
              userId_accountId: {
                userId: moderator.userId,
                accountId: moderator.accountId,
              },
            })),
          },
        },
      });
      throw redirect(302, "/accounts");
    } else {
      throw redirect(302, `/users/new?token=${token}`);
    }
  }
  if (type === Tokens.ADD_NEW_ACCOUNT) {
    if (user) {
      throw redirect(302, `/api/v1/accounts/new/?token=${token}`);
    } else {
      throw redirect(302, `/users/new?token=${token}`);
    }
  }
};
