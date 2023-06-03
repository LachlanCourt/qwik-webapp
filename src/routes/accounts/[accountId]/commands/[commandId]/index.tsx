import { RequestHandler, routeLoader$ } from "@builder.io/qwik-city";
import { verifyToken } from "~/common/authentication/verifyToken";
import { EditCommandPage } from "~/pages/command/EditCommandPage";
import { getAccount } from "~/common/accessors/getAccount";
import { getCommand } from "~/common/accessors/getCommand";

import { Resource, component$ } from "@builder.io/qwik";
import { Command } from "@prisma/client";

export const useEndpoint = routeLoader$(async (requestEvent) => {
  const { params, redirect, error } = requestEvent;
  const payload = await verifyToken(requestEvent);
  if (!payload) throw redirect(302, "/login");

  if (
    Number.isNaN(Number(params.accountId)) ||
    Number.isNaN(Number(params.commandId))
  )
    throw error(404, "Page Not Found");

  const account = await getAccount(Number(params.accountId), payload.userId, payload.isGlobalAdmin);
  if (!account) throw error(404, "Account Not Found");

  const command = await getCommand(Number(params.commandId));
  if (!command) throw error(404, "Command Not Found");

  return {
    id: command.id,
    accountId: command.accountId,
    name: command.name,
    response: command.response,
  } as Command;
});

export default component$(() => {
  const resource = useEndpoint();
  return (
    <Resource
      value={resource}
      onPending={() => <div>Loading...</div>}
      onRejected={() => <div>Error</div>}
      onResolved={(data) => <EditCommandPage data={data} />}
    />
  );
});
