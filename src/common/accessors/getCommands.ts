import {db} from 'db'
export const getCommands = async (accountId:number) => {
    return await db.command.findMany({where: {
        accountId
    }})}