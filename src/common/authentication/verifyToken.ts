import { Cookie, RequestContext, ResponseContext } from "@builder.io/qwik-city"
import * as jose from 'jose'

export const verifyToken = async (request: RequestContext, response: ResponseContext, cookie:Cookie) => {
    const jwt = cookie.get('token')?.value || request.headers.get('authorization')
    if (!jwt) throw response.redirect('/login', 302)
    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) throw response.error(500)
      

    let payload;
    try {
      ({ payload } = await jose.jwtVerify(jwt, new TextEncoder().encode(jwtSecret), {
        issuer: 'lachourt:qwik-webapp',
        audience: 'lachourt:quik-webapp:user',
      }))
    } catch (err) {
      console.log(err)
      throw response.redirect('/login', 302)
    }

      return payload;
}