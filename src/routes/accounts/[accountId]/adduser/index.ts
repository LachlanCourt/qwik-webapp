import { RequestHandler } from '@builder.io/qwik-city'
import { getAccount } from '~/common/accessors/getAccount'
import { verifyToken } from '~/common/authentication/verifyToken'
import { AddUserData } from '~/models/AddUserData'
import { AddUserResource } from '~/pages/user/AddUserPage'

export const onGet: RequestHandler<AddUserData> = async ({ request, response, cookie, params }) => {
    const payload = await verifyToken(request, response, cookie)
    if (!payload) throw response.redirect('/login', 302)

    const account = await getAccount(Number(params.accountId), payload.userId)
    if (!account || account.adminId !== payload.userId) throw response.error(404)

    return { accountId: account.id }
}

export default AddUserResource;