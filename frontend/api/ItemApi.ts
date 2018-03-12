import { Item } from '../models/Item'
import VolkanoRequest from './VolkanoRequest'

export interface ICollectionData {
  items: Item[]
}

export class ItemApi {
  public static async getAllItems() {
    try {
      const response = await VolkanoRequest.get('/items')
      const items = {
        items: response.data.map(item => {
          const tags = item.tags.map(tag => tag.name)
          return { ...item, tags }
        }),
      }
      return items
    } catch (error) {
      // #TODO: Add error reducer that handles errors for us <3
      console.error('ItemApiError', error)
    }
  }

  public static async createItem(title: string, url: string, tags: string) {
    const params = { data: { item: { title, url, tag_list: tags } } }

    const response = await VolkanoRequest.post('/items', params)

    return response.data
  }

  public static async deleteItem(id: number) {
    await VolkanoRequest.delete(`/items/${id}`)
  }
}
