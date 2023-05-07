import type { RequestHandler } from "@builder.io/qwik-city";
import { db } from "db";
import cryptojs from "crypto-js";
import sha256 from "crypto-js/sha256";
import { createToken } from "~/common/authentication/createToken";

interface Response {
    token: string
}

export const onGet: RequestHandler<Response> = async ({
    request,
    response,
    cookie,
    params
}) => {
    const data = await request.json();
    console.log(data)
    if (!data || !data.username || !data.password) throw response.error(400);

    const { username, password } = data;

    const apiUser = await db.apiUser.findFirst({ where: { username: sha256(username).toString() } })
    if (!apiUser) throw response.error(404)

    if (sha256(password).toString() !== apiUser.password) throw response.error(401)

    const sessionKey = cryptojs.lib.WordArray.random(32).toString();
    //TODO fix this
    // await db.session.deleteMany({ where: { id: -1 } })
    // await db.session.create({
    //     data: { userId: -1, sessionKey },
    // });

    return ({ token: await createToken({ userId: -1, sessionKey, isGlobalAdmin: true }, response) })

};
