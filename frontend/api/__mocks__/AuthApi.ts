import { IAuthData, IUserRegisterDetails } from '../AuthApi'
import { IUserJson } from '../../models/User'

export class AuthApi {
  public static async authenticateUser(username: string, password: string) {
    if (username === 'throw' || password === 'throw') {
      throw ['Did throw']
    }

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
    if (user.email === 'throw' || user.password === 'throw') {
      throw ['Did throw']
    }

    const fakeData: IUserJson = {
      id: 1,
      uid: user.email,
      provider: 'email',
      email: user.email,
      name: null,
      nickname: null,
      image: null,
    }
    return fakeData
  }
}
