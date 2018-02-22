# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'User authentication', type: :request do
  let(:valid_params) do
    {
      email: create(:user, :confirmed, password: 'password').email,
      password: 'password'
    }
  end

  context 'with valid credentials' do
    it 'can create a new user' do
      sign_up = attributes_for(:user)
                .merge(confirm_success_url: 'http://dummy.com')

      expect { post '/auth', params: sign_up }
        .to change { User.count }.by(1)
      expect(response).to have_http_status(:ok)
    end

    it 'returns an auth token' do
      post '/auth/sign_in', params: valid_params
      expect(response).to have_http_status(:ok)
      expect(response.headers).to include('client')
      expect(response.headers).to include('token')
    end

    it 'returns valid tokens' do
      post '/auth/sign_in', params: valid_params
      params = {
        uid: response.headers['uid'],
        token: response.headers['token'],
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
