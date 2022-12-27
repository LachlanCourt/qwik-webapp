import { RequestHandler } from "@builder.io/qwik-city";
import { verifyToken } from "~/common/authentication/verifyToken";
import { db } from "db";

interface Response { }

export const onPost: RequestHandler<Response> = async ({
  request,
  response,
  cookie,
}) => {
  const payload = await verifyToken(request, response, cookie);
  if (!payload) throw response.redirect("/login", 302);
  const formData = await request.formData();

  const name = formData.get("name")?.toString() || "New Account";
  const adminId = Number(formData.get("adminId")?.toString() || 0);

  //TODO authorise by SUPER role
  //TODO this will likely happen in an api endpoint from a form post but this will do for now
  const account = await db.account.create({ data: { name, adminId } });

  throw response.redirect(`/accounts/${account.id}`, 302);
};
