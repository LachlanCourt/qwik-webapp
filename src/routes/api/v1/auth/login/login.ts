import type { RequestHandler } from "@builder.io/qwik-city";
import { db } from "db";
import cryptojs from "crypto-js";
import sha256 from "crypto-js/sha256";
import { createToken } from "~/common/authentication/createToken";
import { ApiErrorHandler } from "~/common/handlers/ApiErrorHandler";

export const onPost: RequestHandler = async (requestEvent) => {
  const { request, cookie, redirect } = requestEvent;
  const formData = await request.formData();
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  if (!email || !password)
    throw ApiErrorHandler.respond(
      400,
      "Email and Password are required fields",
      requestEvent
    );

  const user = await db.user.findFirst({ where: { email } });

  const userPassword = user?.password || "$";
  const salt = userPassword.slice(0, userPassword.indexOf("$"));
  const passwordHashTest = sha256(`${salt}${password}`).toString();
  const passwordHash = userPassword.slice(userPassword.indexOf("$") + 1);

  if (!user || passwordHashTest !== passwordHash)
    throw ApiErrorHandler.respond(
      404,
      "User Not Found. Check Email and Password are correct",
      requestEvent
    );

  // Clean up old sessions if the user is logging in again
  await db.session.deleteMany({ where: { userId: user.id } });

  const sessionKey = cryptojs.lib.WordArray.random(32).toString();
  await db.session.create({
    data: { userId: user.id, sessionKey },
  });
  //TODO add session to middleware

  const jwt = await createToken(
    { sessionKey, userId: user.id, isGlobalAdmin: user.isGlobalAdmin },
    requestEvent
  );
  cookie.set("token", jwt, { path: "/", httpOnly: true });

  throw redirect(302, "/accounts/");
};
