import { hashTagToColor } from '../TagColors'

describe('TagColor utils', () => {
  describe('hashTagToColor', () => {
    it('returns default color if no argument is provided', () => {
      const color = hashTagToColor('')

      expect(color).toEqual('red')
    })

    it('returns the same color for the same value', () => {
      const tag = 'hash me, baby'

      const first = hashTagToColor(tag)
      const second = hashTagToColor(tag)

      expect(first).toEqual(second)
    })
  })
})
