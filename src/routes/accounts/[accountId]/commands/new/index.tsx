import { routeLoader$ } from "@builder.io/qwik-city";
import { verifyToken } from "authentication/verifyToken";
import { EditCommandPage } from "~/pages/command/EditCommandPage";
import { getAccount } from "~/common/accessors/getAccount";
import { Resource, component$ } from "@builder.io/qwik";

export const useEndpoint = routeLoader$(async (requestEvent) => {
  const { params, redirect } = requestEvent;
  const payload = await verifyToken(requestEvent);
  if (!payload) throw redirect(302, "/login");

  const account = await getAccount(
    Number(params.accountId),
    payload.userId,
    payload.isGlobalAdmin
  );
  if (!account) throw redirect(302, "/accounts");

  return undefined;
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
