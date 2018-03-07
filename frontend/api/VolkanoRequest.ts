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
  public static async get(path: string, options = {}) {
    Object.assign(options, { method: 'get' })
    return await this.request(path, options)
  }

  public static async post(path: string, options: any) {
    Object.assign(options, { method: 'post' })
    return await this.request(path, options)
  }

  private static async request(
    path: string,
    options: AxiosRequestConfig
  ): Promise<VolkanoHTTPResponse> {
    const session = getSession()
    const url = `http://localhost:5000${path}`
    Object.assign(options, { url, headers: session })
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
