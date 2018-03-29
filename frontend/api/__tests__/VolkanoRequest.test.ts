import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import VolkanoRequest from '../VolkanoRequest'
import { getSession, setSession, ISession } from '../../utils/Session'
import { IUser, IUserJson } from '../../models/User'

describe('Volkano request adapter', () => {
  let mock
  let session: ISession

  beforeEach(() => {
    mock = new MockAdapter(axios)
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

  it('should update token on successful request', async () => {
    const newToken = 'new-token'
    mock.onGet().reply(200, { data: 'hello' }, { token: newToken })

    await VolkanoRequest.get('/')

    expect(getSession().token).toEqual(newToken)
  })

  it('should not update token on successful request if no token is returned', async () => {
    const originalToken = getSession().token

    mock.onGet().reply(200, { data: 'hello' }, { token: undefined })

    await VolkanoRequest.get('/')

    expect(getSession().token).toEqual(originalToken)
  })

  it('should not change token on server error response', async () => {
    mock.onPost().reply(500, {})

    try {
      const response = await VolkanoRequest.post('/', { item: 'hello' })
      console.error('Did get response', response)
    } catch (error) {
      expect(error.status).toEqual(500)
    }

    expect(getSession().token).toEqual(session.token)
  })

  it('should send PUT requests with provided parameters', async () => {
    mock.onPut().reply(config => {
      const params = config.params
      return [200, params, { token: undefined }]
    })

    const response = await VolkanoRequest.put('/', { nickname: 'joe' })

    expect(response.data.nickname).toEqual('joe')
  })

  it('should send DELETE requests with provided parameters', async () => {
    mock.onDelete().reply(config => {
      const params = config.params
      return [204, params, { token: undefined }]
    })

    const response = await VolkanoRequest.delete('/', { id: 1 })

    expect(response.data.id).toEqual(1)
  })

  it('should update user on successful request', async () => {
    const newToken = 'new-token'
    const userJson: IUserJson = {
      id: 0,
      uid: 'test@example.com',
      email: 'test@example.com',
      nickname: null,
      name: null,
      image: null,
      provider: null,
    }
    const user: IUser = { email: 'test@example.com', id: 0, name: null, nickname: null }

    mock.onPost().reply(200, { data: userJson }, { token: newToken })

    await VolkanoRequest.post('/auth/sign_in', {})

    expect(getSession().user).toEqual(user)
  })
})
