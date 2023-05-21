import { RequestEvent, RequestHandler } from "@builder.io/qwik-city";
import { verifyToken } from "~/common/authentication/verifyToken";
import cryptojs from "crypto-js";
import { db } from "db";
import { Tokens } from "~/common/constants";
import { getAccount } from "~/common/accessors/getAccount";
import { getCommands } from "~/common/accessors/getCommands";

export const onGet: RequestHandler = async (requestEvent) => {
  const { error, params, json } = requestEvent;
  const payload = await verifyToken(requestEvent);
  if (!payload) throw error(401, "Invalid Token. Error Code 1");

  const account = await getAccount(
    Number(params.accountId),
    payload.userId,
    payload.isGlobalAdmin
  );
  if (!account) throw error(404, "Account Not Found");

  const commands = await getCommands(account.id);

  json(
    200,
    commands.map((command) => ({
      name: command.name,
      response: command.response,
      type: "simple_response",
    }))
  );
};
