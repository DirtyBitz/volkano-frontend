import getConfig from 'next/config'
import VolkanoRequest, { IVolkanoHTTPError } from '../api/VolkanoRequest'
import { clearSession } from '../utils/Session'

export interface IUserRegisterDetails {
  email: string
  password: string
  nickname?: string
}

export enum ErrorState {
  SERVER_ERROR = 'Server is down',
  NETWORK_ERROR = 'Network error',
  UNKNOWN_ERROR = 'Unknown error',
}

export default class AuthApi {
  public static async registerNewUser(
    userFormFields: IUserRegisterDetails
  ): Promise<void | string[]> {
    const config = getConfig()
    /* istanbul ignore next */
    const host =
      (config && config.publicRuntimeConfig && config.publicRuntimeConfig.FRONTEND_URL) ||
      'this value only used in tests'
    const data = {
      ...userFormFields,
      confirm_success_url: `${host}/accountcreated`,
    }

    try {
      await VolkanoRequest.post('/auth', data)
    } catch (error) {
      return Promise.reject(handleError(error))
    }
  }

  public static async signIn(login: string, password: string) {
    try {
      const response = await VolkanoRequest.post('/auth/sign_in', {
        login,
        password,
      })
      return Promise.resolve(response.data)
    } catch (error) {
      return Promise.reject(handleError(error))
    }
  }

  public static async isSignedIn(session) {
    if (!session) {
      return false
    }
    try {
      await VolkanoRequest.get('/auth/validate_token', {
        uid: session.uid,
        token: session.token,
        client: session.client,
      })
      return true
    } catch (error) {
      clearSession()
      return false
    }
  }

  public static async signOut() {
    try {
      await VolkanoRequest.delete('/auth/sign_out')
    } catch (error) {
      return Promise.reject(handleError(error))
    } finally {
      clearSession()
    }
  }

  public static async updateUser(params) {
    try {
      return await VolkanoRequest.put('/auth', params)
    } catch (error) {
      return Promise.reject(handleError(error))
    }
  }

  public static async updatePassword(
    current_password: string,
    password: string,
    password_confirmation: string
  ) {
    try {
      await VolkanoRequest.put('/auth/password', {
        current_password,
        password,
        password_confirmation,
      })
    } catch (error) {
      return Promise.reject(handleError(error))
    }
  }
}

const handleError = (error: IVolkanoHTTPError) => {
  if (error.message === 'Network Error') {
    return [ErrorState.NETWORK_ERROR]
  }

  const { status, data } = error
  switch (status) {
    case 401:
    case 422:
      return data
    case 500:
      return [ErrorState.SERVER_ERROR]
    default:
      return [ErrorState.UNKNOWN_ERROR]
  }
}
