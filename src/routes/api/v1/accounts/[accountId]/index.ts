import { RequestHandler } from "@builder.io/qwik-city";
import { verifyToken } from "~/common/authentication/verifyToken";
import { db } from "db";
import { getAccount } from "~/common/accessors/getAccount";
import { use$EditAccountWebhookHandler } from "~/common/webhooks/use$EditAccountWebhookHandler";
import { getCommands } from "~/common/accessors/getCommands";

export const onPost: RequestHandler = async (requestEvent) => {
  const { params, request, redirect, error } = requestEvent;
  const payload = await verifyToken(requestEvent);
  if (!payload) throw redirect(302, "/login");

  const account = await getAccount(
    Number(params.accountId),
    payload.userId,
    payload.isGlobalAdmin
  );
  if (!account) throw error(404, "Account Not Found");

  const formData = await request.formData();

  const name = formData.get("name")?.toString() || "";

  await db.account.update({ where: { id: account.id }, data: { name } });

  const newAccount = await getAccount(
    Number(params.accountId),
    payload.userId,
    payload.isGlobalAdmin
  );
  if (!newAccount) throw error(404, "Error saving Account - Account Not Found");

  const commands = await getCommands(newAccount.id, true);

  const sendWebhookUpdate = use$EditAccountWebhookHandler();
  await sendWebhookUpdate(newAccount, commands);

  throw redirect(302, `/accounts/${newAccount.id}`);
};
