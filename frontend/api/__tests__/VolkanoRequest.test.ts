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

  it('should update user on successful request', async () => {
    const newToken = 'new-token'
    const expectedUser = {
      email: 'test@example.com',
      id: 0,
      name: null,
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

  it('should update token on successful request', async () => {
    const newToken = 'new-token'
    mock.onGet().reply(200, { data: 'hello' }, { token: newToken })

    await VolkanoRequest.get('/')

    expect(getSession().token).toEqual(newToken)
  })

  it('should update token on unprocessable entity', async () => {
    const newToken = 'new-token'
    mock.onPost().reply(422, { data: { errors: ['invalid item'] } }, { token: newToken })

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

    expect(response.data.id).toEqual(1)
  })
})
