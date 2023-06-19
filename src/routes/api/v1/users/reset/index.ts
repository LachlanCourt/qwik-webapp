import { RequestHandler } from "@builder.io/qwik-city";
import cryptojs from "crypto-js";
import sha256 from "crypto-js/sha256";
import { db } from "db";
import { Tokens } from "~/common/constants";
import { createToken } from "~/common/authentication/createToken";
import { ApiErrorHandler } from "~/common/handlers/ApiErrorHandler";

interface Response {}

export const onPost: RequestHandler<Response> = async (requestEvent) => {
  const { request, cookie, url, error, redirect } = requestEvent;
  //TODO This logic exist in a lot of places it should be generalised somewhere
  const token = url.searchParams.get("token");
  if (!token) throw error(401, "Invalid Token. Error Code 1");

  const tokenData = await db.token.findFirst({ where: { token } });
  if (!tokenData) throw error(401, "Invalid Token. Error Code 2");
  const { type, expiry, email } = tokenData;
  const expired = expiry.getTime() < Math.floor(Date.now() / 1000);
  if (expired) throw error(401, "Invalid Token. Error Code 3");
  if (type !== Tokens.FORGOT_PASSWORD)
    throw error(401, "Invalid Token. Error Code 4");

  const formData = await request.formData();
  const password = formData.get("password")?.toString() || "";
  const passwordConfirm = formData.get("passwordConfirm")?.toString() || "";

  if (password !== passwordConfirm)
    throw ApiErrorHandler.respond(400, "Passwords do not match", requestEvent);

  const salt = cryptojs.lib.WordArray.random(32).toString();
  const passwordHash = sha256(`${salt}${password}`).toString();
  const user = await db.user.update({
    where: { email },
    data: { password: `${salt}$${passwordHash}` },
  });

  await db.token.delete({ where: { token } });

  const sessionKey = cryptojs.lib.WordArray.random(32).toString();
  await db.session.deleteMany({ where: { userId: user.id } });
  await db.session.create({ data: { userId: user.id, sessionKey } });

  const jwt = await createToken(
    { sessionKey, userId: user.id, isGlobalAdmin: user.isGlobalAdmin },
    requestEvent
  );

  cookie.set("token", jwt, { path: "/", httpOnly: true });

  throw redirect(302, "/accounts");
};
