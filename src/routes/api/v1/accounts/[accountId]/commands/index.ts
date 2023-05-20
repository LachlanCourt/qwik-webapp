import { RequestEvent, RequestHandler } from "@builder.io/qwik-city";
import { verifyToken } from "~/common/authentication/verifyToken";
import cryptojs from "crypto-js";
import { db } from "db";
import { Tokens } from "~/common/constants";
import { getAccount } from "~/common/accessors/getAccount";
import { getCommands } from "~/common/accessors/getCommands";

export const onGet: RequestHandler = async (requestEvent) => {
  const { error, params, json } = requestEvent;
  console.log("endpoint hit");

  const payload = await verifyToken(requestEvent);
  if (!payload) throw error(401, "Invalid Token. Error Code 1");

  console.log("token passed");

  const account = await getAccount(
    Number(params.accountId),
    payload.userId,
    payload.isGlobalAdmin
  );
  if (!account) throw error(404, "Account Not Found");

  console.log("account found");

  const commands = await getCommands(account.id);
  console.log(commands);
  json(
    200,
    commands.map((command) => ({
      name: command.name,
      response: command.response,
      type: "simple_response",
    }))
  );
};
