import { RequestHandler, useLocation } from "@builder.io/qwik-city";
import { verifyToken } from "~/common/authentication/verifyToken";
import { db } from 'db'
import cryptojs from 'crypto-js'
import { Tokens } from "~/common/constants";
import { mailer } from "~/common/mailers/mailer";

interface Response { }

export const onPost: RequestHandler<Response> = async ({ request, response, cookie, url }) => {
    const payload = await verifyToken(request, response, cookie);
    if (!payload) throw response.redirect("/login", 302);

    //TODO get the account id somehow
    const accountId = 1
    //TODO Should this verify to user too using the getAccount accessor?
    const account = await db.account.findFirst({ where: { id: accountId } })
    if (!account) throw response.error(404)

    const formData = await request.formData();
    const email = formData.get("email")?.toString() || "";

    const token = cryptojs.lib.WordArray.random(32).toString();
    // 24 hours
    const expiry = new Date(Math.floor(Date.now() / 1000) + 1440)

    await db.token.deleteMany({ where: { email, type: Tokens.ADD_NEW_USER } })
    await db.token.create({ data: { email, token, type: Tokens.ADD_NEW_USER, expiry, accountId } });

    //TODO Get origin somehow
    const origin = url.origin

    const html = `
        <div>
            You have been added to the team for the account ${account.name}!
            Click the following link if you want to join!
            <a href="${origin}/api/v1/users/addnew?token=${token}">Howdy</a>
        </div>`


    const mailProvider = mailer({ to: "lachourt.dev", html, subject: 'Add User', text: "HTML ONLY FOR NOW" })
    await mailProvider.send()

    throw response.redirect(`/accounts/${accountId}`, 302)
}

export const onGet: RequestHandler<Response> = async ({ request, response, cookie, url }) => {
    const payload = await verifyToken(request, response, cookie);
    if (!payload) throw response.redirect("/login", 302);

    const token = url.searchParams.get('token')
    if (!token) throw response.error(401)
    const tokenData = await db.token.findFirst({ where: { token } })
    if (!tokenData) throw response.error(401)
    const { type, expiry } = tokenData
    console.log(expiry.getTime())
    console.log(Date.now())
    const expired = expiry.getTime() < Math.floor(Date.now() / 1000)
    if (expired) throw response.error(401)

    if (type === Tokens.ADD_NEW_USER) throw response.redirect(`/users/new?token=${token}`)
    if (type === Tokens.ADD_NEW_ACCOUNT) return // TODO Add New Account endpoint
}