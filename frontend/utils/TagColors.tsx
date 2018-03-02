export const tagColors = [
  'orange',
  'red',
  'aqua',
  'teal',
  'purple',
  'gray',
  'olive',
  'green',
  'lime',
  'yellow',
  'salmon',
  'rebeccapurple',
  'lightcoral',
  'deeppink',
  'burlywood',
  'cornflowerblue',
  'darkcyan',
  'greenyellow',
  'orchid',
  'violet',
  'tan',
  'slategray',
  'sienna',
  'royalblue',
]

export function hashTag(tag: string) {
  /* Simple hash function. */
  var a = 1,
    c = 0,
    h,
    o
  if (tag) {
    a = 0
    /*jshint plusplus:false bitwise:false*/
    for (h = tag.length - 1; h >= 0; h--) {
      o = tag.charCodeAt(h)
      a = ((a << 6) & 268435455) + o + (o << 14)
      c = a & 266338304
      a = c !== 0 ? a ^ (c >> 21) : a
    }
  }
  return a
}
