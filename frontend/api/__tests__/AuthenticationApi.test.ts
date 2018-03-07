import { AuthenticationApi, IUserRegisterDetails, ErrorState } from '../AuthenticationApi'
import { mockUser } from '../__mocks__/VolkanoRequest'
import { VolkanoHTTPResponse } from '../VolkanoRequest'

class MockRequest {
  private static _response: Promise<any>

  public static async post(path: string, options: any): Promise<VolkanoHTTPResponse> {
    return this.respondWith
  }

  public static get respondWith(): Promise<any> {
    return this._response
  }

  public static set respondWith(promise: Promise<any>) {
    this._response = promise
  }
}

describe('Authentication API', () => {
  beforeEach(() => {
    Object.defineProperty(AuthenticationApi, 'requester', { get: () => MockRequest })
  })

  describe('authenticating am existing user', () => {
    it('with valid credentials', async () => {
      MockRequest.respondWith = Promise.resolve({ data: mockUser })

      const user = await AuthenticationApi.authenticateUser(
        'test@example.com',
        'password'
      )
      expect(user).toEqual(mockUser)
    })

    it('with invalid credentials', async () => {
      MockRequest.respondWith = Promise.reject({ status: 401, data: { errors: ['No such user'] } })

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
      MockRequest.respondWith = Promise.resolve({ data: mockUser })

      let thrown = false
      try {
        await AuthenticationApi.registerNewUser(newUserDetails)
      } catch (error) {
        thrown = true
      }
      expect(thrown).toBe(false)
    })

    it('with invalid credentials', async () => {
      MockRequest.respondWith = Promise.reject(
        { status: 422, data: { errors: { full_messages: ['Invalid email'] } } }
      )

      try {
        await AuthenticationApi.registerNewUser(newUserDetails)
        expect("This should not happen").toBe(true)
      } catch (error) {
        expect(error).toEqual(['Invalid email'])
      }
    })
  })

  describe('with error', () => {
    it('500: returns server error status message', async () => {
      MockRequest.respondWith = Promise.reject({ status: 500, data: { errors: ['Internal server error'] } })

      try {
        await AuthenticationApi.authenticateUser('500boi', 'passwordboi')
        expect("This should not happen").toBe(true)
      } catch (boi) {
        expect(boi).toEqual([ErrorState.SERVER_ERROR])
      }
    })

    it('418: returns unknown error status message', async () => {
      MockRequest.respondWith = Promise.reject(
        { status: 418, data: { errors: ["Here's my handle", "here's my spout"] } }
      )

      try {
        await AuthenticationApi.authenticateUser('teapot', 'IAm')
        expect("This should not happen").toBe(true)
      } catch (error) {
        expect(error).toEqual([ErrorState.UNKNOWN_ERROR])
      }
    })

    it('returns "Network error" when server is unreachable', async () => {
      MockRequest.respondWith = Promise.reject(
        { status: 1337, message: 'Network Error' }
      )

      try {
        await AuthenticationApi.authenticateUser('networky', 'boi')
        expect("This should not happen").toBe(true)
      } catch (error) {
        expect(error).toEqual([ErrorState.NETWORK_ERROR])
      }
    })
  })
})
