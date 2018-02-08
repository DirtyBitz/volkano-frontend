import axios from 'axios'
import { convertUserJson, User } from '../models/User'

export interface IUserRegisterDetails {
  email: string
  password: string
}

export interface IAuthData {
  user: User
  token: string
}

export class AuthApi {
  public static async authenticateUser(username: string, password: string) {
    try {
      const response = await axios.post('http://localhost:5000/auth/sign_in', {
        email: username,
        password,
      })

      const authResponse: IAuthData = {
        user: convertUserJson(response.data.data),
        token: response.headers['access-token'],
      }

      return authResponse
    } catch (error) {
      const { status, data } = error.response
      switch (status) {
        case 401:
          return Promise.reject(data.errors)
        case 500:
          return Promise.reject(['Server down!'])
        default:
          return Promise.reject(['Unknown error'])
      }
    }
  }

  public static async registerNewUser(user: IUserRegisterDetails) {
    console.warn('registerNewUser not implemented', user)
    throw 'Not implemented'
  }
}
