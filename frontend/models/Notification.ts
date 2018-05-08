import uuid from 'uuid/v1'

export enum NotificationSeverity {
  INFO,
  WARNING,
  SUCCESS,
  ERROR,
}

export interface INotification {
  id: string
  severity: NotificationSeverity
  message: string
  duration?: number
}

export interface IError {
  errors: string[]
}

export const createNotification = (
  severity: NotificationSeverity,
  message: string,
  duration?: number
): INotification => ({
  id: uuid(),
  severity,
  message,
  duration,
})
