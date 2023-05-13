import { RequestEvent } from "@builder.io/qwik-city";
import * as jose from "jose";
import { SessionData } from "../constants";

export const verifyToken = async (
  request: RequestEvent
): Promise<SessionData> => {
  const jwt =
    request.cookie.get("token")?.value || request.headers.get("authorization");
  if (!jwt) throw request.redirect(302, "/login");
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) throw request.error(500, "Could not load server secret");

  let payload;
  try {
    ({ payload } = await jose.jwtVerify(
      jwt,
      new TextEncoder().encode(jwtSecret),
      {
        issuer: "lachourt:qwik-webapp",
        audience: "lachourt:quik-webapp:user",
      }
    ));
  } catch (err) {
    console.log(err);
    throw request.redirect(302, "/login");
  }

  return {
    userId: Number(payload.userId),
    sessionKey: payload.sessionKey?.toString() || "",
    isGlobalAdmin: payload.isGlobalAdmin ? true : false,
  };
};
