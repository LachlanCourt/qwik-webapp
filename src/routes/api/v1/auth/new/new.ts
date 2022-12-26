import type { RequestHandler } from '@builder.io/qwik-city';
import {db} from 'db'
import sha256 from 'crypto-js/sha256';
import crypto from 'crypto-js'
import * as jose from 'jose'

interface ProductData {
    skuId: string;
    price: number;
    description: string;
    error?: string
  }

  interface NewUser {
    message?: string;
    jwt?: string;
  }
  
  export const onGet: RequestHandler<ProductData> = async () => {
    const data = await db.user.findMany()
    console.log(data)
    // put your DB access here, we are hard coding a response for simplicity.
    return {
      skuId: '123',
      price: 123.45,
      description: `Description for the auth endpoint`,
    };
  };
  
  export const onPost: RequestHandler<NewUser> = async ({ params, request, response }) => { 
    const {email, password} = await request.json()
    
    
    const  result = await db.user.findFirst({where: { email }})
    if (result) {
      // The qwik error interface only accepts a status code but the message carries through still
      //@ts-expect-error
      throw response.error(400, "User already exists")
    }


    const passwordHash = sha256(password).toString()
    const user = await db.user.create({data: {email, password: passwordHash}})

    const sessionKey = crypto.lib.WordArray.random(32).toString()
    await db.session.create({data: {userId: user.id, sessionKey}})

    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) throw response.error(500)
    console.log('secret', jwtSecret)
    
    const jwt = await new jose.SignJWT({ sessionKey, userId: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setIssuer('lachourt:qwik-webapp')
      .setAudience('lachourt:quik-webapp:user')
      .setExpirationTime('2h')
      .sign(new TextEncoder().encode(jwtSecret))
    
    console.log(jwt)

    return {jwt}
    // request.json().then((data) => console.log(data))
    
  
   }
  export const onPut: RequestHandler<ProductData> = async ({ params }) => {  }
  export const onPatch: RequestHandler<ProductData> = async ({ params }) => {  }
  export const onDelete: RequestHandler<ProductData> = async ({ params }) => {  }