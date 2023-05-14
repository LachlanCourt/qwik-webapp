import { RequestHandler, routeLoader$ } from "@builder.io/qwik-city";
import { verifyToken } from "~/common/authentication/verifyToken";
import { Commands } from "~/pages/command/CommandsPage";
import { CommandData } from "~/models";
import { getAccount } from "~/common/accessors/getAccount";
import { getCommands } from "~/common/accessors/getCommands";
import { Command } from "@prisma/client";
import { Resource, component$ } from "@builder.io/qwik";

export const useEndpoint = routeLoader$(async (requestEvent) => {
  const { params, redirect, error } = requestEvent;
  const payload = await verifyToken(requestEvent);
  if (!payload) throw redirect(302, "/login");

  const account = await getAccount(Number(params.accountId), payload.userId);
  if (!account) throw error(404, "Account Not Found");

  const commands = await getCommands(account.id);

  return commands.map((command) => ({
    commandId: command.id,
    name: command.name,
    accountId: command.accountId,
    response: command.response,
  })) as Array<CommandData>;
});

export default component$(() => {
  const resource = useEndpoint();
  return (
    <Resource
      value={resource}
      onPending={() => <div>Loading...</div>}
      onRejected={() => <div>Error</div>}
      onResolved={(data) => <Commands data={data} />}
    />
  );
});
