import { RequestHandler } from "@builder.io/qwik-city";
import { getAccount } from "~/common/accessors/getAccount";
import { verifyToken } from "~/common/authentication/verifyToken";
import { AddUserData } from "~/models/AddUserData";
import { AddUserResource } from "~/pages/user/AddUserPage";

export const onGet: RequestHandler = async (requestEvent) => {
  const { params, redirect, error, json } = requestEvent;
  const payload = await verifyToken(requestEvent);
  if (!payload) throw redirect(302, "/login");

  const account = await getAccount(Number(params.accountId), payload.userId);
  if (!account || account.adminId !== payload.userId)
    throw error(404, "Account not found");

  json(200, { accountId: account.id } as AddUserData);
};

export default AddUserResource;
