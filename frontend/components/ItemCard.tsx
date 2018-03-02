import * as React from 'react'
import { Item } from '../models/Item'
import YouTube from 'react-youtube'

interface Props {
  item: Item
}
const allColors = [
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

export default class ItemCard extends React.Component<Props> {
  private hashTag = (tag: string): number => {
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
  render() {
    const { item } = this.props

    return (
      <div className="item-wrap">
        <div className="item">
          {this.renderItem()}
          {item.tags.map((tag: string) => (
            <span
              style={{ background: `${allColors[this.hashTag(tag) % allColors.length]}` }}
              className="tag"
              key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <style jsx>{`
          .tag {
            margin-right: 3px;
            background: red;
            color: black;
            padding: 0px 5px;
            font-size: 0.85em;
            border-radius: 15px;
            border: 1px solid #bababa;
            font-family: tahoma, sans-serif;
            position: relative;
          }
          .item-wrap {
            padding-bottom: 15px;
            padding-right: 15px;
            width: 20%;
          }

          .item {
            text-align: center;
            border-radius: 5px;
            overflow: hidden;
          }
        `}</style>
      </div>
    )
  }

  private renderItem = () => {
    const { title } = this.props.item
    return (
      <figure>
        <div className="image-container">{this.renderFileType()}</div>
        <figcaption>{title}</figcaption>
        <style jsx>{`
          .image-container {
            height: 175px;
            display: flex;
            align-items: center;
            overflow: hidden;
          }

          figcaption {
            background: #ce1a1a;
            color: #fff;
            padding: 5px 10px;
          }
        `}</style>
      </figure>
    )
  }

  private renderFileType = () => {
    const { url } = this.props.item
    if (url.includes('youtube')) return this.renderYouTube()
    else return this.renderImage()
  }

  private renderYouTube = () => {
    const { url } = this.props.item

    const videoId = url.split('v=')[1]
    const opts = {
      width: '100%',
      playerVars: {
        autoplay: 0,
      },
    }

    return (
      <div>
        <YouTube videoId={videoId} opts={opts} />
        <style jsx>{`
          div {
            width: 100%;
          }
          .tag {
            background-color: gray;
          }
        `}</style>
      </div>
    )
  }

  private renderImage() {
    const { url } = this.props.item
    return <img src={url} width="100%" />
  }
}
