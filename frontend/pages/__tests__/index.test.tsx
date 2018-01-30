import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { App } from '../index'
import { Provider } from 'react-redux'
import ISignInAction from '../../actions/authentication/ISignInAction'
import ISignOutAction from '../../actions/authentication/ISignOutAction'

interface MockProps {
  signIn: (username: string, password: string) => ISignInAction
  signOut: () => ISignOutAction
  isAuthenticated: boolean
}

describe('App home page', () => {
  let mockProps: MockProps
  let app: ShallowWrapper<any>

  beforeEach(() => {
    mockProps = {
      signIn: jest.fn(),
      signOut: jest.fn(),
      isAuthenticated: false,
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
})
