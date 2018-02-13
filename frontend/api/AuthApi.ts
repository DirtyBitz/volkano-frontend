import axios, { AxiosError } from 'axios'
import { convertUserJson, User, IUserJson } from '../models/User'

export interface IUserRegisterDetails {
  email: string
  password: string
  nickname?: string
}

export interface IAuthData {
  user: User
  token: string
}

export class AuthApi {
  public static async authenticateUser(email: string, password: string) {
    try {
      const response = await axios.post('http://localhost:5000/auth/sign_in', {
        email,
        password,
      })

      const userJson: IUserJson = response.data.data

      const authResponse: IAuthData = {
        user: convertUserJson(userJson),
        token: response.headers['access-token'],
      }

      return authResponse
    } catch (error) {
      return await this.handleError(error)
    }
  }

  public static async registerNewUser(userFormFields: IUserRegisterDetails) {
    try {
      console.log(userFormFields)
      const response = await axios.post('http://localhost:5000/auth/', userFormFields)
      return convertUserJson(response.data.data)
    } catch (error) {
      return await this.handleError(error)
    }
  }

  private static handleError = async (error: AxiosError) => {
    if (error.message === 'Network Error') {
      return Promise.reject(['Server down!'])
    }

    const { status, data } = error.response

    let errors = []
    if (typeof data.errors === 'object') {
      errors = data.errors.full_messages
    } else {
      errors = data.errors
    }

    switch (status) {
      case 401:
      case 422:
        return Promise.reject(errors)
      case 500:
        return Promise.reject(['Server down!'])
      default:
        return Promise.reject(['Unknown error'])
    }
  }
}
