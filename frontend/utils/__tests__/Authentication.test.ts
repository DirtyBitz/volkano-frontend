import {
  signIn,
  signOut,
  registerNewUser,
  IUserRegisterDetails,
  ErrorState,
} from '../Authentication'
import VolkanoRequest from '../../api/VolkanoRequest'
import { IUser } from '../../models/User'
import { getSession, setSession, ISession } from '../../utils/Session'
jest.mock('../../api/VolkanoRequest')

const mockUser: IUser = { email: 'test@example.com', id: 0 }

describe('Authentication utils', () => {
  describe('signIn', () => {
    it('with valid credentials', async () => {
      VolkanoRequest.post.mockImplementation(() => Promise.resolve({ data: mockUser }))

      const user = await signIn('test@example.com', 'password')
      expect(user).toEqual(mockUser)
    })

    it('with invalid credentials', async () => {
      VolkanoRequest.post.mockImplementation(() =>
        Promise.reject({
          status: 401,
          data: { errors: ['No such user'] },
        })
      )

      try {
        await signIn('throwboi', 'wrong password')
        expect('This should not happen').toBe(true)
      } catch (error) {
        expect(error).toEqual(['No such user'])
      }
    })
  })

  describe('registerNewUser', () => {
    const newUserDetails: IUserRegisterDetails = {
      email: 'test@example.com',
      password: 'password',
    }

    it('with valid credentials', async () => {
      VolkanoRequest.post.mockImplementation(() => Promise.resolve({ data: mockUser }))

      let thrown = false
      try {
        await registerNewUser(newUserDetails)
      } catch (error) {
        thrown = true
      }
      expect(thrown).toBe(false)
    })

    it('with invalid credentials', async () => {
      VolkanoRequest.post.mockImplementation(() =>
        Promise.reject({
          status: 422,
          data: { errors: { full_messages: ['Invalid email'] } },
        })
      )

      try {
        await registerNewUser(newUserDetails)
        expect('This should not happen').toBe(true)
      } catch (error) {
        expect(error).toEqual(['Invalid email'])
      }
      expect(VolkanoRequest.post).toBeCalled()
    })
  })

  describe('with error', () => {
    it('500: returns server error status message', async () => {
      VolkanoRequest.post.mockImplementation(() =>
        Promise.reject({
          status: 500,
          data: { errors: ['Internal server error'] },
        })
      )

      try {
        await signIn('500boi', 'passwordboi')
        expect('This should not happen').toBe(true)
      } catch (boi) {
        expect(boi).toEqual([ErrorState.SERVER_ERROR])
      }
    })

    it('418: returns unknown error status message', async () => {
      VolkanoRequest.post.mockImplementation(() =>
        Promise.reject({
          status: 418,
          data: { errors: ["Here's my handle", "here's my spout"] },
        })
      )

      try {
        await signIn('teapot', 'IAm')
        expect('This should not happen').toBe(true)
      } catch (error) {
        expect(error).toEqual([ErrorState.UNKNOWN_ERROR])
      }
    })

    it('returns "Network error" when server is unreachable', async () => {
      VolkanoRequest.post.mockImplementation(() =>
        Promise.reject({ status: 1337, message: 'Network Error' })
      )

      try {
        await signIn('networky', 'boi')
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
      VolkanoRequest.delete.mockImplementation(() => Promise.resolve({ status: 200 }))
      await signOut()
      expect(getSession).not.toEqual(session)
    })

    it('deletes session from browser even if server is unreachable', async () => {
      VolkanoRequest.delete.mockImplementation(() =>
        Promise.reject({ status: 500, message: 'Network Error' })
      )
      try {
        await signOut()
        expect('This should not happen').toBe(true)
      } catch (error) {
        expect(error).toEqual([ErrorState.NETWORK_ERROR])
      }
      expect(getSession()).not.toEqual(session)
    })
  })
})
