import * as React from 'react'
import { Colors } from '../constants/Colors'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/fontawesome-free-solid'
import { INotification, NotificationSeverity } from '../models/Notification'

interface IState {
  duration?: number
  isClosing: boolean
}

interface IProps {
  onRemoveClick: (id: string) => void
  notification: INotification
}

const FADE_OUT_TIME = 300

export class Toast extends React.Component<IProps, IState> {
  closeTimer: NodeJS.Timer

  constructor(props: IProps) {
    super(props)
    this.state = {
      duration: props.notification.duration,
      isClosing: false,
    }
  }

  componentDidMount() {
    const { duration } = this.props.notification
    this.closeTimer = setTimeout(() => {
      this.fadeOut()
    }, duration)
  }

  /* istanbul ignore next */
  componentWillUnmount() {
    if (this.closeTimer) clearTimeout(this.closeTimer)
  }

  render() {
    const { notification } = this.props
    return (
      <div className={`notification ${this.generateClassNames()}`}>
        <div className="notification-msg">{notification.message}</div>

        <div className="close-button" onClick={this.onRemoveClick}>
          <FontAwesomeIcon className="fa-icon" icon={faTimes} color="#fff" />
        </div>

        <style jsx>{`
          .notification {
            margin-top: 10px;
            color: #fff;
            display: flex;
            animation: fadein 0.3s;
            border-radius: 5px;
            overflow: hidden;
          }

          .fade-out {
            animation: fadeout 0.3s;
            opacity: 0;
            pointer-events: none;
          }

          .notification-msg {
            padding: 15px 30px;
            flex: 1;
          }
          .close-button {
            padding: 15px 30px;
            border-left: 1px solid #fff;
            &:hover {
              cursor: pointer;
              background: ${Colors.ERROR100};
            }
          }
          .info {
            background: blue;
          }
          .warning {
            background: orange;
          }
          .success {
            background: green;
          }
          .error {
            background: ${Colors.ERROR80};
          }

          @keyframes fadein {
            from {
              opacity: 0;
              transform: scaleY(0);
            }
            to {
              opacity: 1;
              transform: scaleY(1);
            }
          }

          @keyframes fadeout {
            from {
              opacity: 1;
              transform: scaleY(1);
            }
            to {
              opacity: 0;
              transform: scaleY(0);
            }
          }
        `}</style>
      </div>
    )
  }

  /* istanbul ignore next */
  private onRemoveClick = async (e: any) => {
    clearTimeout(this.closeTimer)
    this.fadeOut()
  }

  private fadeOut = () => {
    this.setState({ isClosing: true })
    setTimeout(() => {
      this.props.onRemoveClick(this.props.notification.id)
    }, FADE_OUT_TIME)
  }

  private generateClassNames = () => {
    const { severity } = this.props.notification
    let classNames = []

    switch (severity) {
      case NotificationSeverity.INFO:
        classNames.push('info')
        break
      case NotificationSeverity.WARNING:
        classNames.push('warning')
        break
      case NotificationSeverity.SUCCESS:
        classNames.push('success')
        break
      case NotificationSeverity.ERROR:
        classNames.push('error')
        break
    }

    if (this.state.isClosing) classNames.push('fade-out')

    return classNames.join(' ')
  }
}
