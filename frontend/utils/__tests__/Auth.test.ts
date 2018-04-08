import { signOut } from '../Auth'
import Router from 'next/router'
import AuthApi from '../../api/AuthApi'
jest.mock('next/router')
jest.mock('../../api/AuthApi')

describe('Auth utils', () => {
  describe('signOut', () => {
    it('delegates calls to lower level APIs', async () => {
      await signOut()
      expect(AuthApi.signOut).toHaveBeenCalledTimes(1)
      expect(Router.push).toHaveBeenCalledWith('/')
    })
  })
})
