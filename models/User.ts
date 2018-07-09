export interface IUserJson {
  email: string
  nickname: string | null
}

export interface IUser {
  email: string
  nickname: string | null
}

export const convertUserJson = (userJson: IUserJson): IUser => userJson

export const isValidUserJson = (userJson: IUserJson): boolean =>
  userJson &&
  userJson.hasOwnProperty('email') &&
  userJson.hasOwnProperty('nickname') &&
  true
