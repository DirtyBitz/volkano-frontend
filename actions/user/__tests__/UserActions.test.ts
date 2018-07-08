import * as actions from '../UserActions'
import { UserActionTypeKeys } from '../UserActionTypeKeys'

describe('User actions', () => {
  it('add user action', () => {
    const fakeSession = {
      uid: 'test@example.com',
      token: '123',
      client: 'client',
      user: { id: 123, email: 'test@example.com' },
    }

    const expected = {
      type: UserActionTypeKeys.ADD_USER,
      payload: fakeSession,
    }

    expect(actions.addUser(fakeSession)).toEqual(expected)
  })

  it('remove user action', () => {
    const expected = {
      type: UserActionTypeKeys.REMOVE_USER,
    }

    expect(actions.removeUser()).toEqual(expected)
  })
})
