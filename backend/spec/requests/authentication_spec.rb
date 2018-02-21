# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'User authentication', type: :request do
  let(:valid_user) do
    {
      email: 'gallant@example.com',
      password: 'password'
    }
  end
  let(:valid_params) do
    valid_user.merge(
      password_confirmation: valid_user[:password],
      confirm_success_url: 'http://dummy'
    )
  end
  let(:user) { User.create! valid_user }

  context 'with valid credentials' do
    it 'can create a new user' do
      expect { post '/auth', params: valid_params }
        .to change { User.count }.by(1)
      expect(response).to have_http_status(:ok)
    end

    it 'returns an auth token' do
      user.confirm
      post '/auth/sign_in', params: valid_user
      expect(response).to have_http_status(:ok)
      expect(response.headers).to include('client')
      expect(response.headers).to include('access-token')
    end

    it 'returns valid tokens' do
      user.confirm
      post '/auth/sign_in', params: valid_user
      params = {
        uid: response.headers['uid'],
        'access-token': response.headers['access-token'],
        client: response.headers['client']
      }
      get '/auth/validate_token', params: params
      expect(response).to have_http_status(:ok)
    end
  end

  it 'does not create a new user when password is too short' do
    post '/auth', params: { email: 'goofus@example.com', password: 'short' }
    expect(response).to have_http_status(:unprocessable_entity)
  end

  it 'does not grant authorization without registered account' do
    bad_params = { email: 'goofus@example.com', password: 'password' }
    post '/auth/sign_in', params: bad_params
    expect(response).to have_http_status(:unauthorized)
  end
end
