import { RequestHandler } from "@builder.io/qwik-city";
import { verifyToken } from "~/common/authentication/verifyToken";
import { db } from 'db'
import { getAccount } from "~/common/accessors/getAccount";

export const onPost: RequestHandler = async (requestEvent) => {
    const { params, request, cookie, redirect, error } = requestEvent;
    const payload = await verifyToken(requestEvent);
    if (!payload) throw redirect(302, "/login");

    const account = await getAccount(Number(params.accountId), payload.userId, payload.isGlobalAdmin)
    if (!account) throw error(404, 'Account Not Found')

    const formData = await request.formData();

    const name = formData.get('name')?.toString() || ''

    await db.account.update({ where: { id: account.id }, data: { name } })
    throw redirect(302, `/accounts/${account.id}`)
}