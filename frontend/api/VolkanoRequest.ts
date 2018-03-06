import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ISession, setSession, getSession } from '../utils/Session'

export interface VolkanoHTTPError {
  status: number
  message: string
  data?: any
}

export interface VolkanoHTTPResponse {
  data: any
}

export default class VolkanoRequest {
  public static async get(url: string, options = {}) {
    const session = getSession()
    Object.assign(options, { method: 'get', url, headers: session })
    return await this.request(options)
  }

  public static async post(url: string, options = {}) {
    const session = getSession()
    Object.assign(options, { method: 'post', url, headers: session })
    return await this.request(options)
  }

  private static async request(options: AxiosRequestConfig): Promise<VolkanoHTTPResponse> {
    try {
      const result: AxiosResponse = await axios(options)
      const headers = result.headers

      if (headers.token) {
        const newSession: ISession = {
          uid: headers.uid,
          client: headers.client,
          token: headers.token,
        }
        setSession(newSession)
      }

      return Promise.resolve({ data: result.data })
    } catch (error) {
      return Promise.reject({ status: error.status, message: error.message })
    }
  }
}
