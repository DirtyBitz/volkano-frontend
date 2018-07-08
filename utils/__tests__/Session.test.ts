import { setSession, getSession, hasSession, clearSession, ISession } from '../Session'
import jsCookie from 'js-cookie'
jest.mock('js-cookie')

describe('Session utils', () => {
  const validSession: ISession = { token: 'dummy', client: 'dummy', uid: 'dummy' }
  describe('getSession', () => {
    it('returns a valid session when one exists', () => {
      jsCookie.get = jest.fn(() => '{ "user": true }')
      const session = getSession()

      expect(session).toEqual({ user: true })
    })

    it('returns undefined if no session exists', () => {
      jsCookie.get = jest.fn()
      const session = getSession()

      expect(session).toBeUndefined()
    })
  })

  describe('setSession', () => {
    it('stores the session', () => {
      jsCookie.set = jest.fn()
      setSession(validSession)

      expect(jsCookie.set).toHaveBeenCalledWith(
        expect.anything(),
        validSession,
        expect.anything()
      )
    })
  })

  describe('hasSession', () => {
    it('returns true when session exists', () => {
      jsCookie.get = jest.fn(() => validSession)
      const isSignedIn = hasSession()

      expect(isSignedIn).toBe(true)
    })

    it('returns false when no session exists', () => {
      jsCookie.get = jest.fn()
      const isSignedIn = hasSession()

      expect(isSignedIn).toBe(false)
    })
  })

  describe('clearSession', () => {
    it('removes session', () => {
      jsCookie.remove = jest.fn()

      clearSession()
      expect(jsCookie.remove).toHaveBeenCalled()
    })
  })
})
