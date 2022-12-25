import type { RequestHandler } from '@builder.io/qwik-city';

interface ProductData {
    skuId: string;
    price: number;
    description: string;
  }
  
  export const onGet: RequestHandler<ProductData> = async ({ params }) => {
    // put your DB access here, we are hard coding a response for simplicity.
    return {
      skuId: params.skuId,
      price: 123.45,
      description: `Description for ${params.skuId}`,
    };
  };
  
  export const onPost: RequestHandler<ProductData> = async ({ params }) => {  }
  export const onPut: RequestHandler<ProductData> = async ({ params }) => {  }
  export const onPatch: RequestHandler<ProductData> = async ({ params }) => {  }
  export const onDelete: RequestHandler<ProductData> = async ({ params }) => {  }