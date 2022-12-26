import type { RequestHandler } from '@builder.io/qwik-city';
import {db} from 'db'

interface ProductData {
    skuId: string;
    price: number;
    description: string;
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
  
  export const onPost: RequestHandler<ProductData> = async ({ params }) => {  }
  export const onPut: RequestHandler<ProductData> = async ({ params }) => {  }
  export const onPatch: RequestHandler<ProductData> = async ({ params }) => {  }
  export const onDelete: RequestHandler<ProductData> = async ({ params }) => {  }