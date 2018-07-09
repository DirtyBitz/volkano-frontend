import { INITIAL_USER_STATE, userReducer } from '../user'
import { OtherAction } from '../../actions/IOtherAction'
import { addUser, removeUser } from '../../actions/user/UserActions'

const FAKE_SESSION = {
  token: 'string',
  uid: 'string',
  client: 'string',
  user: {
    email: 'string',
    nickname: 'string',
  },
}

describe('User reducer', () => {
  it('should initialiaze empty', () => {
    const expectedState = INITIAL_USER_STATE

    const state = userReducer(undefined, OtherAction)

    expect(state).toEqual(expectedState)
  })

  it('should add user', () => {
    const expectedState = {
      session: FAKE_SESSION,
    }

    const state = userReducer(INITIAL_USER_STATE, addUser(FAKE_SESSION))

    expect(state).toEqual(expectedState)
  })

  it('should remove user', () => {
    const expectedState = INITIAL_USER_STATE

    const add_user_state = userReducer(INITIAL_USER_STATE, addUser(FAKE_SESSION))
    const state = userReducer(add_user_state, removeUser())

    expect(state).toEqual(expectedState)
  })
})
