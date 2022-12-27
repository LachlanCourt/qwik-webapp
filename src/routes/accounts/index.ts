import { RequestHandler } from "@builder.io/qwik-city";
import { verifyToken } from "~/common/authentication/verifyToken";
import { AccountsResource } from "~/pages/account/AccountsPage";
import { db } from "db";
import { AccountData } from "~/models";

export const onGet: RequestHandler<Array<AccountData>> = async ({
    request,
    response,
    cookie,
}) => {
    const payload = await verifyToken(request, response, cookie);
    if (!payload) throw response.redirect("/login", 302);

    const accounts = await db.account.findMany({
        where: {
            OR: [
                {
                    moderators: {
                        some: {
                            userId: Number(payload.userId),
                        },
                    },
                },
                {
                    adminId: Number(payload.userId),
                },
            ],
        },
    });

    return accounts.map((account) => ({
        accountId: account.id,
        name: account.name,
    }));
};

export default AccountsResource;
