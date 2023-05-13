import { RequestHandler } from "@builder.io/qwik-city";
import { verifyToken } from "~/common/authentication/verifyToken";
import { db } from "db";
import { Tokens } from "~/common/constants";
import { NewUserResource } from "~/pages/user/NewUserPage";
import { NewUserData } from "~/models";

export const onGet: RequestHandler = async (requestEvent) => {
  const { url, error, json } = requestEvent;
  const token = url.searchParams.get("token");
  if (!token) throw error(401, "Invalid Token. Error Code 1");
  const tokenData = await db.token.findFirst({ where: { token } });
  if (!tokenData) throw error(401, "Invalid Token. Error Code 2");
  const { type, expiry } = tokenData;
  const expired = expiry.getTime() < Math.floor(Date.now() / 1000);
  if (expired) throw error(401, "Invalid Token. Error Code 3");
  if (type !== Tokens.ADD_NEW_USER && type !== Tokens.ADD_NEW_ACCOUNT)
    throw error(401, "Invalid Token. Error Code 4");

  // Happy :)

  json(200, { token } as NewUserData);
};

export default NewUserResource;
