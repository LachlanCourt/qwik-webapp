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

    //TODO check for SUPER role

    // const accountId = Number(params.accountId);
    // const account = await getAccount(accountId, payload.userId);
    // if (!account) throw response.redirect("/accounts", 302);
};

export default NewAccount;
