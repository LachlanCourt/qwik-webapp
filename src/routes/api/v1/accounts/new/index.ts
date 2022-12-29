import { RequestHandler } from "@builder.io/qwik-city";
import { verifyToken } from "~/common/authentication/verifyToken";
import cryptojs from 'crypto-js'
import { db } from "db";
import { Tokens } from "~/common/constants";
import { mailer } from "~/common/mailers/mailer";

interface Response { }

export const onPost: RequestHandler<Response> = async ({
    request,
    response,
    cookie,
    url
}) => {
    const payload = await verifyToken(request, response, cookie);
    if (!payload) throw response.redirect("/login", 302);

    const { isGlobalAdmin } = payload
    if (!isGlobalAdmin) return response.error(401)

    const formData = await request.formData();
    const email = formData.get("email")?.toString();
    if (!email) throw response.error(400)

    const token = cryptojs.lib.WordArray.random(32).toString();
    // 24 hours
    const expiry = new Date(Math.floor(Date.now() / 1000) + 1440)

    await db.token.deleteMany({ where: { email, type: Tokens.ADD_NEW_ACCOUNT } })
    await db.token.create({ data: { email, token, type: Tokens.ADD_NEW_ACCOUNT, expiry } });

    const origin = url.origin

    //TODO This should probably be pulled out to a template
    const html = `
        <div>
            You have been added as an admin for a new account!
            Click the following link if you want to join!
            <a href="${origin}/api/v1/users/adduser?token=${token}">Howdy</a>
        </div>`


    const mailProvider = mailer({ to: "lachourt.dev", html, subject: 'Add Account', text: "HTML ONLY FOR NOW" })
    await mailProvider.send()

    throw response.redirect(`/accounts`, 302)
};

export const onGet: RequestHandler<Response> = async ({ response, url }) => {
    const token = url.searchParams.get('token')
    if (!token) throw response.error(401)
    const tokenData = await db.token.findFirst({ where: { token } })
    if (!tokenData) throw response.error(401)
    const { type, expiry, email } = tokenData
    const expired = expiry.getTime() < Math.floor(Date.now() / 1000)
    if (expired) throw response.error(401)
    if (type !== Tokens.ADD_NEW_ACCOUNT) throw response.error(401)

    const user = await db.user.findFirst({ where: { email } })
    if (!user) throw response.error(400)

    const account = await db.account.create({ data: { name: 'New Account', adminId: user.id } })

    throw response.redirect(`/accounts/${account.id}`, 302)
}