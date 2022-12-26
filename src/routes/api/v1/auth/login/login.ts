import type { RequestHandler } from '@builder.io/qwik-city';
import {db} from 'db'
import * as jose from 'jose'


interface ProductData {
    skuId: string;
    price: number;
    description: string;
  }
  
  export const onGet: RequestHandler<ProductData> = async ({payload, response}) => {
    // const data = await db.user.findMany()
    // console.log(data)


    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) throw response.error(500)
      const jwt =
        ''
      
      const { payload: jwtPayload, protectedHeader } = await jose.jwtVerify(jwt, new TextEncoder().encode(jwtSecret), {
        issuer: 'lachourt:qwik-webapp',
        audience: 'lachourt:quik-webapp:user',
      })
      
      console.log(protectedHeader)
      console.log(jwtPayload)

    // put your DB access here, we are hard coding a response for simplicity.
    return {
      skuId: '123',
      price: 123.45,
      description: `Description for the auth endpoint`,
    };
  };
  
  export const onPost: RequestHandler<ProductData> = async ({ params }) => {  }
  export const onPut: RequestHandler<ProductData> = async ({ params }) => {  }
  export const onPatch: RequestHandler<ProductData> = async ({ params }) => {  }
  export const onDelete: RequestHandler<ProductData> = async ({ params }) => {  }


