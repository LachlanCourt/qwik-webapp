import { RequestHandler } from "@builder.io/qwik-city";
import { verifyToken } from "~/common/authentication/verifyToken";
import NewAPITokenPage from "~/pages/admin/NewAPITokenPage";

export const onGet: RequestHandler<Response> = async (requestEvent) => {
  const { redirect, error } = requestEvent;
  const payload = await verifyToken(requestEvent);
  if (!payload) throw redirect(302, "/login");

  if (!payload.isGlobalAdmin) throw error(403, "Missing Permissions");
};

export default NewAPITokenPage;
