export interface IUserJson {
  id: number
  provider: string
  uid: string
  name: string | null
  nickname: string | null
  image: string | null
  email: string
  created_at: string
  updated_at: string
}

export class User {
  id: number
  name?: string
  nickname?: string
  image?: string
  email: string
  register_date: Date
  constructor(userJson: IUserJson) {
    // Do convertion from IUserJson to the correct types in this class
  }
}
