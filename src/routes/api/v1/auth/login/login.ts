import type { RequestHandler } from "@builder.io/qwik-city";
import { db } from "db";
import cryptojs from "crypto-js";
import sha256 from "crypto-js/sha256";
import { createToken } from "~/common/authentication/createToken";

interface ExistingUser {
  jwt: string;
}

export const onPost: RequestHandler<ExistingUser> = async ({
  request,
  response,
  cookie,
}) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  if (!email || !password) throw response.error(400);

  const passwordHash = sha256(password).toString();

  const user = await db.user.findFirst({ where: { email } });
  //@ts-expect-error
  if (!user) throw response.error(400, "User not found");
  if (passwordHash !== user.password) throw response.error(401);

  // Clean up old sessions if the user is logging in again
  await db.session.deleteMany({ where: { userId: user.id } });

  const sessionKey = cryptojs.lib.WordArray.random(32).toString();
  await db.session.create({
    data: { userId: user.id, sessionKey },
  });
  //TODO add session to middleware

  const jwt = await createToken({ sessionKey, userId: user.id }, response);
  cookie.set("token", jwt, { path: "/", httpOnly: true });

  throw response.redirect("/", 302);
};

// export const onPost: RequestHandler<ProductData> = async ({ params }) => {  }
// export const onPut: RequestHandler<ProductData> = async ({ params }) => {  }
// export const onPatch: RequestHandler<ProductData> = async ({ params }) => {  }
// export const onDelete: RequestHandler<ProductData> = async ({ params }) => {  }
