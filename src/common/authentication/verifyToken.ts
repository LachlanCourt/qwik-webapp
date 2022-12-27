import { Cookie, RequestContext, ResponseContext } from "@builder.io/qwik-city"
import * as jose from 'jose'
import {db} from 'db'

export const verifyToken = async (request: RequestContext, response: ResponseContext, cookie:Cookie) => {
    const jwt = cookie.get('token')?.value || ''
    if (!jwt) throw response.error(401)
    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) throw response.error(500)
      

    let payload;
    try {
      ({ payload } = await jose.jwtVerify(jwt, new TextEncoder().encode(jwtSecret), {
        issuer: 'lachourt:qwik-webapp',
        audience: 'lachourt:quik-webapp:user',
      }))
    } catch (err) {
      return null
    }

      return payload;
}