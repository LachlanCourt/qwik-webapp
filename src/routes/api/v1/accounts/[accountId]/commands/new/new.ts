import { RequestHandler } from "@builder.io/qwik-city";
import { verifyToken } from "~/common/authentication/verifyToken";
import {db} from 'db'

interface Response {}

const getAccount = async (accountId:number, userId:number) => {
  return await db.account.findFirst({where: {
    AND: [{
      id: accountId
    },
    {
    OR: [
      {
        adminId: Number(userId)
      },
      {
        moderators: {
          some: {
            userId: Number(userId)
          }
        }
      }
    ]}
    ]
  }})
}
/**
 * Form data
 */
export const onPost: RequestHandler<Response> = async ({params, request, response, cookie}) => {
    const payload = await verifyToken(request, response, cookie)
    if (!payload) throw response.redirect('/login', 302)
    const formData = await request.formData();

    const name = formData.get('name')?.toString() || 'New Command'
    const accountId = Number(params.accountId)
    const account = await getAccount(accountId, Number(payload.userId))
    if (!account) throw response.error(401)

    //TODO authorise by ADMIN role
    const command = await db.command.create({data: {name, accountId}})

    throw response.redirect(`/accounts/${accountId}/commands/${command.id}`, 302)

  };
  

