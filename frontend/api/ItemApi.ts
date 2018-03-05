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

  public static async createItem(
    token: string,
    client: string,
    uid: string,
    title: string,
    url: string,
    tags: string
  ) {
    const config = { headers: { client, token, uid } }
    const params = { item: { title, url, tags } }

    const response = await axios.post('http://localhost:5000/items', params, config)

    return response.data
  }
}
