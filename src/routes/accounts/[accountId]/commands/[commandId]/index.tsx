import { RequestHandler, routeLoader$ } from "@builder.io/qwik-city";
import { verifyToken } from "~/common/authentication/verifyToken";
import { CommandPage } from "~/pages/command/CommandPage";
import { getAccount } from "~/common/accessors/getAccount";
import { getCommand } from "~/common/accessors/getCommand";
import { CommandData } from "~/models";
import { Resource, component$ } from "@builder.io/qwik";

export const useEndpoint = routeLoader$(async (requestEvent) => {
  const { params, redirect, error } = requestEvent;
  const payload = await verifyToken(requestEvent);
  if (!payload) throw redirect(302, "/login");

  const account = await getAccount(Number(params.accountId), payload.userId);
  if (!account) throw error(404, "Account Not Found");

  const command = await getCommand(Number(params.commandId));
  if (!command) throw error(404, "Command Not Found");

  return {
    commandId: command.id,
    accountId: command.accountId,
    name: command.name,
    response: command.response,
  } as CommandData;
});

export default component$(() => {
  const resource = useEndpoint();
  return (
    <Resource
      value={resource}
      onPending={() => <div>Loading...</div>}
      onRejected={() => <div>Error</div>}
      onResolved={(data) => <CommandPage data={data} />}
    />
  );
});
