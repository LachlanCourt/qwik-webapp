import { component$ } from '@builder.io/qwik';
import type { DocumentHead, RequestHandler } from '@builder.io/qwik-city';
import { verifyToken } from '~/common/authentication/verifyToken';
import Dashboard from '../pages/dashboard/Dashboard'

interface Response {}

export const onGet: RequestHandler<Response> = async ({request, response, cookie}) => {
  const payload = await verifyToken(request, response, cookie)
  if (!payload) throw response.redirect('/login', 302)
  throw response.redirect(`/accounts`, 302)
};


