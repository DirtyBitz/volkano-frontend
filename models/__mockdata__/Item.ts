import { Item } from '../Item'

export function getMockItems(num: number) {
  const items: Item[] = []

  for (let i = 0; i < num; i++) {
    items.push({
      id: randomInt(),
      title: 'Cute Kitty',
      url: 'https://i.imgur.com/gbwgfw6.jpg',
      uid: randomInt(),
      tags: ['animal', 'kitty'],
      categories: ['image/jpeg', 'jpg'],
      mediatype: 'image',
      size: 1337,
    })
  }
  return items
}

function randomInt() {
  return Math.floor(Math.random() * Math.floor(1000000000))
}
