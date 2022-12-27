import { component$ } from "@builder.io/qwik";
import { RequestHandler } from "@builder.io/qwik-city";
import { verifyToken } from "~/common/authentication/verifyToken";
import {AccountsResource } from '../../pages/account/Accounts' 
import { db } from "db";
import { prisma } from "@prisma/client";

export interface AccountData {
    accountId: number
    name: string
}


export const onGet: RequestHandler<Array<AccountData>> = async ({params, request, response, cookie}) => {
    const payload = await verifyToken(request, response, cookie)
    if (!payload) throw response.redirect('/login', 302)

    const accounts = await db.account.findMany({where: {
        moderators: {
            some: {
                 userId: Number(payload.userId)
            }
        }
    }})
    console.log(accounts)

    // db.account.where({id: params.accountId})
    
    return accounts.map((account) => ({accountId: account.id, name: account.name}))
    //TODO Find account using payload.userId
    // const accountId = 1
    // throw response.redirect(`/accounts/${accountId}`, 302)
  };
  
  
export default AccountsResource;

