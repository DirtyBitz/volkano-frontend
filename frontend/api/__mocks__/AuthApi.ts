import { IAuthData, IUserRegisterDetails } from '../AuthApi'

export class AuthApi {
  public static async authenticateUser(username: string, password: string) {
    const fakeData: IAuthData = {
      user: {
        id: 1,
        email: 'test@user.com',
      },
      token: 'fake_token',
    }
    return fakeData
  }

  public static async registerNewUser(user: IUserRegisterDetails) {
    console.warn('registerNewUser not implemented', user)
    throw 'Not implemented'
  }
}
