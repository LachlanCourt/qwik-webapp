import { RequestHandler } from "@builder.io/qwik-city";
import { verifyToken } from "~/common/authentication/verifyToken";
import { CommandsResource } from "~/pages/command/CommandsPage";
import { CommandData } from "~/models";
import { getAccount } from "~/common/accessors/getAccount";
import { getCommands } from "~/common/accessors/getCommands";
import { Command } from "@prisma/client";

export const onGet: RequestHandler = async (requestEvent) => {
  const { params, request, cookie, redirect, error, json } = requestEvent;
  const payload = await verifyToken(requestEvent);
  if (!payload) throw redirect(302, "/login");

  const account = await getAccount(Number(params.accountId), payload.userId);
  if (!account) throw error(404, "Account Not Found");

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

export default CommandsResource;
