import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import ItemCard from '../ItemCard'
import { Item } from '../../models/Item'

describe('ItemCard component', () => {
  let itemCard
  let callback
  let item

  beforeEach(() => {
    item = {
      id: 1,
      title: 'one examply boy',
      url: 'http://example.com/example.png',
      uid: 2,
      tags: ['example', 'boy'],
      categories: ['png', 'image/png'],
    }
    callback = jest.fn()
    itemCard = shallow(<ItemCard item={item} onSelect={callback} />)
  })

  it('should show tags for item', () => {
    const tags = itemCard.find('.tag')
    expect(tags.length).toBe(2)
  })

  it('should show title', () => {
    const title = item.title
    expect(itemCard.contains(title)).toBe(true)
  })

  it('should show image if imageItem', () => {
    const imgtag = itemCard.find('img').prop('src')
    expect(imgtag).toBe(item.url)
  })
  it('should show video if videoItem', () => {
    item.url = 'https://www.youtube.com/watch?v=qbA42wQoWAs'
    itemCard = shallow(<ItemCard item={item} onSelect={callback} />)

    const youtubeVideo = itemCard.find('YouTube').first()
    expect(youtubeVideo.props().videoId).toBe(item.url.split('v=')[1])
  })

  it('should call onselect function when clicked', () => {
    const clickableDiv = itemCard.find('.item').first()
    clickableDiv.simulate('click')
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should contain a conditional image based on image type ')
})
