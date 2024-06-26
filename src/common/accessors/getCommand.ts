import { db } from "db";
export const getCommand = async (commandId: number, actions = false) => {
  return await db.command.findFirst({
    where: { id: commandId },
    include: {
      actions: actions
        ? {
            orderBy: [{ order: "asc" }, { id: "asc" }],
          }
        : false,
    },
  });
};
