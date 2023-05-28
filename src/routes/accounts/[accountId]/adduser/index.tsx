import { Resource, component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { getAccount } from "~/common/accessors/getAccount";
import { verifyToken } from "~/common/authentication/verifyToken";
import { AddUserData } from "~/models/AddUserData";
import { AddUserPage } from "~/pages/user/AddUserPage";

export const useEndpoint = routeLoader$(async (requestEvent) => {
  const { params, redirect, error } = requestEvent;
  const payload = await verifyToken(requestEvent);
  if (!payload) throw redirect(302, "/login");

  const account = await getAccount(Number(params.accountId), payload.userId);
  if (!account || account.adminId !== payload.userId)
    throw error(404, "Account Not found");

  return { accountId: account.id } as AddUserData;
});

export default component$(() => {
  const resource = useEndpoint();
  return (
    <Resource
      value={resource}
      onPending={() => <div>Loading...</div>}
      onRejected={() => <div>Error</div>}
      onResolved={(data) => <AddUserPage {...data} />}
    />
  );
});
