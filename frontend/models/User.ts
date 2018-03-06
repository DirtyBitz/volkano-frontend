export interface IUserJson {
  id: number
  uid: string
  email: string
  provider: string | null
  name: string | null
  nickname: string | null
  image: string | null
}

export interface IUser {
  id: number
  email: string
  name?: string
  nickname?: string
  image?: string
}

export const convertUserJson = (userJson: IUserJson): IUser => ({
  id: userJson.id,
  email: userJson.email,
  name: userJson.name,
  nickname: userJson.nickname,
})
