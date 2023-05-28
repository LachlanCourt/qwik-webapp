import type { RequestHandler } from "@builder.io/qwik-city";
import { db } from "db";
import cryptojs from "crypto-js";
import sha256 from "crypto-js/sha256";
import { createToken } from "~/common/authentication/createToken";

interface Response {
  token: string;
}

export const onPost: RequestHandler = async (requestEvent) => {
  const { request, error, json } = requestEvent;

  const data = await request.json();
  if (!data || !data.username || !data.password)
    throw error(400, "Email and Password are required fields");
  const { username, password } = data;

  const apiUser = await db.apiUser.findFirst({
    where: { username: sha256(username).toString() },
  });

  if (!apiUser || sha256(password).toString() !== apiUser.password)
    throw error(404, "User Not Found. Check Username and Password are correct");

  const sessionKey = cryptojs.lib.WordArray.random(32).toString();
  const serverId = cryptojs.lib.WordArray.random(32).toString();

  await db.apiUser.update({
    where: { id: apiUser.id },
    data: { webhookServerId: sha256(serverId).toString() },
  });

  //TODO fix this
  // await db.session.deleteMany({ where: { id: -1 } })
  // await db.session.create({
  //     data: { userId: -1, sessionKey },
  // });

  json(200, {
    token: await createToken(
      { userId: -1, sessionKey, isGlobalAdmin: true },
      requestEvent
    ),
    serverId,
  } as Response);
};
