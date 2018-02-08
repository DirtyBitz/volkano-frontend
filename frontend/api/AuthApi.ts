import axios from 'axios'
import { IUserJson } from '../models/User'

export interface IUserRegisterDetails {
  email: string
  password: string
}

export interface IUserAuthResponse {
  success?: boolean
  errors?: string[]
  data?: {
    id: number
    email: string
    provider: string
    uid: string
    name: string | null
    nickname: string | null
    image: string | null
  }
  token?: string
}

export interface IUserCreateResponse {
  status: 'error' | ''
  success?: boolean
  data?: IUserJson
  errors?: { [key: string]: string[] }
}

export class AuthApi {
  /**
   * @description Correspons to backend POST /auth/sign_in
   */
  public static async authenticateUser(username: string, password: string) {
    return Promise.resolve(fakeResponse)
  }

  /**
   * @description Correspons to backend POST /auth
   */
  public static async registerNewUser(user: IUserRegisterDetails) {
    // Implement me
  }
}

/*
 * Remove me when implementing authenticateUser
 */
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
