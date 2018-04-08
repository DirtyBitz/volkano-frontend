import Router from 'next/router'
import AuthApi from '../api/AuthApi'

export const signOut = async () => {
  await AuthApi.signOut()
  Router.push('/')
}
