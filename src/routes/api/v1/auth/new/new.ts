import type { RequestHandler } from '@builder.io/qwik-city';
import {db} from 'db'
import { lib} from 'crypto-js'
import sha256 from 'crypto-js/sha256'
import { createToken } from 'authentication/createToken';


  interface NewUser {
    jwt: string;
  }
  
  export const onGet: RequestHandler<NewUser> = async ({request, response}) => {
    const {email, password} = await request.json()
    
    
    const  result = await db.user.findFirst({where: { email }})
    if (result) {
      // The qwik error interface only accepts a status code but the message carries through still
      //@ts-expect-error
      throw response.error(400, "User already exists")
    }


    const passwordHash = sha256(password).toString()
    const user = await db.user.create({data: {email, password: passwordHash}})

    const sessionKey = lib.WordArray.random(32).toString()
    await db.session.create({data: {userId: user.id, sessionKey}})

    

    const jwt = await createToken({ sessionKey, userId: user.id }, response)
    

    return {jwt}
  };
  
  // export const onPost: RequestHandler = async ({ request, response }) => { 
    
    
  
  //  }
  // export const onPut: RequestHandler<ProductData> = async ({ params }) => {  }
  // export const onPatch: RequestHandler<ProductData> = async ({ params }) => {  }
  // export const onDelete: RequestHandler<ProductData> = async ({ params }) => {  }