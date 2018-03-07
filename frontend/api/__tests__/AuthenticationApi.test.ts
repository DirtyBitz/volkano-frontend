import { AuthenticationApi, IUserRegisterDetails, ErrorState } from '../AuthenticationApi'
import { mockUser } from '../__mocks__/VolkanoRequest'
import { VolkanoHTTPResponse } from '../VolkanoRequest'

class MockRequest {
  public static async post(path: string, options: any): Promise<VolkanoHTTPResponse> {
    const { login } = options.params
    if (path === '/auth/sign_in') {
      if (login === 'throwboi')
        return Promise.reject({ status: 401, data: { errors: ['No such user'] } })

      if (login === '500boi')
        return Promise.reject({ status: 500, data: { errors: ['Internal server error'] } })

      if (login === 'teapot')
        return Promise.reject({ status: 418, data: { errors: ["Here's my handle", "here's my spout"] } })

      if (login === 'networky')
        return Promise.reject({ status: 1337, message: 'Network Error' })

      return Promise.resolve({ data: mockUser })
    }

    if (login === 'unprocessableboi')
      return Promise.reject({ status: 422, data: { errors: { full_messages: ['Invalid email'] } } })

    return Promise.resolve({ data: '' })
  }
}

describe('Authentication API', () => {
  beforeEach(() => {
    Object.defineProperty(AuthenticationApi, 'requester', { get: () => MockRequest })
  })

  describe('authenticating am existing user', () => {
    it('with valid credentials', async () => {
      const user = await AuthenticationApi.authenticateUser(
        'test@example.com',
        'password'
      )
      expect(user).toEqual(mockUser)
    })

    it('with invalid credentials', async () => {
      try {
        await AuthenticationApi.authenticateUser('throwboi', 'wrong password')
        expect("This should not happen").toBe(true)
      } catch (error) {
        expect(error).toEqual(['No such user'])
      }
    })
  })

  describe('registering a new user', () => {
    const newUserDetails: IUserRegisterDetails = {
      email: 'test@example.com',
      password: 'password',
    }

    it('with valid credentials', async () => {
      let thrown = false
      try {
        await AuthenticationApi.registerNewUser(newUserDetails)
      } catch (error) {
        thrown = true
      }
      expect(thrown).toBe(false)
    })

    it('with invalid credentials', async () => {
      const badUserDetails = { ...newUserDetails, login: 'unprocessableboi' }
      try {
        await AuthenticationApi.registerNewUser(badUserDetails)
        expect("This should not happen").toBe(true)
      } catch (error) {
        expect(error).toEqual(['Invalid email'])
      }
    })
  })

  describe('with error', () => {
    it('500: returns server error status message', async () => {
      try {
        await AuthenticationApi.authenticateUser('500boi', 'passwordboi')
        expect("This should not happen").toBe(true)
      } catch (boi) {
        expect(boi).toEqual([ErrorState.SERVER_ERROR])
      }
    })

    it('418: returns unknown error status message', async () => {
      try {
        await AuthenticationApi.authenticateUser('teapot', 'IAm')
        expect("This should not happen").toBe(true)
      } catch (error) {
        expect(error).toEqual([ErrorState.UNKNOWN_ERROR])
      }
    })

    it('returns "Network error" when server is unreachable', async () => {
      try {
        await AuthenticationApi.authenticateUser('networky', 'boi')
        expect("This should not happen").toBe(true)
      } catch (error) {
        expect(error).toEqual([ErrorState.NETWORK_ERROR])
      }
    })
  })
})
