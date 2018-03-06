import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { ItemModal } from '../ItemModal'

describe('ItemModal component', () => {
  let itemModal
  let item
  let callback
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
    itemModal = shallow(<ItemModal item={item} onClose={callback} />)
  })
  it('should show tags for itemModal', () => {
    const tags = itemModal.find('.modalTag')
    expect(tags.length).toBe(2)
  })

  it('should show title', () => {
    const title = item.title
    expect(itemModal.contains(title)).toBe(true)
  })

  it('should show image if modal includes image', () => {
    const imgtag = itemModal.find('img').prop('src')
    expect(imgtag).toBe(item.url)
  })
  it('should show video if modal includes video', () => {
    item.url = 'https://www.youtube.com/watch?v=qbA42wQoWAs'
    itemModal = shallow(<ItemModal item={item} onClose={callback} />)

    const youtubeVideo = itemModal.find('YouTube').first()
    expect(youtubeVideo.props().videoId).toBe(item.url.split('v=')[1])
  })

  it('should call onClose function when "close icon" clicked', () => {
    const clickableButton = itemModal.find('.modalClose').first()
    clickableButton.simulate('click')
    expect(callback).toHaveBeenCalledTimes(1)
  })
})
