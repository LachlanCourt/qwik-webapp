import { RequestHandler } from "@builder.io/qwik-city";
import { verifyToken } from "authentication/verifyToken";
import NewCommandPage from "~/pages/command/NewCommandPage";
import { getAccount } from "~/common/accessors/getAccount";

/**
 * Secure this endpoint for if the user has access to this account. Redirect to accounts if they do not
 */
export const onGet: RequestHandler<Response> = async ({
  params,
  request,
  response,
  cookie,
}) => {
  const payload = await verifyToken(request, response, cookie);
  if (!payload) throw response.redirect("/login", 302);

  const account = await getAccount(Number(params.accountId), payload.userId);
  if (!account) throw response.redirect("/accounts", 302);
};

export default NewCommandPage;
