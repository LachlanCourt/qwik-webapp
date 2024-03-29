import { RequestEvent } from "@builder.io/qwik-city";
import { SessionData } from "common/constants";
import * as jose from "jose";

export const createToken = async (
  sessionData: SessionData,
  request: RequestEvent
): Promise<string> => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) throw request.error(500, "Could not load server secret");

  return await new jose.SignJWT({ ...sessionData })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer("lachourt:qwik-webapp")
    .setAudience("lachourt:quik-webapp:user")
    .setExpirationTime("2h")
    .sign(new TextEncoder().encode(jwtSecret));
};
