import { ICollectionData } from '../ItemApi'

export const fakeData: ICollectionData = {
  items: [
    {
      id: 0,
      title: 'Cute Kitty',
      url: 'https://i.imgur.com/gbwgfw6.jpg',
      uid: 2,
      tags: ['animal', 'kitty'],
      categories: ['image/jpeg', 'jpg'],
    },
    {
      id: 1,
      title: 'Cold Kitty',
      url: 'https://i.imgur.com/t6RdGpq.jpg',
      uid: 2,
      tags: ['animal'],
      categories: ['image/jpeg', 'jpg'],
    },
    {
      id: 2,
      title: 'Scary Kitty',
      url: 'https://i.imgur.com/7hN0mZ9.jpg',
      uid: 2,
      tags: ['animal'],
      categories: ['image/jpeg', 'jpg'],
    },
    {
      id: 3,
      title: 'Evil Kitty',
      url: 'https://i.imgur.com/uKHlfC7.jpg',
      uid: 2,
      tags: ['animal'],
      categories: ['image/jpeg', 'jpg'],
    },
    {
      id: 4,
      title: 'Happy Boy',
      url: 'https://media.giphy.com/media/2FhASosZtLUPe/giphy.gif',
      uid: 2,
      tags: ['animal'],
      categories: ['image/gif', 'gif'],
    },
    {
      id: 5,
      title: 'Sleepy Boy',
      url: 'https://media.giphy.com/media/mPFYBLLOiqj5K/giphy.gif',
      uid: 2,
      tags: ['animal'],
      categories: ['image/gif', 'gif'],
    },
    {
      id: 6,
      title: 'Scared Boy',
      url: 'https://media.giphy.com/media/3o8doVAxrMjXbIHaU0/giphy.gif',
      uid: 2,
      tags: ['animal'],
      categories: ['image/gif', 'gif'],
    },
    {
      id: 7,
      title: 'Twerky Boy',
      url: 'https://media.giphy.com/media/gZLl9szOpgbpS/giphy.gif',
      uid: 2,
      tags: ['animal'],
      categories: ['image/gif', 'gif'],
    },
    {
      id: 8,
      title: 'Pizza Boy',
      url: 'https://media.giphy.com/media/kEguBgsDrGRYA/giphy.gif',
      uid: 2,
      tags: ['animal'],
      categories: ['image/gif', 'gif'],
    },
    {
      id: 9,
      title: 'Future Meme',
      url: 'https://i.imgur.com/N4kdkxE.jpg',
      uid: 2,
      tags: ['animal'],
      categories: ['image/jpeg', 'jpg'],
    },
    {
      id: 10,
      title: 'Froggy',
      url: 'https://i.imgur.com/mYRXVy3.jpg',
      uid: 2,
      tags: ['animal'],
      categories: ['image/jpeg', 'jpg'],
    },
    {
      id: 11,
      title: 'Crazy Frog',
      url: 'https://i.imgur.com/f7CihY0.jpg',
      uid: 2,
      tags: ['animal'],
      categories: ['image/jpeg', 'jpg'],
    },
    {
      id: 12,
      title: 'Chillin Frog',
      url: 'https://i.imgur.com/EXA4lN9.jpg',
      uid: 2,
      tags: ['animal'],
      categories: ['image/jpeg', 'jpg'],
    },
    {
      id: 13,
      title: 'Sweet svg stuffy stuff',
      url: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Vector-based_example.svg',
      uid: 3,
      tags: ['graphy'],
      categories: ['image/svg+xml', 'svg'],
    },
  ],
}

export class ItemApi {
  public static async getAllItems(token: string) {
    if (token === 'throw') {
      throw ['Did throw']
    }

    return fakeData
  }
}