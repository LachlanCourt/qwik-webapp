import { RequestHandler } from "@builder.io/qwik-city";
import { verifyToken } from "~/common/authentication/verifyToken";
import { db } from "db";
import sha256 from "crypto-js/sha256";
import { APIUserReadonlyData } from "~/models/APIUserReadonlyData";

export const onDelete: RequestHandler = async (requestEvent) => {
  const { error, params, request } = requestEvent;
  const payload = await verifyToken(requestEvent);
  if (!payload) throw error(401, "Invalid Token. Error Code 1");
  if (!payload.isGlobalAdmin) throw error(403, "Missing Permissions");

  const id = Number(params.apiTokenId || 0);

  const apiUser = await db.apiUser.findFirst({ where: { id } });
  if (!apiUser) {
    throw error(404, "API User Not Found");
  }

  await db.apiUser.delete({
    where: {
      id,
    },
  });

  const apiUsers = await db.apiUser.findMany();
  const tokens = apiUsers.map((apiUser) => ({
    discriminator: apiUser.discriminator,
    id: apiUser.id,
  })) as Array<APIUserReadonlyData>;

  requestEvent.json(200, tokens);
};
