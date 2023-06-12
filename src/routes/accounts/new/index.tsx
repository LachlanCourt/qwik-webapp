import { RequestHandler } from "@builder.io/qwik-city";
import { verifyToken } from "~/common/authentication/verifyToken";
import NewAccount from "~/pages/account/NewAccountPage";

/**
 * Secure this endpoint for if the user is a super admin. Redirect to accounts if they do not
 */
export const onGet: RequestHandler = async (requestEvent) => {
  const { redirect, error } = requestEvent;
  const payload = await verifyToken(requestEvent);
  if (!payload) throw redirect(302, "/login");

  const { isGlobalAdmin } = payload;
  if (!isGlobalAdmin) throw error(403, "Missing Permissions");
};

export default NewAccount;
