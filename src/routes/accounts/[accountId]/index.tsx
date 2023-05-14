import { routeLoader$ } from "@builder.io/qwik-city";
import { verifyToken } from "~/common/authentication/verifyToken";
import { AccountPage } from "~/pages/account/AccountPage";
import { AccountData } from "~/models";
import { getAccount } from "~/common/accessors/getAccount";
import { Resource, component$ } from "@builder.io/qwik";

const useEndpoint = routeLoader$(async (requestEvent) => {
  const { params, redirect, error } = requestEvent;
  const payload = await verifyToken(requestEvent);
  if (!payload) throw redirect(302, "/login");

  const account = await getAccount(Number(params.accountId), payload.userId);
  if (!account) throw error(404, "Account Not Found");

  return { accountId: account.id, name: account.name } as AccountData;
});

export default component$(() => {
  const endpoint = useEndpoint();
  return (
    <Resource
      value={endpoint}
      onPending={() => <div>Loading...</div>}
      onRejected={() => <div>Error</div>}
      onResolved={(data) => <AccountPage data={data} />}
    />
  );
});
