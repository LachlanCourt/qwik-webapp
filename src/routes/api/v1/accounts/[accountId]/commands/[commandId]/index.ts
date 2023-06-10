import { RequestHandler } from "@builder.io/qwik-city";
import { getAccount } from "~/common/accessors/getAccount";
import { verifyToken } from "~/common/authentication/verifyToken";
import { db } from "db";
import {
  CommandWebhookTypes,
  use$CommandWebhookHandler,
} from "~/common/webhooks/use$CommandWebhookHandler";
import { getCommands } from "~/common/accessors/getCommands";
import { CommandPageData } from "~/models";
import { getCommand } from "~/common/accessors/getCommand";

export const onDelete: RequestHandler = async (requestEvent) => {
  const { params, redirect, error, json } = requestEvent;
  const payload = await verifyToken(requestEvent);
  if (!payload) throw redirect(302, "/login");

  if (
    Number.isNaN(Number(params.accountId)) ||
    Number.isNaN(Number(params.commandId))
  )
    throw error(404, "Not Found");

  const account = await getAccount(
    Number(params.accountId),
    payload.userId,
    payload.isGlobalAdmin
  );
  if (!account) throw error(404, "Account Not Found");

  const command = await db.command.delete({
    where: { id: Number(params.commandId) },
  });

  const sendWebhookUpdate = use$CommandWebhookHandler();
  await sendWebhookUpdate([command], CommandWebhookTypes.DELETE);

  const commands = await getCommands(account.id);

  json(
    200,
    commands.map((command) => ({
      id: command.id,
      name: command.name,
      accountId: command.accountId,
      response: command.response,
    })) as Array<CommandPageData>
  );
};

// Edit
export const onPost: RequestHandler = async (requestEvent) => {
  const { params, redirect, error, request } = requestEvent;
  const payload = await verifyToken(requestEvent);
  if (!payload) throw redirect(302, "/login");

  if (
    Number.isNaN(Number(params.accountId)) ||
    Number.isNaN(Number(params.commandId))
  )
    throw error(404, "Not Found");

  const account = await getAccount(
    Number(params.accountId),
    payload.userId,
    payload.isGlobalAdmin
  );
  if (!account) throw error(404, "Account not found");
  const command = await getCommand(Number(params.commandId));
  if (!command) throw error(404, "Command not found");

  const previousCommand = structuredClone(command);

  const formData = await request.formData();

  formData.forEach((value, key) => {
    Object(command)[key] = value.toString();
  });

  await db.command.update({ where: { id: command.id }, data: command });

  const sendWebhookUpdate = use$CommandWebhookHandler();
  await sendWebhookUpdate(
    [previousCommand, command],
    CommandWebhookTypes.UPDATE
  );

  throw redirect(302, `/accounts/${account.id}/commands`);
};
