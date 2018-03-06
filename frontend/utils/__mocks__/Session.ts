import { ISession } from '../Session'

let fakeSession: ISession = {
  client: 'bleh',
  uid: 'bleh',
  token: 'fake-token',
}

export function getSession(): ISession | undefined {
  return fakeSession
}

export function setSession(session: ISession) {
  fakeSession = session
}
