import Router from 'next/router'
import AuthApi from '../api/AuthApi'
import { hasSession } from './Session'

export const signOut = async () => {
  await AuthApi.signOut()
  Router.reload('/')
}

export const isSignedIn = req => {
  if (req) {
    const cookies = req.headers.cookie
    const isSignedIn = cookies
      ? cookies.split(';').filter(cookie => cookie.includes('session')).length == 1
      : false

    return isSignedIn
  } else {
    const isSignedIn = hasSession()
    return isSignedIn
  }
}
