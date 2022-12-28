import { RequestHandler } from "@builder.io/qwik-city";
import { verifyToken } from "~/common/authentication/verifyToken";
import cryptojs from 'crypto-js'
import sha256 from 'crypto-js/sha256'
import { db } from 'db'
import { Tokens } from "~/common/constants";
import { createToken } from "~/common/authentication/createToken";

interface Response { }

export const onPost: RequestHandler<Response> = async ({ request, response, cookie, url }) => {
    const token = url.searchParams.get('token')
    if (!token) throw response.error(401)
    const tokenData = await db.token.findFirst({ where: { token } })
    if (!tokenData) throw response.error(401)
    const { type, expiry, email } = tokenData
    const expired = expiry.getTime() < Math.floor(Date.now() / 1000)
    if (expired) throw response.error(401)
    if (type !== Tokens.ADD_NEW_USER) throw response.error(401)

    const formData = await request.formData();
    const password = formData.get("password")?.toString() || "";

    const passwordHash = sha256(password).toString();
    const user = await db.user.create({
        data: { email, password: passwordHash },
    });

    const sessionKey = cryptojs.lib.WordArray.random(32).toString();
    await db.session.create({ data: { userId: user.id, sessionKey } });

    const jwt = await createToken({ sessionKey, userId: user.id }, response);

    cookie.set("token", jwt, { path: "/", httpOnly: true });

    throw response.redirect(`/api/v1/users/adduser?token=${token}`, 302)

}
