import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ISession, setSession, getSession } from '../utils/Session'

export class VolkanoRequest {
  public static async get(url: string, options = {}) {
    const session = getSession()
    Object.assign(options, { method: 'get', url, headers: session })
    return await this.request(options)
  }

  private static async request(options: AxiosRequestConfig) {
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

      return result
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
