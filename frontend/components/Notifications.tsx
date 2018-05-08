import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { IStoreState } from '../store/StoreState'
import { INotification } from '../models/Notification'
import { removeNotification } from '../actions/notifications/NotificationActions'
import { Toast } from './Toast'

interface IProps {
  notifications: INotification[]
  removeNotification: (id: string) => void
}

export const Notifications = (props: IProps) => (
  <div id="notifications">
    {props.notifications.map(notification => (
      <Toast
        key={notification.id}
        notification={notification}
        onRemoveClick={props.removeNotification}
      />
    ))}
    <style jsx>{`
      #notifications {
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 9999;
      }
    `}</style>
  </div>
)

/* istanbul ignore next */
const mapStateToProps = (state: IStoreState) => {
  return {
    notifications: state.notifications,
  }
}

/* istanbul ignore next */
const mapDispatchToProps = (dispatch: Dispatch<IStoreState>) => {
  return {
    removeNotification: bindActionCreators(removeNotification, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
