import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { App } from '../index'
import { ISignOutAction } from '../../actions/authentication/AuthActionTypes'
import { AuthStateI } from '../../reducers/authenticationReducer'

interface MockProps {
  signIn: (username: string, password: string) => Promise<void>
  signOut: () => ISignOutAction
  authentication: AuthStateI
}

describe('App home page', () => {
  let mockProps: MockProps
  let app: ShallowWrapper<any>

  it('Is wrapped in a Layout component')
  it('It gives Layout component the auth prop')
})
