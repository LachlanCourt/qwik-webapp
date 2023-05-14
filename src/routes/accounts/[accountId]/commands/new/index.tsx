import { RequestHandler } from "@builder.io/qwik-city";
import { verifyToken } from "authentication/verifyToken";
import NewCommandPage from "~/pages/command/NewCommandPage";
import { getAccount } from "~/common/accessors/getAccount";

/**
 * Secure this endpoint for if the user has access to this account. Redirect to accounts if they do not
 */
export const onGet: RequestHandler = async (requestEvent) => {
  const { params, request, cookie, redirect } = requestEvent;
  const payload = await verifyToken(requestEvent);
  if (!payload) throw redirect(302, "/login");

  const account = await getAccount(Number(params.accountId), payload.userId);
  if (!account) throw redirect(302, "/accounts");
};

export default NewCommandPage;
