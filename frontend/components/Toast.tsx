import * as React from 'react'
import { Colors } from '../constants/Colors'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/fontawesome-free-solid'
import { INotification, NotificationSeverity } from '../models/Notification'
import { Message, Transition, Icon } from 'semantic-ui-react'

interface IState {
  duration?: number
  open: boolean
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
      open: true,
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

  private getType() {
    const severity = this.props.notification.severity
    return {
      info: severity === NotificationSeverity.INFO,
      warning: severity === NotificationSeverity.WARNING,
      success: severity === NotificationSeverity.SUCCESS,
      error: severity === NotificationSeverity.ERROR,
    }
  }

  render() {
    const { notification } = this.props
    const { open } = this.state

    return (
      <Transition visible={open} animation="fade left" unmountOnHide transitionOnMount>
        <Message
          className="notification"
          {...this.getType()}
          onDismiss={this.onRemoveClick}>
          <Message.Content>{notification.message}</Message.Content>
        </Message>
      </Transition>
    )
  }

  /* istanbul ignore next */
  private onRemoveClick = async (e: any) => {
    clearTimeout(this.closeTimer)
    this.fadeOut()
  }

  private fadeOut = () => {
    this.setState({ open: false })
    setTimeout(() => {
      this.props.onRemoveClick(this.props.notification.id)
    }, FADE_OUT_TIME)
  }
}
