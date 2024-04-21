import { db } from "db";
export const getCommands = async (accountId: number, actions = false) => {
  return await db.command.findMany({
    where: {
      accountId,
    },
    include: { actions },
  });
};
