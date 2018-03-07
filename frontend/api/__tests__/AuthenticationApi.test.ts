import { AuthenticationApi, IUserRegisterDetails } from '../AuthenticationApi'
import { mockUser } from '../__mocks__/VolkanoRequest'
import { VolkanoHTTPResponse } from '../VolkanoRequest'

class MockRequest {
  public static async post(path: string, options: any): Promise<VolkanoHTTPResponse> {
    const { login } = options.params
    if (path === '/auth/sign_in') {
      if (login === 'throwboi')
        return Promise.reject({ status: 401, data: { errors: ['No such user'] } })
      return Promise.resolve({ data: mockUser })
    }

    if (login === 'wrongboi')
      return Promise.reject({ status: 422, data: { errors: ['Invalid email'] } })
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
      const badUserDetails = { ...newUserDetails, email: 'wrongboi' }
      try {
        await AuthenticationApi.registerNewUser(badUserDetails)
      } catch (error) {
        expect(error).toEqual(['Invalid email'])
      }
    })
  })

  describe('with error', () => {
    it('500: returns server error status message')
    it('418: returns unknown error status message')
  })
})
