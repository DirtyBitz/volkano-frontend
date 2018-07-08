/* istanbul ignore next */
export function bytesToSize(bytes: number) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes == 0) return '0 Byte'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString())
  return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i]
}
