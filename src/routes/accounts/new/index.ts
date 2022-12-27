import { RequestHandler } from "@builder.io/qwik-city";
import {db} from 'db'
import { verifyToken } from "~/common/authentication/verifyToken";
import { AccountData } from "../[accountId]";

export const onGet: RequestHandler<AccountData> = async ({params, request, response, cookie}) => {
    const payload = await verifyToken(request, response, cookie)
    if (!payload) throw response.redirect('/login', 302)

    //TODO authorise by SUPER role
    //TODO this will likely happen in an api endpoint from a form post but this will do for now
    const account = await db.account.create({data: {name: 'New Account', adminId: Number(payload.userId)}})

    return {name: account.name, accountId: account.id}
  };
  