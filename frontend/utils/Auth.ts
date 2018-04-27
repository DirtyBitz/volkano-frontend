import Router from 'next/router'
import AuthApi from '../api/AuthApi'
import { getSession } from './Session'

export const signOut = async () => {
  await AuthApi.signOut()
  Router.push('/')
}

export const isSignedIn = async req => {
  let session
  if (req && req.headers && req.headers.cookie) {
    // Serverside, we must check the cookie provided in headers
    try {
      const sessionCookie = decodeURI(req.headers.cookie)
      const stripped = sessionCookie.replace(/^session=/, '').replace(/%2C/g, ',')
      session = JSON.parse(stripped)
    } catch (error) {
      return false
    }
  } else {
    // Clientside, get the cookie directly
    session = getSession()
  }

  return await AuthApi.isSignedIn(session)
}
