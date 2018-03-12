import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ISession, setSession, getSession } from '../utils/Session'
import { convertUserJson } from '../models/User';

export interface VolkanoHTTPError {
  status: number
  message: string
  data?: any
}

export interface VolkanoHTTPResponse {
  data: any
}

export default class VolkanoRequest {
  public static async get(path: string, options = {}) {
    Object.assign(options, { method: 'get' })
    return await this.request(path, options)
  }

  public static async post(path: string, options: any) {
    Object.assign(options, { method: 'post' })
    return await this.request(path, options)
  }

  public static async delete(path: string, options = {}) {
    Object.assign(options, { method: 'delete' })
    return await this.request(path, options)
  }

  private static async request(
    path: string,
    options: AxiosRequestConfig
  ): Promise<VolkanoHTTPResponse> {
    const session = getSession()
    const url = `http://localhost:5000${path}.json`
    Object.assign(options, { url, headers: session })
    try {
      const result: AxiosResponse = await axios(options)
      const headers = result.headers
      if (headers.token) {
        let user
        if (result.data.data) {
          user = convertUserJson(result.data.data)
        }

        const newSession: ISession = {
          uid: headers.uid,
          client: headers.client,
          token: headers.token,
          user
        }

        setSession(newSession)
      }

      return Promise.resolve({ data: result.data })
    } catch (error) {
      return Promise.reject({ status: error.status, message: error.message })
    }
  }
}
