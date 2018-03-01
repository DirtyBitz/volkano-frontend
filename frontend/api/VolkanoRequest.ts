import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import {
  requestSuccess,
  requestServerError,
  requestUnauthorized,
  requestUnprocessable,
  requestUnknownError,
} from '../actions/request/RequestActions'
import { store } from '../store/index'

export class VolkanoRequest {
  constructor(private store) {}
  public async get(url: string, options = {}) {
    const headers = this.getAuth()
    Object.assign(options, { method: 'get', url, headers })
    return await this.request(options)
  }

  private async request(options: AxiosRequestConfig) {
    try {
      const result: AxiosResponse = await axios(options)
      this.store.dispatch(requestSuccess(result.headers.token))
      return result.data
    } catch (error) {
      this.handleError(error)
      return error
    }
  }

  private handleError(error) {
    switch (error.response.status) {
      case 500:
        return this.store.dispatch(requestServerError())
      case 422:
        return this.store.dispatch(requestUnprocessable(error.response.headers.token))
      case 401:
        return this.store.dispatch(requestUnauthorized())
      default:
        return this.store.dispatch(requestUnknownError())
    }
  }

  private getAuth = () => {
    const state = this.store.getState()
    const { uid, client, token } = state.authentication
    return {
      uid,
      client,
      token,
    }
  }
}
