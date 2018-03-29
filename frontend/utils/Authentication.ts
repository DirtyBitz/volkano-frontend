import getConfig from 'next/config'
import VolkanoRequest, {
  VolkanoHTTPError,
  VolkanoHTTPResponse,
} from '../api/VolkanoRequest'
import { convertUserJson, IUser } from '../models/User'
import { clearSession } from '../utils/Session'

export enum ErrorState {
  SERVER_ERROR = 'Server is down',
  NETWORK_ERROR = 'Network error',
  UNKNOWN_ERROR = 'Unknown error',
}

export interface IUserRegisterDetails {
  email: string
  password: string
  nickname?: string
}

const handleError = (error: VolkanoHTTPError): string[] => {
  if (error.message === 'Network Error') {
    return [ErrorState.NETWORK_ERROR]
  }

  const { status, data } = error
  let errors = []
  if (Array.isArray(data.errors)) {
    errors = data.errors
  } else {
    errors = data.errors.full_messages
  }

  switch (status) {
    case 401:
    case 422:
      return errors
    case 500:
      return [ErrorState.SERVER_ERROR]
    default:
      return [ErrorState.UNKNOWN_ERROR]
  }
}

export const registerNewUser = async (
  userFormFields: IUserRegisterDetails
): Promise<void | string[]> => {
  const config = getConfig()
  const host =
    (config && config.publicRuntimeConfig && config.publicRuntimeConfig.FRONTEND_URL) ||
    'this value only used in tests'
  const userParams = {
    ...userFormFields,
    confirm_success_url: `${host}/emailconfirmation`,
  }

  try {
    await VolkanoRequest.post('/auth', userParams)
  } catch (error) {
    return Promise.reject(handleError(error))
  }
}

export const signIn = async (
  login: string,
  password: string
): Promise<IUser | string[]> => {
  try {
    const response: VolkanoHTTPResponse = await VolkanoRequest.post('/auth/sign_in', {
      login,
      password,
    })

    const user: IUser = convertUserJson(response.data)

    return Promise.resolve(user)
  } catch (error) {
    return Promise.reject(handleError(error))
  }
}

export const signOut = async () => {
  try {
    await VolkanoRequest.delete('/auth/sign_out')
  } catch (error) {
    return Promise.reject(handleError(error))
  } finally {
    clearSession()
  }
}
