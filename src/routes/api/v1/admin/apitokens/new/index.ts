import { RequestHandler } from "@builder.io/qwik-city";
import { verifyToken } from "~/common/authentication/verifyToken";
import cryptojs from "crypto-js";
import sha256 from "crypto-js/sha256";
import { db } from "db";

export const onPost: RequestHandler = async (requestEvent) => {
  const { error, json, request } = requestEvent;
  const payload = await verifyToken(requestEvent);
  if (!payload) throw error(401, "Invalid Token. Error Code 1");
  if (!payload.isGlobalAdmin) throw error(403, "Missing Permissions");

  let discriminator: string = "";
  try {
    const data = await request.json();
    discriminator = data.discriminator;
  } catch {}
  if (!discriminator) throw error(400, "Discriminator is required");

  const username = cryptojs.lib.WordArray.random(32).toString();
  const password = cryptojs.lib.WordArray.random(32).toString();

  const hashedUsername = sha256(username).toString();
  const hashedPassword = sha256(password).toString();

  await db.apiUser.create({
    data: {
      username: hashedUsername,
      password: hashedPassword,
      discriminator,
    },
  });

  json(200, { username, password });
};
