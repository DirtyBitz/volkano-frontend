import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { App } from '../index'
import {
  ISignInAction,
  ISignOutAction,
} from '../../actions/authentication/AuthActionTypes'
import { AuthStateI } from '../../reducers/authenticationReducer'

interface MockProps {
  signIn: (username: string, password: string) => ISignInAction
  signOut: () => ISignOutAction
  authentication: AuthStateI
}

describe('App home page', () => {
  let mockProps: MockProps
  let app: ShallowWrapper<any>

  beforeEach(() => {
    mockProps = {
      signIn: jest.fn(),
      signOut: jest.fn(),
      authentication: {
        isAuthenticated: false,
        tokens: {
          access_token: 'fake-token',
          refresh_token: 'fake-token',
        },
      },
    }
    app = shallow(<App {...mockProps} />)
  })

  it('Should show sign in button initially', () => {
    const signInButton = app.find('button')

    expect(signInButton.text()).toBe('Sign in!')
  })

  it('Should call signIn function when button is pressed', () => {
    const signInButton = app.find('button')

    signInButton.simulate('click')

    expect(mockProps.signIn).toHaveBeenCalledTimes(1)
    expect(mockProps.signIn).toHaveBeenLastCalledWith('test', 'test')
  })

  it('Is wrapped in a Layout component')
  it('It gives Layout component the auth prop')
})
