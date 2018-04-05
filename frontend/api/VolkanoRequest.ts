import axios from 'axios'
import { ISession, setSession, getSession, clearSession } from '../utils/Session'
import { convertUserJson, isValidUserJson } from '../models/User'
import getConfig from 'next/config'

export interface IVolkanoHTTPError {
  status: number
  message: string
  data?: any
}

export default class VolkanoRequest {
  public static async get(path: string, data = {}) {
    return await this.request(path, 'get', data)
  }

  public static async post(path: string, data: any) {
    return await this.request(path, 'post', data)
  }

  public static async delete(path: string, data = {}) {
    return await this.request(path, 'delete', data)
  }

  public static async put(path: string, data: any) {
    return await this.request(path, 'put', data)
  }

  private static async request(path: string, method: string, data): Promise<any> {
    const session = getSession()
    const config = getConfig()
    /* istanbul ignore next */
    const host =
      (config && config.publicRuntimeConfig && config.publicRuntimeConfig.BACKEND_URL) ||
      'this value only used in tests'
    const url = `${host + path}.json`
    const options = { url, method, data, headers: session }
    let response
    try {
      response = await axios(options)
    } catch (error) {
      return this.handleError(session, error)
    }

    if (session || path.match('/auth/sign_in')) {
      setSession(this.newSession(session, response))
    }
    return Promise.resolve(response.data)
  }

  /*
    401: clear session, raise regular error
    422: update session, raise regular error
    500: do nothing about session, raise regular error
  */
  private static async handleError(oldSession, error) {
    switch (error.response.status) {
      case 401:
        clearSession()
        break
      case 422:
        if (oldSession) setSession(this.newSession(oldSession, error.response))
        break
      case 500:
      default:
        break
    }

    return Promise.reject({
      status: error.response.status,
      data: error.response.data,
      message: error.message,
    })
  }

  private static newSession(oldSession, response) {
    if (!response.headers.token) return oldSession
    let headers = response.headers
    let user
    if (isValidUserJson(response.data.data)) {
      user = convertUserJson(response.data.data)
    } else {
      user = oldSession.user
    }

    const newSession: ISession = {
      uid: headers.uid,
      client: headers.client,
      token: headers.token,
      user,
    }

    return newSession
  }
}
