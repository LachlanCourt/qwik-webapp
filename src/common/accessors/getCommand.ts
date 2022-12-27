import {db} from 'db'
export const getCommand = async(commandId:number) => {
    return await db.command.findFirst({where: {id: commandId}})
  }