import jsCookie from 'js-cookie'

export interface ISession {
  token: string
  uid: string
  client: string
  user?: {
    email: string
    id: number
    name?: string | null
    nickname?: string | null
  }
}

export function hasSession() {
  const session = jsCookie.get('session')
  if (session) return true
  return false
}

export function getSession(): ISession | undefined {
  const cookie = jsCookie.get('session')
  if (cookie) {
    const session: ISession = JSON.parse(cookie)
    return session
  }
}

export function setSession(session: ISession) {
  jsCookie.set('session', session, { expires: 7 })
}

export function clearSession() {
  jsCookie.remove('session')
}
