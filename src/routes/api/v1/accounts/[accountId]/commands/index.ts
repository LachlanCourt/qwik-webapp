import { RequestHandler } from "@builder.io/qwik-city";
import { verifyToken } from "~/common/authentication/verifyToken";
import cryptojs from 'crypto-js'
import { db } from "db";
import { Tokens } from "~/common/constants";
import { getAccount } from "~/common/accessors/getAccount";
import { getCommands } from '~/common/accessors/getCommands'

interface Response { }

export const onGet: RequestHandler<Response> = async ({ request, response, url, params }) => {
    console.log('endpoint hit')
    const payload = await verifyToken(request, response);
    if (!payload) throw response.error(401);

    console.log('token passed')

    const account = await getAccount(Number(params.accountId), payload.userId, payload.isGlobalAdmin);
    if (!account) throw response.error(404);

    console.log('account found')

    const commands = await getCommands(account.id);
    console.log(commands)
    return commands.map((command) => ({ name: command.name, response: command.response, type: 'simple_response' }));
}