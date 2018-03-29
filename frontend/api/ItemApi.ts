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
      console.error('Error fetching collection', error)
    }
  }

  public static async createItem(title: string, url: string, tags: string) {
    const params = { data: { item: { title, url, tag_list: tags } } }

    try {
      const response = await VolkanoRequest.post('/items', params)
      return response.data
    } catch (error) {
      console.error('Error creating item', error)
    }
  }

  public static async deleteItem(id: number) {
    try {
      await VolkanoRequest.delete(`/items/${id}`)
    } catch (error) {
      console.error('Error deleting item', error)
    }
  }
}
