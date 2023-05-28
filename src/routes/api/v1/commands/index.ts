import { RequestHandler } from "@builder.io/qwik-city";
import { verifyToken } from "~/common/authentication/verifyToken";
import { db } from "db";

export const onGet: RequestHandler = async (requestEvent) => {
  const { error, json } = requestEvent;

  const payload = await verifyToken(requestEvent);
  if (!payload) throw error(401, "Invalid Token. Error Code 1");

  if (!payload.isGlobalAdmin) throw error(403, "Missing Permissions");

  const commands = await db.command.findMany();
  const accounts = await db.account.findMany();

  const commandData: Array<{
    name: string;
    accountId: number;
    commands: Array<{ name: string; response: string; type: string }>;
  }> = accounts.map((account) => ({
    name: account.name,
    accountId: account.id,
    commands: [],
  }));

  commands.forEach((command) => {
    const accountData = commandData.find(
      (c) => c.accountId === command.accountId
    );
    const newCommand = {
      name: command.name,
      response: command.response,
      type: "simple_response",
    };
    if (accountData) accountData.commands.push(newCommand);
  });

  json(200, commandData);
};
