import { RequestHandler } from "@builder.io/qwik-city";
import { verifyToken } from "~/common/authentication/verifyToken";
import { AccountResource } from "~/pages/account/AccountPage";
import { AccountData } from "~/models";
import { getAccount } from "~/common/accessors/getAccount";

export const onGet: RequestHandler = async (requestEvent) => {
  const { params, request, cookie, redirect, error, json } = requestEvent;
  const payload = await verifyToken(requestEvent);
  if (!payload) throw redirect(302, "/login");

  const account = await getAccount(Number(params.accountId), payload.userId);
  if (!account) throw error(404, "Account Not Found");

  json(200, { accountId: account.id, name: account.name } as AccountData);
};

export default AccountResource;
