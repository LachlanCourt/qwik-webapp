import { routeLoader$ } from "@builder.io/qwik-city";
import { verifyToken } from "~/common/authentication/verifyToken";
import { AccountPage } from "~/pages/account/AccountPage";
import { AccountPageData } from "~/models";
import { getAccount } from "~/common/accessors/getAccount";
import { Resource, component$ } from "@builder.io/qwik";
import { db } from 'db'

const useEndpoint = routeLoader$(async (requestEvent) => {
  const { params, redirect, error } = requestEvent;
  const payload = await verifyToken(requestEvent);
  if (!payload) throw redirect(302, "/login");

  const account = await getAccount(Number(params.accountId), payload.userId, payload.isGlobalAdmin);
  if (!account) throw error(404, "Account Not Found");

  const moderators = (await db.user.findMany({ where: { accounts: { some: { accountId: account.id } } } })).map(({ id, name, email }) => ({ id, name, email }))

  return { accountId: account.id, name: account.name, moderators, isAdmin: payload.isGlobalAdmin || payload.userId === account.adminId } as AccountPageData;
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
