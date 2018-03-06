import { IUser } from "../../models/User";

export const mockUser: IUser = { email: 'test@example.com', id: 0 }

export default class VolkanoRequest {
  public static async get(url: string, options = {}) {
  }

  public static async post(url: string, options = {}) {
    return Promise.resolve(mockUser)
  }
}
