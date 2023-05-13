import { RequestHandler } from "@builder.io/qwik-city";
import { verifyToken } from "~/common/authentication/verifyToken";
import { AccountsResource } from "~/pages/account/AccountsPage";
import { db } from "db";
import { AccountData } from "~/models";

export const onGet: RequestHandler = async (requestEvent) => {
  const { json, redirect } = requestEvent;
  const payload = await verifyToken(requestEvent);
  if (!payload) throw redirect(302, "/login");

  const accounts = await db.account.findMany({
    where: {
      OR: [
        {
          moderators: {
            some: {
              userId: payload.userId,
            },
          },
        },
        {
          adminId: payload.userId,
        },
      ],
    },
  });

  json(
    200,
    accounts.map((account) => ({
      accountId: account.id,
      name: account.name,
    })) as Array<AccountData>
  );
};

export default AccountsResource;
