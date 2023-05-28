import { db } from "db";
export const getAccount = async (accountId: number, userId: number, isGlobalAdmin = false) => {
  return isGlobalAdmin ?
    await db.account.findFirst({
      where: {
        id: accountId
      }
    })
    : await db.account.findFirst({
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
