import { Cookie, RequestContext, ResponseContext } from "@builder.io/qwik-city"
import * as jose from 'jose'
import {db} from 'db'

export const verifyToken = async (request: RequestContext, response: ResponseContext, cookie:Cookie) => {
    const jwt = cookie.get('token')?.value || ''
    if (!jwt) throw response.error(401)
    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) throw response.error(500)
      
      const { payload } = await jose.jwtVerify(jwt, new TextEncoder().encode(jwtSecret), {
        issuer: 'lachourt:qwik-webapp',
        audience: 'lachourt:quik-webapp:user',
      })

      const exp = payload.exp || 0
      const now = Math.floor(Date.now() / 1000)
    
      if (exp < now) {
        const sessionKey: string = payload.sessionKey?.toString() || ''
        const userId: number = Number(payload.userId) || 0
        await db.session.delete({where: { sessionKey, userId }})
        return null
      }

      return payload;
}