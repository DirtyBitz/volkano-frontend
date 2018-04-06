import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import VolkanoRequest from '../VolkanoRequest'
import {
  getSession,
  setSession,
  ISession,
  hasSession,
  clearSession,
} from '../../utils/Session'
import { IUser, IUserJson } from '../../models/User'

describe('Volkano request adapter', () => {
  let mock
  let session: ISession

  beforeEach(() => {
    mock = new MockAdapter(axios)
  })

  describe('without a signed in user', () => {
    beforeEach(() => {
      clearSession()
    })

    it('creates a session on successful signin', async () => {
      mock.onPost().reply(
        200,
        {
          data: {
            email: 'test@example.com',
            name: null,
            uid: 'test@example.com',
          },
        },
        { uid: 'a', client: 'b', token: 'c' }
      )

      await VolkanoRequest.post('/auth/sign_in', {})

      const signedIn = hasSession()
      expect(signedIn).toBe(true)
    })

    it('does not create a session on failed signin', async () => {
      mock.onPost().reply(422, {
        errors: ['Invalid credentials'],
      })

      try {
        await VolkanoRequest.post('/auth/sign_in', {})
      } catch (error) {
        /* Ignore error in test */
      }

      const signedIn = hasSession()
      expect(signedIn).toBe(false)
    })

    it('does not create a session for non-signin actions', async () => {
      mock.onPost().reply(200, { data: 'user data goes here' })

      await VolkanoRequest.post('/auth', {})

      const signedIn = hasSession()
      expect(signedIn).toBe(false)
    })
  })

  describe('with a signed in user', () => {
    beforeEach(() => {
      session = {
        token: 'original-token',
        uid: 'uid',
        client: 'client',
      }
      setSession(session)
    })

    it('makes requests using authentication from store', async () => {
      let token
      mock.onGet().reply(config => {
        token = config.headers.token
        return [
          200,
          { data: { id: 0, email: 'test@example.com' } },
          { token: 'new-token', uid: 'test@example.com', client: 'client' },
        ]
      })

      await VolkanoRequest.get('/')

      expect(token).toBe(session.token)
    })

    it('should update user on successful auth request', async () => {
      const newToken = 'new-token'
      const expectedUser = {
        email: 'test@example.com',
        id: 0,
        name: 'tester',
        nickname: null,
      }
      const userJson: IUserJson = {
        ...expectedUser,
        uid: 'test@example.com',
        image: null,
        provider: null,
      }
      mock.onPost().reply(200, { data: userJson }, { token: newToken })

      await VolkanoRequest.post('/auth/sign_in', {})

      const { user, token } = getSession()
      expect(user).toEqual(expectedUser)
      expect(token).toEqual(newToken)
    })

    it('should not update user on unrelated successful request', async () => {
      const newToken = 'new-token'
      const oldUser: IUser = { email: 'tester', id: 0 }
      const oldSession: ISession = { client: 'a', uid: 'b', token: 'b', user: oldUser }
      mock.onPost().reply(200, { data: 'this is an unrelated item' }, { token: newToken })
      setSession(oldSession)

      await VolkanoRequest.post('/items', {})

      const { user, token } = getSession()
      expect(token).toEqual(newToken)
      expect(user).toEqual(oldUser)
    })

    it('should update token on successful request', async () => {
      const newToken = 'new-token'
      mock.onGet().reply(200, { data: 'hello' }, { token: newToken })

      await VolkanoRequest.get('/')

      expect(getSession().token).toEqual(newToken)
    })

    it('should update token on unprocessable entity', async () => {
      const newToken = 'new-token'
      mock
        .onPost()
        .reply(422, { data: { errors: ['invalid item'] } }, { token: newToken })

      try {
        await VolkanoRequest.post('/', { item: 'yep' })
        expect('this should never happen').toBe(true)
      } catch (error) {
        expect(error.status).toBe(422)
      }

      expect(getSession().token).toEqual(newToken)
    })

    it('should not update token on successful request if no token is returned', async () => {
      const originalToken = getSession().token

      mock.onGet().reply(200, { data: 'hello' }, { token: undefined })

      await VolkanoRequest.get('/')

      expect(getSession().token).toEqual(originalToken)
    })

    it('should sign out user on unauthorized request', async () => {
      mock.onPost().reply(401, { data: { errors: ['invalid token'] } })

      try {
        await VolkanoRequest.post('/', { item: 'yep' })
        expect('this should never happen').toBe(true)
      } catch (error) {
        expect(error.status).toBe(401)
      }

      expect(hasSession()).toBe(false)
    })

    it('should not change token on server error response', async () => {
      mock.onPost().reply(500, {})

      try {
        await VolkanoRequest.post('/', { item: 'hello' })
      } catch (error) {
        expect(error.status).toEqual(500)
      }

      expect(getSession().token).toEqual(session.token)
    })
  })

  it('should send PUT requests with provided data', async () => {
    mock
      .onPut()
      .reply(config => [200, { data: JSON.parse(config.data) }, { token: undefined }])

    const response = await VolkanoRequest.put('/', { nickname: 'joe' })

    expect(response.data.nickname).toEqual('joe')
  })

  it('should send DELETE requests with provided data', async () => {
    mock
      .onDelete()
      .reply(config => [204, { data: JSON.parse(config.data) }, { token: undefined }])

    const response = await VolkanoRequest.delete('/', { id: 1 })

    expect(response.data.id).toBe(1)
  })

  it('should send DELETE requests even without data', async () => {
    mock.onDelete().reply(config => [200, { data: 'good job' }, { token: undefined }])

    const response = await VolkanoRequest.delete('/')

    expect(response.data).toEqual('good job')
  })
})
