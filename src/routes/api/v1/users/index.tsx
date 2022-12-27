import { component$, Resource } from "@builder.io/qwik";
import { RequestHandler, useEndpoint } from "@builder.io/qwik-city";
import { db } from "db";
import { verifyToken } from "~/common/authentication/verifyToken";

export interface UsersData {
  message: string;
}

export const onGet: RequestHandler<UsersData> = async ({
  cookie,
  request,
  response,
}) => {
  const payload = await verifyToken(request, response, cookie);
  if (!payload) throw response.redirect("/login", 302);

  const users = await db.user.findMany();

  return { message: JSON.stringify(users) };
};
