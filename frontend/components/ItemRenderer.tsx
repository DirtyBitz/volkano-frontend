import React from 'react'
import { Item } from '../models/Item'
import YouTube from 'react-youtube'

interface IProps {
  item: Item
  modalView?: boolean
}

export default class ItemRenderer extends React.Component<IProps> {
  render() {
    const { mediatype } = this.props.item
    switch (mediatype) {
      case 'image':
        return this.renderImage()
      case 'video':
        return this.renderVideo()
      case 'audio':
        return this.renderAudio()
      case 'youtube':
        return this.renderYouTube()
      default:
        return this.renderInvalid()
    }
  }

  private renderYouTube = () => {
    const { url } = this.props.item
    if (!window['YTConfig']) {
      //@ts-ignore
      var YTConfig = { host: 'http://www.youtube.com' }
    }

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
    const { modalView } = this.props
    const { url } = this.props.item
    return (
      <img
        style={{
          objectFit: 'scale-down',
          maxWidth: '100%',
          maxHeight: modalView ? '70vh' : '100%',
          margin: '0 auto',
        }}
        src={url}
      />
    )
  }

  private renderVideo() {
    const { modalView } = this.props
    const { url } = this.props.item
    return (
      <video
        style={{
          objectFit: 'scale-down',
          maxWidth: '100%',
          maxHeight: modalView ? '70vh' : '100%',
        }}
        src={url}
        autoPlay
        muted
        controls
        loop
        width="100%"
      />
    )
  }

  private renderAudio() {
    const { url } = this.props.item
    return <audio src={url} controls />
  }

  private renderInvalid() {
    return (
      <img
        id="invalid"
        src="/frontend/static/favicon/android-chrome-192x192.png"
        width="100%"
      />
    )
  }
}
