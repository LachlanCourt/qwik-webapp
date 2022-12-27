import { RequestHandler } from "@builder.io/qwik-city";
import { verifyToken } from "~/common/authentication/verifyToken";
import { AccountResource } from "~/pages/account/AccountPage";
import { AccountData } from "~/models";
import { getAccount } from "~/common/accessors/getAccount";

export const onGet: RequestHandler<AccountData> = async ({
  params,
  request,
  response,
  cookie,
}) => {
  const payload = await verifyToken(request, response, cookie);
  if (!payload) throw response.redirect("/login", 302);

  const account = await getAccount(Number(params.accountId), Number(payload.userId));
  if (!account) throw response.error(404);

  return { accountId: account.id, name: account.name };
};

export default AccountResource;
