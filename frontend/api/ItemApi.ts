import { Item } from '../models/Item'
import VolkanoRequest, { IVolkanoHTTPError } from './VolkanoRequest'
export interface ICollectionData {
  items: Item[]
}

export class ItemApi {
  public static async getItems(page: number = 1) {
    try {
      const path = page ? `/items?page=${page}` : '/items'
      const rawItems = await VolkanoRequest.get(path)
      const collection: ICollectionData = {
        items: rawItems.map(item => {
          const tags = item.tags.map(tag => tag.name)
          const categories = item.categories.map(category => category.name)
          return { ...item, tags, categories }
        }),
      }
      return collection
    } catch (error) {
      return Promise.reject(handleError(error))
    }
  }

  public static async createItem(title: string, url: string, tags: string) {
    const params = { item: { title, url, tag_list: tags } }

    try {
      const item = (await VolkanoRequest.post('/items', params)) as Item
      return item
    } catch (error) {
      return Promise.reject(handleError(error))
    }
  }

  public static async deleteItem(id: number) {
    try {
      await VolkanoRequest.delete(`/items/${id}`)
    } catch (error) {
      return Promise.reject(handleError(error))
    }
  }
}

const handleError = (error: IVolkanoHTTPError) => {
  if (error.message === 'Network Error') {
    return { errors: 'Network error' }
  }
  switch (error.status) {
    case 404:
      return { errors: 'No such item' }
    case 422:
      return { errors: error.data }
    case 500:
      return { errors: 'Internal server error' }
    default:
      return { errors: 'Unknown server error' }
  }
}
