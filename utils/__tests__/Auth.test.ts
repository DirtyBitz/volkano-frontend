import { signOut, isSignedIn, getReqSession } from '../Auth'
import Router from 'next/router'
import AuthApi from '../../api/AuthApi'
import { getSession, ISession, clearSession } from '../Session'
jest.mock('next/router')
jest.mock('../../api/AuthApi')
jest.mock('../Session')

describe('Auth utils', () => {
  describe('signOut', () => {
    it('delegates calls to lower level APIs', async () => {
      await signOut()
      expect(AuthApi.signOut).toHaveBeenCalledTimes(1)
      expect(Router.push).toHaveBeenCalledWith('/')
    })
  })

  describe('isSignedIn', () => {
    const session: ISession = { uid: '1', client: '2', token: '3' }
    const context = {
      headers: { cookie: 'session=' + encodeURI(JSON.stringify(session)) },
    }

    it('delegates calls to lower level APIs', async () => {
      AuthApi.isSignedIn = jest.fn(async () => {
        return Promise.resolve(true)
      })

      await isSignedIn(context)

      expect(AuthApi.isSignedIn).toHaveBeenCalledWith(session)
    })

    it('returns false when cookie is invalid', async () => {
      const badContext = { headers: { cookie: 'session=yolo' } }
      AuthApi.isSignedIn = jest.fn()

      const signedIn = await isSignedIn(badContext)

      expect(signedIn).toBe(false)
      expect(AuthApi.isSignedIn).not.toHaveBeenCalled()
    })

    it('gets cookie from browser when no context is provided', async () => {
      AuthApi.isSignedIn = jest.fn(async () => {
        return Promise.resolve(true)
      })

      const mockSession = getSession()
      await isSignedIn(undefined)

      expect(AuthApi.isSignedIn).toHaveBeenCalledWith(mockSession)
    })
  })

  describe('getReqSession', () => {
    it('return session when set', async () => {
      const fakeSession: ISession = { uid: '1', client: '2', token: '3' }
      const request = {
        headers: { cookie: 'session=' + encodeURI(JSON.stringify(fakeSession)) },
      }
      const session = await getReqSession(request)

      expect(session).toEqual(fakeSession)
    })

    it('return nothing when cookie cant be parsed', async () => {
      const badContext = { headers: { cookie: 'session=this is not valid' } }
      const session = await getReqSession(badContext)

      expect(session).toBe(undefined)
    })

    it('works with multiple cookies', async () => {
      const cookies = `__cfduid=d628ecdfb05ac1bcac7a2a165cd373f8d1527513988; session={%22uid%22:%22test@example.com%22%2C%22client%22:%22WPsk0cqCN05-r82N7d3YRA%22%2C%22token%22:%22ac-griFULj-eMc2av2vcNA%22%2C%22user%22:{%22id%22:1%2C%22email%22:%22test@example.com%22%2C%22name%22:null%2C%22nickname%22:%22My%20name%20is%20jeff%22}}`
      const context = { headers: { cookie: cookies } }

      const session = await getReqSession(context)

      expect(session).toBeTruthy()
      expect(session.uid).toBe('test@example.com')
    })

    it('returns nothing when the request has no session', async () => {
      const cookies = `__cfduid=d628ecdfb05ac1bcac7a2a165cd373f8d1527513988`
      const context = { headers: { cookie: cookies } }
      const session = await getReqSession(context)

      expect(session).toEqual(undefined)
    })

    it('returns nothing when the client has no session', async () => {
      clearSession()
      const session = await getReqSession(undefined)

      expect(session).toEqual(undefined)
    })
  })
})
