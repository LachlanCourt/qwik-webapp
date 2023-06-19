import { RequestHandler, routeLoader$ } from "@builder.io/qwik-city";
import { verifyToken } from "~/common/authentication/verifyToken";
import { Accounts } from "~/pages/account/AccountsPage";
import { db } from "db";
import { AccountPageData } from "~/models";
import { Resource, component$ } from "@builder.io/qwik";

export const useEndpoint = routeLoader$(async (requestEvent) => {
  const { redirect } = requestEvent;
  const payload = await verifyToken(requestEvent);
  if (!payload) throw redirect(302, "/login");

  const accounts = await db.account.findMany(
    payload.isGlobalAdmin
      ? undefined
      : {
          where: {
            OR: [
              {
                moderators: {
                  some: {
                    userId: payload.userId,
                  },
                },
              },
              {
                adminId: payload.userId,
              },
            ],
          },
        }
  );

  return accounts.map((account) => ({
    accountId: account.id,
    name: account.name,
  })) as Array<AccountPageData>;
});

export default component$(() => {
  const resource = useEndpoint();
  return (
    <Resource
      value={resource}
      onPending={() => <div>Loading...</div>}
      onRejected={() => <div>Error</div>}
      onResolved={(data) => <Accounts data={data} />}
    />
  );
});
