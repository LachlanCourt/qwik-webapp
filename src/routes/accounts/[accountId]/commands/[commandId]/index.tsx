import { RequestHandler } from "@builder.io/qwik-city";
import { verifyToken } from "~/common/authentication/verifyToken";
import { CommandResource } from "~/pages/command/CommandPage";
import { getAccount } from "~/common/accessors/getAccount";
import { getCommand } from "~/common/accessors/getCommand";
import { CommandData } from "~/models";

export const onGet: RequestHandler = async (requestEvent) => {
  const { params, redirect, error, json } = requestEvent;
  const payload = await verifyToken(requestEvent);
  if (!payload) throw redirect(302, "/login");

  const account = await getAccount(Number(params.accountId), payload.userId);
  if (!account) throw error(404, "Account Not Found");

  const command = await getCommand(Number(params.commandId));
  if (!command) throw error(404, "Command Not Found");

  json(200, {
    commandId: command.id,
    accountId: command.accountId,
    name: command.name,
    response: command.response,
  } as CommandData);
};

export default CommandResource;
