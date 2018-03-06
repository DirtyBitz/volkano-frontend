import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { App } from '../index'
import { ISignOutAction } from '../../actions/authentication/AuthActionTypes'
import { IAuthState } from '../../reducers/authentication'

interface MockProps {
  signIn: (username: string, password: string) => Promise<void>
  signOut: () => ISignOutAction
  authentication: IAuthState
}

describe('App home page', () => {
  let mockProps: MockProps
  let app: ShallowWrapper<any>

  it('Is wrapped in a Layout component')
  it('It gives Layout component the auth prop')
})
