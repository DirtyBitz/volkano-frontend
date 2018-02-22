export interface IItemJson {
  id: number
  title: string
  url: string
  uid: number
}

export interface Item {
  id: number
  title: string
  url: string
  uid: number
}

export const convertItemJson = (userJson: IItemJson): Item => ({
  id: userJson.id,
  title: userJson.title,
  url: userJson.url,
  uid: userJson.uid,
})
