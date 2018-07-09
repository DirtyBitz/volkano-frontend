import jsCookie from 'js-cookie'
import getConfig from 'next/config'

export interface ISession {
  token: string
  uid: string
  client: string
  user?: {
    email: string
    nickname?: string | null
  }
}

export function hasSession() {
  const session = jsCookie.get('session')
  return !!session
}

export function getSession(): ISession | undefined {
  const cookie = jsCookie.get('session')
  if (cookie) {
    const session: ISession = JSON.parse(cookie)
    return session
  }
}

export function setSession(session: ISession) {
  const config = getConfig()
  const prod = config && config.publicRuntimeConfig.ENV !== 'development'
  jsCookie.set('session', session, { expires: 7, secure: prod ? true : false })
}

export function clearSession() {
  jsCookie.remove('session')
}
