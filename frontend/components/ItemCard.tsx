import * as React from 'react'
import { Item } from '../models/Item'
import YouTube from 'react-youtube'

interface Props {
  item: Item
}

export default class ItemCard extends React.Component<Props> {
  render() {
    const { item } = this.props
    return (
      <div className="item-wrap">
        <div className="item">
          {this.renderItem()}
          {item.tags.map((tag: string) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <style jsx>{`
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
