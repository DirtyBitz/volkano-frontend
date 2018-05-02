import AuthApi, { IUserRegisterDetails, ErrorState } from '../AuthApi'
import VolkanoRequest from '../VolkanoRequest'
import { IUser } from '../../models/User'
import { getSession, setSession, ISession } from '../../utils/Session'
jest.mock('../VolkanoRequest')

const mockUser: IUser = { email: 'test@example.com', id: 0 }

describe('Authentication utils', () => {
  describe('signIn', () => {
    it('with valid credentials', async () => {
      VolkanoRequest.post = jest.fn(() => Promise.resolve({ data: mockUser }))

      const user = await AuthApi.signIn('test@example.com', 'password')
      expect(user).toEqual(mockUser)
    })

    it('with invalid credentials', async () => {
      VolkanoRequest.post = jest.fn(() =>
        Promise.reject({
          status: 401,
          data: { errors: ['No such user'] },
        })
      )

      try {
        await AuthApi.signIn('throwboi', 'wrong password')
        expect('This should not happen').toBe(true)
      } catch (error) {
        expect(error.errors).toEqual(['No such user'])
      }
    })
  })

  describe('registerNewUser', () => {
    const newUserDetails: IUserRegisterDetails = {
      email: 'test@example.com',
      password: 'password',
    }

    it('with valid credentials', async () => {
      VolkanoRequest.post = jest.fn(() => Promise.resolve({ data: mockUser }))

      let thrown = false
      try {
        await AuthApi.registerNewUser(newUserDetails)
      } catch (error) {
        thrown = true
      }
      expect(thrown).toBe(false)
    })

    it('with invalid credentials', async () => {
      VolkanoRequest.post = jest.fn(() =>
        Promise.reject({
          status: 422,
          data: {
            errors: {
              email: 'already taken',
              full_messages: 'Email has already been taken',
            },
          },
        })
      )

      try {
        await AuthApi.registerNewUser(newUserDetails)
        expect('This should not happen').toBe(true)
      } catch (error) {
        const { email, full_messages } = error.errors
        expect(email).toEqual('already taken')
        expect(full_messages).toEqual('Email has already been taken')
      }
      expect(VolkanoRequest.post).toHaveBeenCalled()
    })
  })

  describe('with error', () => {
    it('500: returns server error status message', async () => {
      VolkanoRequest.post = jest.fn(() =>
        Promise.reject({
          status: 500,
          data: { errors: ['Internal server error'] },
        })
      )

      try {
        await AuthApi.signIn('500boi', 'passwordboi')
        expect('This should not happen').toBe(true)
      } catch (boi) {
        expect(boi).toEqual([ErrorState.SERVER_ERROR])
      }
    })

    it('418: returns unknown error status message', async () => {
      VolkanoRequest.post = jest.fn(() =>
        Promise.reject({
          status: 418,
          data: { errors: ["Here's my handle", "here's my spout"] },
        })
      )

      try {
        await AuthApi.signIn('teapot', 'IAm')
        expect('This should not happen').toBe(true)
      } catch (error) {
        expect(error).toEqual([ErrorState.UNKNOWN_ERROR])
      }
    })

    it('returns "Network error" when server is unreachable', async () => {
      VolkanoRequest.post = jest.fn(() =>
        Promise.reject({ status: 1337, message: 'Network Error' })
      )

      try {
        await AuthApi.signIn('networky', 'boi')
        expect('This should not happen').toBe(true)
      } catch (error) {
        expect(error).toEqual([ErrorState.NETWORK_ERROR])
      }
    })
  })

  describe('signOut', async () => {
    const session: ISession = { uid: 'a', client: 'b', token: 'c' }
    beforeEach(() => {
      setSession(session)
    })

    it('deletes session from browser', async () => {
      VolkanoRequest.delete = jest.fn(() => Promise.resolve({ status: 200 }))
      await AuthApi.signOut()
      expect(getSession()).not.toEqual(session)
    })

    it('deletes session from browser even if server is unreachable', async () => {
      VolkanoRequest.delete = jest.fn(() =>
        Promise.reject({ status: 500, message: 'Network Error' })
      )

      try {
        await AuthApi.signOut()
        expect('This should not happen').toBe(true)
      } catch (error) {
        expect(error).toEqual([ErrorState.NETWORK_ERROR])
      }
      expect(getSession()).not.toEqual(session)
    })
  })

  describe('updateUser', async () => {
    it('sends update request to backend', async () => {
      VolkanoRequest.put = jest.fn(() => {
        Promise.resolve({ status: 204 })
      })

      await AuthApi.updateUser({ value: 'ignored' })
      expect(VolkanoRequest.put).toHaveBeenCalledTimes(1)
    })

    it('throws an error when given invalid parameters', async () => {
      VolkanoRequest.put = jest.fn(() =>
        Promise.reject({
          status: 422,
          data: {
            errors: {
              nickname: 'already taken',
              full_messages: 'Nickname has already been taken',
            },
          },
        })
      )

      try {
        await AuthApi.updateUser({ value: 'ignored' })
        expect('this should never happen').toBe(true)
      } catch (error) {
        expect(error.errors.nickname).toEqual('already taken')
      }
    })
  })

  describe('updatePassword', async () => {
    it('sends update request to backend', async () => {
      VolkanoRequest.put = jest.fn(() => {
        Promise.resolve({ status: 200 })
      })

      await AuthApi.updatePassword('oldpass', 'newpass', 'newpass')
      expect(VolkanoRequest.put).toHaveBeenCalledTimes(1)
      expect(VolkanoRequest.put).toHaveBeenCalledWith('/auth/password', {
        current_password: 'oldpass',
        password: 'newpass',
        password_confirmation: 'newpass',
      })
    })

    it('throws an error when password is wrong', async () => {
      VolkanoRequest.put = jest.fn(() =>
        Promise.reject({
          status: 422,
          data: {
            errors: {
              current_password: 'is invalid',
              full_messages: 'Current password is invalid',
            },
          },
        })
      )

      try {
        await AuthApi.updatePassword('oldpass', 'newpass', 'newpass')
        expect('this should never happen').toBe(true)
      } catch (error) {
        expect(error.errors.current_password).toEqual('is invalid')
      }
    })
  })

  describe('isSignedIn', () => {
    const validSession: ISession = { uid: '1', client: 'valid', token: 'valid' }

    it('validates session against backend', async () => {
      VolkanoRequest.get = jest.fn(() => {
        return Promise.resolve('Session is a-ok!')
      })

      const isSignedIn = await AuthApi.isSignedIn(validSession)

      expect(isSignedIn).toBe(true)
      expect(VolkanoRequest.get).toHaveBeenCalledWith(
        '/auth/validate_token',
        validSession
      )
    })

    it('rejects missing session', async () => {
      const isSignedIn = await AuthApi.isSignedIn(undefined)
      expect(isSignedIn).toBe(false)
    })

    it('clears session if backend says its invalid', async () => {
      VolkanoRequest.get = jest.fn(async () => {
        return Promise.reject('Session is not ok!')
      })

      const isSignedIn = await AuthApi.isSignedIn(validSession)
      expect(isSignedIn).toBe(false)
    })
  })
})
