jest.mock('../../utils/Session')
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import VolkanoRequest from '../VolkanoRequest'
import { getSession, setSession, ISession } from '../../utils/Session'

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
      return [200, {}, { token: 'new-token' }]
    })

    const wrapped = VolkanoRequest
    await wrapped.get('/')
    expect(token).toBe(session.token)
  })

  it('should update token on successful request', async () => {
    const newToken = 'new-token'
    mock.onGet().reply(200, { data: 'hello' }, { token: newToken })
    const wrapped = VolkanoRequest

    await wrapped.get('/')

    expect(getSession().token).toEqual(newToken)
  })

  it('should not update token on successful request if no token is returned', async () => {
    const originalToken = getSession().token

    mock.onGet().reply(200, { data: 'hello' }, { token: undefined })
    const wrapped = VolkanoRequest

    await wrapped.get('/')

    expect(getSession().token).toEqual(originalToken)
  })

  it('should not change token on server error response', async () => {
    mock.onPost().reply(500, {})
    const wrapped = VolkanoRequest

    try {
      const response = await wrapped.post('/', { params: { item: 'hello' } })
      console.error('Did get response', response)
    } catch (error) {
      //Ignore
    }

    expect(getSession().token).toEqual(session.token)
  })
})
