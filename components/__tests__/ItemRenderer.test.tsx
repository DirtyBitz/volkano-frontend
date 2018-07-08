import React from 'react'
import { shallow } from 'enzyme'
import { Item } from '../../models/Item'
import ItemRenderer from '../ItemRenderer'

describe('ItemRenderer component', () => {
  let defaultItem: Item
  let itemRenderer
  beforeEach(() => {
    defaultItem = {
      id: 1,
      title: 'one examply boy',
      url: 'http://example.com/example.png',
      uid: 2,
      tags: ['example', 'boy'],
      categories: ['png', 'image/png'],
      mediatype: 'image',
      size: 1337,
    }
  })

  it('should render image tag for images', () => {
    itemRenderer = shallow(<ItemRenderer item={defaultItem} />)

    const image = itemRenderer.find('img')

    expect(image.length).toBe(1)
  })

  it('should render video tag for videos', () => {
    const item: Item = {
      ...defaultItem,
      categories: ['mp4', 'video/mp4'],
      mediatype: 'video',
    }

    itemRenderer = shallow(<ItemRenderer item={item} />)

    const video = itemRenderer.find('video')
    expect(video.length).toBe(1)
  })

  it('should render audio tag for sound-files', () => {
    const item: Item = {
      ...defaultItem,
      categories: ['ogg', 'audio/ogg'],
      mediatype: 'audio',
    }

    itemRenderer = shallow(<ItemRenderer item={item} />)

    const audio = itemRenderer.find('audio')
    expect(audio.length).toBe(1)
  })

  it('should render youtube-components for youtube-videos', () => {
    const item: Item = {
      ...defaultItem,
      categories: ['youtube.com', 'youtube'],
      mediatype: 'youtube',
    }

    itemRenderer = shallow(<ItemRenderer item={item} />)

    const youtube = itemRenderer.find('YouTube')
    expect(youtube.length).toBe(1)
  })

  it('should render an image tag when given an "invalid" item', () => {
    const badItem: Item = {
      ...defaultItem,
      categories: ['bad.com', 'incrediblyBad'],
      mediatype: 'invalid',
    }

    itemRenderer = shallow(<ItemRenderer item={badItem} />)

    const invalidThing = itemRenderer.find('img')
    expect(invalidThing.length).toBe(1)
    expect(invalidThing.prop('id')).toBe('invalid')
  })
})
