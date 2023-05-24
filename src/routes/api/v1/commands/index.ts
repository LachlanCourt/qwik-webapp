import { RequestEvent, RequestHandler } from "@builder.io/qwik-city";
import { verifyToken } from "~/common/authentication/verifyToken";
import cryptojs from "crypto-js";
import { db } from "db";
import { Tokens } from "~/common/constants";
import { getAccount } from "~/common/accessors/getAccount";
import { getCommands } from "~/common/accessors/getCommands";
import { Command } from "@prisma/client";

export const onGet: RequestHandler = async (requestEvent) => {
  const { error, params, json, url, request } = requestEvent;

  const payload = await verifyToken(requestEvent);
  if (!payload) throw error(401, "Invalid Token. Error Code 1");

  // const register = url.searchParams.get("register");

  const commands = await db.command.findMany();
  const commandData: Array<{
    name: string;
    accountId: number;
    commands: Array<{ name: string; response: string; type: string }>;
  }> = [];
  const accounts = await db.account.findMany();
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
    else {
      const account = accounts.find(
        (account) => account.id === command.accountId
      );
      account &&
        commandData.push({
          name: account.name,
          accountId: command.accountId,
          commands: [newCommand],
        });
    }
  });

  json(200, commandData);
};
