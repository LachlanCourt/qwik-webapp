import { RequestHandler } from "@builder.io/qwik-city";
import { verifyToken } from "~/common/authentication/verifyToken";
import { CommandResource } from "~/pages/command/CommandPage";
import { getAccount } from "~/common/accessors/getAccount";
import { getCommand } from "~/common/accessors/getCommand";
import { CommandData } from "~/models";

export const onGet: RequestHandler<CommandData> = async ({
  params,
  request,
  response,
  cookie,
}) => {
  const payload = await verifyToken(request, response, cookie);
  if (!payload) throw response.redirect("/login", 302);

  const account = await getAccount(
    Number(params.accountId),
    Number(payload.userId)
  );
  if (!account) throw response.error(404);

  const command = await getCommand(Number(params.commandId));
  if (!command) throw response.error(404);

  return {
    commandId: command.id,
    accountId: command.accountId,
    name: command.name,
  };
};

export default CommandResource;
