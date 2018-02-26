import { Item } from '../models/Item'
import { fakeData } from './__mocks__/ItemApi'

export interface ICollectionData {
  items: Item[]
}

export class ItemApi {
  public static async getAllItems(token: string) {
    return fakeData
  }
}
