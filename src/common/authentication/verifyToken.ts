import { RequestEvent, RequestEventLoader } from "@builder.io/qwik-city";
import * as jose from "jose";
import { SessionData } from "../constants";

export const verifyToken = async (
  requestEvent: RequestEvent | RequestEventLoader,
  redirectOnFail = true
): Promise<SessionData | null> => {
  const { request, redirect, error, cookie } = requestEvent;
  const jwt =
    cookie.get("token")?.value || request.headers.get("Authorization");

  if (!jwt) {
    if (redirectOnFail) throw redirect(302, "/login");
    else return null;
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) throw error(500, "Could not load server secret");

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
    if (redirectOnFail) throw redirect(302, "/login");
    else return null;
  }

  return {
    userId: Number(payload.userId),
    sessionKey: payload.sessionKey?.toString() || "",
    isGlobalAdmin: payload.isGlobalAdmin ? true : false,
  };
};
