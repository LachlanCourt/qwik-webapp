import { RequestHandler } from "@builder.io/qwik-city";
import { verifyToken } from "~/common/authentication/verifyToken";
import NewAccount from "~/pages/account/NewAccountPage";

/**
 * Secure this endpoint for if the user is a super admin. Redirect to accounts if they do not
 */
export const onGet: RequestHandler<Response> = async ({
    request,
    response,
    cookie,
}) => {
    const payload = await verifyToken(request, response, cookie);
    if (!payload) throw response.redirect("/login", 302);

    const { isGlobalAdmin } = payload
    if (!isGlobalAdmin) throw response.error(404)
};

export default NewAccount;
