import { component$ } from "@builder.io/qwik";
import { RequestHandler } from "@builder.io/qwik-city";
import { verifyToken } from "~/common/authentication/verifyToken";
import { AccountResource } from "~/pages/account/AccountPage";
import { db } from "db";
import { AccountData } from "~/models";

export const onGet: RequestHandler<AccountData> = async ({
  params,
  request,
  response,
  cookie,
}) => {
  const payload = await verifyToken(request, response, cookie);
  if (!payload) throw response.redirect("/login", 302);

  console.log(params.accountId);
  const account = await db.account.findFirst({
    where: {
      AND: [
        {
          id: Number(params.accountId || 0),
        },
        {
          OR: [
            {
              adminId: Number(payload.userId),
            },
            {
              moderators: {
                some: {
                  userId: Number(payload.userId),
                },
              },
            },
          ],
        },
      ],
    },
  });
  if (!account) throw response.error(404);

  return { accountId: account.id, name: account.name };
  //TODO Find account using payload.userId
  // const accountId = 1
  // throw response.redirect(`/accounts/${accountId}`, 302)
};

export default AccountResource;
