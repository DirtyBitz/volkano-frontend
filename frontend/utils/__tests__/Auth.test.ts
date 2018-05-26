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
  })

  it('gets cookie from browser when no context is provided', async () => {
    AuthApi.isSignedIn = jest.fn(async () => {
      return Promise.resolve(true)
    })

    const mockSession = getSession()
    await isSignedIn(undefined)

    expect(AuthApi.isSignedIn).toHaveBeenCalledWith(mockSession)
  })

  it('return session when set', async () => {
    const fakeSession: ISession = { uid: '1', client: '2', token: '3' }
    const request = {
      headers: { cookie: 'session=' + encodeURI(JSON.stringify(fakeSession)) },
    }
    const session = await getReqSession(request)

    expect(session).toEqual(fakeSession)
  })

  it('returns nothing when no session', async () => {
    clearSession()
    const session = await getReqSession(undefined)
    expect(session).toEqual(undefined)
  })

  it('return nothing when cookie cant be parsed', async () => {
    const badContext = { headers: { cookie: 'session=yolo' } }
    const session = await getReqSession(badContext)
    expect(session).toBe(undefined)
  })
})
