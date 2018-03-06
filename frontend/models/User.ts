export interface IUserJson {
  id: number
  provider: string | null
  uid: string
  name: string | null
  nickname: string | null
  image: string | null
  email: string
}

export interface User {
  id: number
  name?: string
  nickname?: string
  image?: string
  email: string
}

export const convertUserJson = (userJson: IUserJson): User => ({
  id: userJson.id,
  email: userJson.email,
  name: userJson.name,
  nickname: userJson.nickname,
})
