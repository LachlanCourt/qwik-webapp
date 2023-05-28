import { RequestHandler } from "@builder.io/qwik-city";
import { verifyToken } from "~/common/authentication/verifyToken";
import { AdminPage } from "~/pages/admin/AdminPage";

export const onGet: RequestHandler = async (requestEvent) => {
  const { error } = requestEvent;
  const payload = await verifyToken(requestEvent);
  if (!payload) throw error(401, "Invalid Token. Error Code 1");
  if (!payload.isGlobalAdmin) throw error(403, "Missing Permissions");
};

export default AdminPage;
