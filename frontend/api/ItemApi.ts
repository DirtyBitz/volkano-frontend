import { Item } from '../models/Item'

export interface ICollectionData {
  items: Item[]
}

export class ItemApi {
  public static getAllItems() {
    const fakeData: ICollectionData = {
      items: [
        {
          id: 0,
          title: 'Cute Kitty',
          url: 'https://i.imgur.com/gbwgfw6.jpg',
          uid: 2,
        },
        {
          id: 1,
          title: 'Cold Kitty',
          url: 'https://i.imgur.com/t6RdGpq.jpg',
          uid: 2,
        },
        {
          id: 2,
          title: 'Scary Kitty',
          url: 'https://i.imgur.com/7hN0mZ9.jpg',
          uid: 2,
        },
        {
          id: 3,
          title: 'Evil Kitty',
          url: 'https://i.imgur.com/uKHlfC7.jpg',
          uid: 2,
        },
      ],
    }
    return fakeData
  }
}
