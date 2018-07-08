export interface Item {
  id: number
  title: string
  url: string
  uid: number
  tags: string[]
  categories: string[]
  mediatype: string
  size: number
}

export interface IItemJson {
  id: number
  title: string
  url: string
  categories: { name: string; taggings_count: number }[]
  created_at: string
  mediatype: string
  size: number
  tags: { name: string; taggings_count: number }[]
  updated_at: string
}
