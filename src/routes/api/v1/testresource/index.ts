import type { RequestHandler } from '@builder.io/qwik-city';
import { verifyToken } from 'authentication/verifyToken';

interface ProductData {
    
    description: string;
  }
  
  export const onGet: RequestHandler<ProductData> = async ({ request, response }) => {
    const payload = await verifyToken(request, response)
    // This should be response.redirect but it was getting overridden to a 405. More investigation required
    if (!payload) throw response.error(301)

    return {
      description: `You're authorised! Hooray!`,
    };
  };
  
  export const onPost: RequestHandler<ProductData> = async ({ params }) => {  }
  export const onPut: RequestHandler<ProductData> = async ({ params }) => {  }
  export const onPatch: RequestHandler<ProductData> = async ({ params }) => {  }
  export const onDelete: RequestHandler<ProductData> = async ({ params }) => {  }