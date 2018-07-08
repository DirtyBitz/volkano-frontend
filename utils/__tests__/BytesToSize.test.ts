import { bytesToSize } from '../BytesToSize'

describe('TagColor utils', () => {
  describe('hashTagToColor', () => {
    it('returns 0 Bytes when given 0 bytes', () => {
      const size = bytesToSize(0)

      expect(size).toEqual('0 Byte')
    })

    it('returns 1 Bytes when given 420 bytes', () => {
      const size = bytesToSize(420)

      expect(size).toEqual('420.00 Bytes')
    })

    it('returns 1MB when given 1024 bytes', () => {
      const size = bytesToSize(1024)

      expect(size).toEqual('1.00 KB')
    })

    it('returns 1MB when given 1048576 bytes', () => {
      const size = bytesToSize(1048576)

      expect(size).toEqual('1.00 MB')
    })

    it('returns 1GB when given 1073741824 bytes', () => {
      const size = bytesToSize(1073741824)

      expect(size).toEqual('1.00 GB')
    })
  })
})
