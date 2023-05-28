import type { RequestHandler } from "@builder.io/qwik-city";
import { verifyToken } from "~/common/authentication/verifyToken";

export const onGet: RequestHandler = async (requestEvent) => {
  const { redirect } = requestEvent;
  const payload = await verifyToken(requestEvent);
  if (!payload) throw redirect(302, "/login");
  throw redirect(302, `/accounts`);
};
