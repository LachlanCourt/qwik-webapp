import { db } from "db";
export const getAccount = async (accountId: number, userId: number) => {
  return await db.account.findFirst({
    where: {
      AND: [
        {
          id: accountId,
        },
        {
          OR: [
            {
              adminId: Number(userId),
            },
            {
              moderators: {
                some: {
                  userId: Number(userId),
                },
              },
            },
          ],
        },
      ],
    },
  });
};
