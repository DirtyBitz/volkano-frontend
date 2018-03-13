import * as React from 'react'
import { Item } from '../models/Item'
import { hashTagToColor } from '../utils/TagColors'
import YouTube from 'react-youtube'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {
  faTimesCircle,
  faArrowCircleRight,
  faArrowCircleLeft,
} from '@fortawesome/fontawesome-free-solid'

interface IProps {
  item: Item
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

export class ItemModal extends React.Component<IProps> {
  private renderFileType() {
    const { url } = this.props.item
    if (url.includes('youtube')) return this.renderYouTube()
    else return this.renderImage()
  }

  private renderYouTube() {
    // Probably maybe fucked <3 Must add youtube seed.
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
          }
        `}</style>
      </div>
    )
  }

  private renderImage() {
    const { url } = this.props.item
    return (
      <div>
        <img src={url} />
        <style jsx>{`
          img {
            border-radius: 4px;
            max-height: 75vh;
          }
        `}</style>
      </div>
    )
  }

  render() {
    const { item } = this.props
    const { title } = this.props.item
    return (
      <div>
        <div className="prevArrow">
          <FontAwesomeIcon
            className="modalPrev"
            icon={faArrowCircleLeft}
            onClick={this.props.onPrev}
            color="white"
            size="4x"
          />
        </div>
        <div className="nextArrow">
          <FontAwesomeIcon
            className="modalNext"
            icon={faArrowCircleRight}
            onClick={this.props.onNext}
            color="white"
            size="4x"
          />
        </div>
        <figure>
          <figcaption>
            {title}
            <FontAwesomeIcon
              className="modalClose"
              icon={faTimesCircle}
              onClick={this.props.onClose}
              size="2x"
            />
          </figcaption>
          <div className="item-source">{this.renderFileType()}</div>
          <div className="tags">
            {item.tags.map((tag: string) => (
              <span
                style={{ background: `${hashTagToColor(tag)}` }}
                className="modalTag"
                key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </figure>
        <style jsx>{`
          figure {
            user-select: none;
            min-width: 400px;
          }
          .prevArrow {
            position: absolute;
            left: 0;
            bottom: 50%;
            cursor: pointer;
            user-select: none;
          }
          .nextArrow {
            position: absolute;
            right: 0;
            bottom: 50%;
            cursor: pointer;
            user-select: none;
          }
          .modalClose {
            cursor: pointer;
            user-select: none;
          }
          figcaption {
            padding: 15px 20px;
            display: flex;
            justify-content: space-between;
            font-size: 1.3em;
            font-weight: bold;
            align-items: center;
          }
          .item-source {
            display: flex;
            margin-left: 5px;
            margin-right: 5px;
            justify-content: center;
          }
          .tags {
            padding: 15px 20px;
            span {
              padding: 5px;
              border-radius: 3px;
              margin-right: 10px;
            }
          }
        `}</style>
      </div>
    )
  }
}
