import { Item } from '../models/Item'
import axios from 'axios'

export interface ICollectionData {
  items: Item[]
}

export class ItemApi {
  public static async getAllItems(token: string, client: string, uid: string) {
    const params = {
      headers: { client, token, uid },
    }

    const response = await axios.get('http://localhost:5000/items', params)

    const items = {
      items: response.data,
    }

    return items
  }
}
