import { Resource, component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { db } from "db";
import { Tokens } from "~/common/constants";
import { ResetPasswordPageData } from "~/models/User";
import { ResetPasswordPage } from "~/pages/user/ResetPasswordPage";

export const useEndpoint = routeLoader$(async (requestEvent) => {
  const { url, error, redirect } = requestEvent;
  const token = url.searchParams.get("token");
  if (!token) throw error(401, "Invalid Token. Error Code 1");
  const tokenData = await db.token.findFirst({ where: { token } });
  if (!tokenData) throw error(401, "Invalid Token. Error Code 2");
  const { type, expiry, email } = tokenData;
  const expired = expiry.getTime() < Math.floor(Date.now() / 1000);
  if (expired) throw error(401, "Invalid Token. Error Code 3");

  if (type !== Tokens.FORGOT_PASSWORD)
    throw error(401, "Invalid Token. Error Code 4.");

  const user = await db.user.findFirst({ where: { email } });
  if (!user) throw error(404, "User Not Found");

  return { token, email } as ResetPasswordPageData;
});

export default component$(() => {
  const resource = useEndpoint();
  return (
    <Resource
      value={resource}
      onPending={() => <div>Loading...</div>}
      onRejected={() => <div>Error</div>}
      onResolved={(data) => <ResetPasswordPage data={data} />}
    />
  );
});
