import Router from 'next/router'
import AuthApi from '../api/AuthApi'
import { getSession } from './Session'
import * as cookie from 'cookie'

export const signOut = async (): Promise<void> => {
  try {
    await AuthApi.signOut()
  } catch (error) {
    // TODO: Show warning that the user was already disconnected/not signed in anymore. (?)
  }
  Router.push('/')
}

export const isSignedIn = async (req): Promise<boolean> => {
  let session
  if (req && req.headers && req.headers.cookie) {
    // Serverside, we must check the cookie provided in headers
    try {
      const sessionCookie = decodeURI(req.headers.cookie)
      const stripped = sessionCookie.replace(/^session=/, '').replace(/%2C/g, ',')
      session = JSON.parse(stripped)
    } catch (error) {
      return Promise.resolve(false)
    }
  } else {
    // Clientside, get the cookie from browser
    session = getSession()
  }

  return await AuthApi.isSignedIn(session)
}

export const getReqSession = async req => {
  let session
  if (req && req.headers && req.headers.cookie) {
    // Serverside, we must check the cookie provided in headers
    try {
      const cookies = cookie.parse(req.headers.cookie)
      if (cookies.session) {
        session = JSON.parse(cookies.session)
      }
    } catch (error) {
      return
    }
  } else {
    // Clientside, get the cookie from browser
    session = getSession()
  }
  return session
}
