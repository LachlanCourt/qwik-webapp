import { RequestHandler } from '@builder.io/qwik-city'
import { getAccount } from '~/common/accessors/getAccount'
import { verifyToken } from '~/common/authentication/verifyToken'
import { AddUserPage } from '~/pages/user/AddUserPage'


interface Response { }

export const onGet: RequestHandler<Response> = async ({ request, response, cookie, params }) => {
    const payload = await verifyToken(request, response, cookie)
    if (!payload) throw response.redirect('/login', 302)

    const account = await getAccount(Number(params.accountId), payload.userId)
    if (!account || account.adminId !== payload.userId) throw response.error(404)
}

export default AddUserPage;