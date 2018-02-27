import requestReducer, { requestInitialState } from '../requestReducer'
import RequestActionTypeKeys from '../../actions/request/RequestActionTypeKeys'
import RequestActionTypes from '../../actions/request/RequestActionTypes'
import { AuthStateI, authInitialState } from '../authenticationReducer'
import { OtherAction } from '../../actions/IOtherAction'
import { User } from '../../models/User'

describe('Request reducer', () => {
  const loggedIn: AuthStateI = {
    isLoading: false,
    token: 'valid-token',
    user: {
      id: 3,
      name: 'Test Guy',
      email: 'test@example.com',
      image: undefined,
      nickname: undefined,
    },
    errors: undefined,
  }

  it('should return the initial state for unrelated actions', () => {
    expect(requestReducer(undefined, OtherAction)).toEqual(requestInitialState)
  })

  it('should reset auth state on unauthorized response', () => {
    const expectedState: AuthStateI = authInitialState
    const unauthorizedResponse: RequestActionTypes = {
      type: RequestActionTypeKeys.REQUEST_UNAUTHORIZED,
    }

    const newState = requestReducer(loggedIn, unauthorizedResponse)

    expect(newState).toEqual(expectedState)
  })

  it('should update token on success response', () => {
    const expectedState: AuthStateI = {
      ...loggedIn,
      token: 'new-token',
    }

    const successResponse: RequestActionTypes = {
      type: RequestActionTypeKeys.REQUEST_OK,
      token: 'new-token',
    }

    const state = requestReducer(loggedIn, successResponse)

    expect(state).toEqual(expectedState)
  })

  it('should update token on unprocessable response', () => {
    const expectedState: AuthStateI = {
      ...loggedIn,
      token: 'new-token',
    }

    const unprocessableResponse: RequestActionTypes = {
      type: RequestActionTypeKeys.REQUEST_UNPROCESSABLE,
      token: 'new-token',
    }

    const state = requestReducer(loggedIn, unprocessableResponse)

    expect(state).toEqual(expectedState)
  })

  it('should not do anything on error response', () => {
    const expectedState: AuthStateI = loggedIn

    const serverErrorResponse: RequestActionTypes = {
      type: RequestActionTypeKeys.REQUEST_SERVER_ERROR,
    }

    const state = requestReducer(loggedIn, serverErrorResponse)

    expect(state).toEqual(expectedState)
  })
})
