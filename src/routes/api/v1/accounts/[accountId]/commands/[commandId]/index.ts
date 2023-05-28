import { RequestHandler } from "@builder.io/qwik-city";
import { getAccount } from "~/common/accessors/getAccount";
import { verifyToken } from "~/common/authentication/verifyToken";
import { db } from "db";
import {
  CommandWebhookTypes,
  use$CommandWebhookHandler,
} from "~/common/webhooks/use$CommandWebhookHandler";
import { getCommands } from "~/common/accessors/getCommands";
import { CommandData } from "~/models";

export const onDelete: RequestHandler = async (requestEvent) => {
  const { params, redirect, error, json } = requestEvent;
  const payload = await verifyToken(requestEvent);
  if (!payload) throw redirect(302, "/login");

  if (
    Number.isNaN(Number(params.accountId)) ||
    Number.isNaN(Number(params.commandId))
  )
    throw error(404, "Not Found");

  const account = await getAccount(Number(params.accountId), payload.userId);
  if (!account) throw error(404, "Account Not Found");

  const command = await db.command.delete({
    where: { id: Number(params.commandId) },
  });

  const sendWebhookUpdate = use$CommandWebhookHandler();
  await sendWebhookUpdate(command, CommandWebhookTypes.DELETE);

  const commands = await getCommands(account.id);

  json(
    200,
    commands.map((command) => ({
      commandId: command.id,
      name: command.name,
      accountId: command.accountId,
      response: command.response,
    })) as Array<CommandData>
  );
};
