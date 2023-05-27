import { RequestHandler, routeLoader$ } from "@builder.io/qwik-city";
import { verifyToken } from "~/common/authentication/verifyToken";
import { db } from "db";
import { Resource, component$ } from "@builder.io/qwik";
import { APIUserReadonlyData } from "~/models/APIUserReadonlyData";
import { APITokens } from "~/pages/admin/APITokensPage";

export const useEndpoint = routeLoader$(async (requestEvent) => {
  const { error, redirect } = requestEvent;
  const payload = await verifyToken(requestEvent);
  if (!payload) throw error(401, "Invalid Token. Error Code 1");
  if (!payload.isGlobalAdmin) throw redirect(302, "/");

  const apiUsers = await db.apiUser.findMany();

  return apiUsers.map((apiUser) => ({
    discriminator: apiUser.discriminator,
    id: apiUser.id,
    webhookUrl: apiUser.webhookUrl,
  })) as Array<APIUserReadonlyData>;
});

export default component$(() => {
  const resource = useEndpoint();
  return (
    <Resource
      value={resource}
      onPending={() => <div>Loading...</div>}
      onRejected={() => <div>Error</div>}
      onResolved={(data) => <APITokens data={data} />}
    />
  );
});
