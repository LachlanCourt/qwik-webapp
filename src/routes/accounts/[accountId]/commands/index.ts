import { component$ } from "@builder.io/qwik";
import { RequestHandler } from "@builder.io/qwik-city";
import { verifyToken } from "~/common/authentication/verifyToken";
import {CommandsResource } from '~/pages/command/CommandsPage' 
import { db } from "db";
import { CommandData } from "./[commandId]";
import { getAccount } from "~/common/accessors/getAccount";
import { getCommands } from "~/common/accessors/getCommands";







export const onGet: RequestHandler<Array<CommandData>> = async ({params, request, response, cookie}) => {
    const payload = await verifyToken(request, response, cookie)
    if (!payload) throw response.redirect('/login', 302)

    const account = await getAccount(Number(params.accountId), Number(payload.userId))
    if (!account) throw response.error(404)

    const commands = await getCommands(account.id)
    
    return commands.map((command) => ({commandId: command.id, name: command.name, accountId: command.accountId}))

  };
  
  
export default CommandsResource;

