import { IUserRegisterDetails, IUserAuthResponse } from '../AuthApi'

export class AuthApi {
  public static async authenticateUser(username: string, password: string) {
    const fakeResponse: IUserAuthResponse = {
      success: true,
      data: {
        id: 1,
        uid: 'post@example.com',
        name: null,
        email: 'post@example.com',
        provider: 'email',
        image: null,
        nickname: null,
      },
      token: 'fake-token',
      errors: ['this is a fake error message'],
    }

    return Promise.resolve(fakeResponse)
  }

  public static async registerNewUser(user: IUserRegisterDetails) {
    // TODO: Mock me with fake data for tests
  }
}
