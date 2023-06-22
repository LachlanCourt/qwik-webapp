import { routeLoader$ } from "@builder.io/qwik-city";
import { db } from "db";
import { Tokens } from "~/common/constants";
import { NewUserPage } from "~/pages/user/NewUserPage";
import { NewUserData } from "~/models";
import { Resource, component$ } from "@builder.io/qwik";

export const useEndpoint = routeLoader$(async (requestEvent) => {
  const { url, error } = requestEvent;
  const token = url.searchParams.get("token");
  if (!token) throw error(401, "Invalid Token. Error Code 1");
  const tokenData = await db.token.findFirst({ where: { token } });
  if (!tokenData) throw error(401, "Invalid Token. Error Code 2");
  const { type, expiry } = tokenData;
  const expired = expiry < new Date();
  if (expired) throw error(401, "Invalid Token. Error Code 3");
  if (type !== Tokens.ADD_NEW_USER && type !== Tokens.ADD_NEW_ACCOUNT)
    throw error(401, "Invalid Token. Error Code 4");

  // Happy :)

  return { token } as NewUserData;
});

export default component$(() => {
  const resource = useEndpoint();
  return (
    <Resource
      value={resource}
      onPending={() => <div>Loading...</div>}
      onRejected={() => <div>Error</div>}
      onResolved={(data) => <NewUserPage data={data} />}
    />
  );
});
