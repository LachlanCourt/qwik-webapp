import type { RequestHandler } from '@builder.io/qwik-city';
import {db} from 'db'
import { lib} from 'crypto-js'
import sha256 from 'crypto-js/sha256'
import { createToken } from '~/common/authentication/createToken';

interface ExistingUser {
  jwt: string
}
  
  export const onGet: RequestHandler<ExistingUser> = async ({request, response}) => {
    const {email, password} = await request.json()
    if (!email || !password) throw response.error(400)

    const passwordHash = sha256(password).toString()

    const user = await db.user.findFirst({where:{email}})
    //@ts-expect-error
    if (!user) throw response.error(400, "User not found")
    if (passwordHash !== user.password) throw response.error(401)

    // Clean up old sessions if the user is logging in again
    await db.session.deleteMany({where: {userId :user.id}})
    
    const sessionKey = lib.WordArray.random(32).toString()
    const session = await db.session.create({data: {userId: user.id, sessionKey}})
    //TODO add session to middleware
    
    const jwt = await createToken({sessionKey, userId:user.id}, response)

    // put your DB access here, we are hard coding a response for simplicity.
    return {
      jwt
    };
  };
  
  // export const onPost: RequestHandler<ProductData> = async ({ params }) => {  }
  // export const onPut: RequestHandler<ProductData> = async ({ params }) => {  }
  // export const onPatch: RequestHandler<ProductData> = async ({ params }) => {  }
  // export const onDelete: RequestHandler<ProductData> = async ({ params }) => {  }


