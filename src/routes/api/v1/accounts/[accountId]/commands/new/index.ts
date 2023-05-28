import { RequestHandler } from "@builder.io/qwik-city";
import { verifyToken } from "~/common/authentication/verifyToken";
import { db } from "db";
import { getAccount } from "~/common/accessors/getAccount";
import {
  CommandWebhookTypes,
  use$CommandWebhookHandler,
} from "~/common/webhooks/use$CommandWebhookHandler";

interface Response {}

/**
 * Form data
 */
export const onPost: RequestHandler<Response> = async (requestEvent) => {
  const { params, request, cookie, redirect, error } = requestEvent;
  const payload = await verifyToken(requestEvent);
  if (!payload) throw redirect(302, "/login");
  const formData = await request.formData();

  const name = formData.get("name")?.toString() || "New Command";
  const formResponse =
    formData.get("response")?.toString() || "Command Response";
  const accountId = Number(params.accountId);
  const account = await getAccount(accountId, payload.userId);
  if (!account) throw error(404, "Account Not Found");

  const command = await db.command.create({
    data: { name, accountId, response: formResponse },
  });

  const sendWebhookUpdate = use$CommandWebhookHandler();
  await sendWebhookUpdate([command], CommandWebhookTypes.CREATE);

  throw redirect(302, `/accounts/${accountId}/commands/${command.id}`);
};
