import { RequestHandler } from "@builder.io/qwik-city";
import { verifyToken } from "~/common/authentication/verifyToken";
import { db } from 'db'
import { getAccount } from "~/common/accessors/getAccount";

interface Response { }


/**
 * Form data
 */
export const onPost: RequestHandler<Response> = async ({ params, request, response, cookie }) => {
  const payload = await verifyToken(request, response, cookie)
  if (!payload) throw response.redirect('/login', 302)
  const formData = await request.formData();

  const name = formData.get('name')?.toString() || 'New Command'
  const formResponse = formData.get('response')?.toString() || 'Command Response'
  const accountId = Number(params.accountId)
  const account = await getAccount(accountId, payload.userId)
  if (!account) throw response.error(401)

  const command = await db.command.create({ data: { name, accountId, response: formResponse } })

  throw response.redirect(`/accounts/${accountId}/commands/${command.id}`, 302)

};


