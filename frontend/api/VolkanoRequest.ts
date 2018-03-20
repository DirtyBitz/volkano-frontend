import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ISession, setSession, getSession } from '../utils/Session'
import { convertUserJson } from '../models/User'
import getConfig from 'next/config'

export interface VolkanoHTTPError {
  status: number
  message: string
  data?: any
}

export interface VolkanoHTTPResponse {
  data: any
}

export default class VolkanoRequest {
  public static async get(path: string, params = {}) {
    return await this.request(path, 'get', params)
  }

  public static async post(path: string, params = {}) {
    return await this.request(path, 'post', params)
  }

  public static async delete(path: string, params = {}) {
    return await this.request(path, 'delete', params)
  }

  public static async put(path: string, params = {}) {
    return await this.request(path, 'put', params)
  }

  private static async request(
    path: string,
    method: string,
    params
  ): Promise<VolkanoHTTPResponse> {
    const session = getSession()
    const config = getConfig()
    const host =
      (config && config.publicRuntimeConfig && config.publicRuntimeConfig.BACKEND_URL) ||
      'this value only used in tests'
    const url = `${host + path}.json`
    const options = { url, method, params, headers: session }
    try {
      const result: AxiosResponse = await axios(options)
      const headers = result.headers

      if (headers.token) {
        let user
        if (path.match('/auth') && result.data.data) {
          user = convertUserJson(result.data.data)
        } else {
          user = session.user
        }
        const newSession: ISession = {
          uid: headers.uid,
          client: headers.client,
          token: headers.token,
          user,
        }

        setSession(newSession)
      }

      return Promise.resolve({ data: result.data })
    } catch (error) {
      return Promise.reject({
        status: error.response.status,
        message: error.message,
      })
    }
  }
}
