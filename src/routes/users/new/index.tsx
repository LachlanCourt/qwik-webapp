import { RequestHandler } from "@builder.io/qwik-city";
import { verifyToken } from "~/common/authentication/verifyToken";
import { db } from 'db'
import { Tokens } from "~/common/constants";
import { NewUserResource } from "~/pages/user/NewUserPage";
import { NewUserData } from "~/models";

export const onGet: RequestHandler<NewUserData> = async ({ request, response, cookie, url }) => {
    const payload = await verifyToken(request, response, cookie);
    if (!payload) throw response.redirect("/login", 302);

    const token = url.searchParams.get('token')
    if (!token) throw response.error(401)
    const tokenData = await db.token.findFirst({ where: { token } })
    if (!tokenData) throw response.error(401)
    const { type, expiry } = tokenData
    const expired = expiry.getTime() < Math.floor(Date.now() / 1000)
    if (expired) throw response.error(401)
    if (type !== Tokens.ADD_NEW_USER) throw response.error(401)

    // Happy :)

    return { token }
}

export default NewUserResource;