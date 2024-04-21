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
import { Action } from "@prisma/client";

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

  await db.action.deleteMany({
    where: {
      commandId: Number(params.commandId),
    },
  });

  const command = await db.command.delete({
    where: { id: Number(params.commandId) },
  });

  const sendWebhookUpdate = use$CommandWebhookHandler();
  await sendWebhookUpdate([command], CommandWebhookTypes.DELETE);

  const commands = await getCommands(account.id, true);

  json(
    200,
    commands.map((command) => ({
      id: command.id,
      name: command.name,
      accountId: command.accountId,
      actions: command.actions,
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
  const command = await getCommand(Number(params.commandId), true);
  if (!command) throw error(404, "Command not found");

  const previousCommand = structuredClone(command);
  const formData = await request.formData();

  // Update command
  const commandName = (formData.get("name") as string) || command.name;
  await db.command.update({
    where: { id: command.id },
    data: { name: commandName },
  });

  // Update actions
  const actions = (
    JSON.parse((formData.get("actions") as string) || "[]") as Array<Action>
  ).map((action, order) => ({ ...action, commandId: command.id, order }));

  // Delete any actions now removed
  const actionsToCheckForDeletion = actions
    .filter((action) => !!action.id)
    .map((action) => action.id);
  await db.action.deleteMany({
    where: {
      id: {
        notIn: actionsToCheckForDeletion,
      },
      commandId: command.id,
    },
  });

  // Create any new actions
  const actionsToCreate = actions.filter((action) => !action.id);
  if (actionsToCreate.length)
    await db.action.createMany({ data: actionsToCreate });

  // Update existing actions
  const actionsToUpdate = actions.filter((action) => !!action.id);
  await Promise.all(
    actionsToUpdate.map(async (action) => {
      const { commandId, id, ...rest } = action;
      await db.action.update({ where: { id }, data: { ...rest } });
    })
  );

  // Fetch new command after all changes
  const updatedCommand = await getCommand(command.id, true);
  if (!updatedCommand) throw new Error("Command update failed, record deleted");

  const sendWebhookUpdate = use$CommandWebhookHandler();
  await sendWebhookUpdate(
    [previousCommand, updatedCommand],
    CommandWebhookTypes.UPDATE
  );

  throw redirect(302, `/accounts/${account.id}/commands`);
};
