import type { RequestHandler } from '@builder.io/qwik-city';

interface ProductData {
    skuId: string;
    price: number;
    description: string;
  }
  
  export const onGet: RequestHandler<ProductData> = async () => {
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