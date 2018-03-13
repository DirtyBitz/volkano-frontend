import * as React from 'react'
import { Item } from '../models/Item'
import YouTube from 'react-youtube'
import { hashTagToColor } from '../utils/TagColors'
import Modal from 'react-modal'

interface IProps {
  item: Item
  onSelect: (item: Item) => void
}
export default class ItemCard extends React.Component<IProps> {
  componentWillMount() {
    Modal.setAppElement('body')
  }
  onClick = () => {
    this.props.onSelect(this.props.item)
  }
  render() {
    const { item } = this.props

    return (
      <div className="item-wrap">
        <div className="item" onClick={this.onClick}>
          {this.renderItem()}
          <div className="taglist">
            {item.tags.map((tag: string) => (
              <span
                style={{ background: `${hashTagToColor(tag)}` }}
                className="tag"
                key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <style jsx>{`
          .taglist {
            white-space: nowrap;
            overflow-x: auto;
          }

          .taglist::-webkit-scrollbar {
            width: 0 !important;
            height: 0 !important;
          }

          .tag {
            margin-right: 3px;
            color: black;
            padding: 0px 5px;
            font-size: 0.85em;
            border-radius: 15px;
            border: 1px solid #bababa;
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
            cursor: pointer;
            transition: transform 1s ease, opacity 1s ease;
          }

          .item:hover {
            opacity: 0.9;
            transform: scale(1.05);
          }

          span {
            padding-left: 5px;
            padding-right: 5px;
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
