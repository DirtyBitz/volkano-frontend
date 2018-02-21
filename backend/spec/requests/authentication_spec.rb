# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'User authentication', type: :request do
  it 'can create a new user' do
    sign_up = attributes_for(:user)
              .merge(confirm_success_url: 'http://example.com')
    expect { post '/auth', params: sign_up }
      .to change { User.count }.by(1)
    expect(response).to have_http_status(:ok)
  end

  context 'with valid credentials' do
    let(:valid_params) do
      {
        email: create(:user, :confirmed, password: 'password').email,
        password: 'password',
        confirm_success_url: 'http://example.com'
      }
    end

    it 'returns auth headers' do
      post '/auth/sign_in', params: valid_params
      expect(response).to have_http_status(:ok)
      expect(response.headers).to include('uid')
      expect(response.headers).to include('client')
      expect(response.headers).to include('token')
    end

    it 'can log in with nickname' do
      user.skip_confirmation!
      user.save!
      valid_params.delete(:email)
      expect(valid_params).not_to include(:email)   

      post '/auth/sign_in', params: valid_params
      expect(response).to have_http_status(:ok)
    end

    it 'returns valid tokens' do
      post '/auth/sign_in', params: valid_params
      auth_params = {
        uid: response.headers['uid'],
        token: response.headers['token'],
        client: response.headers['client']
      }
      get '/auth/validate_token', params: auth_params
      expect(response).to have_http_status(:ok)
    end
  end

  context 'with invalid params' do
    let(:bad_params) do
      {
        email: 'goofus@example.com',
        password: 'short',
        confirm_success_url: 'http://example.com'
      }
    end

    it 'does not create a new user when password is too short' do
      post '/auth', params: bad_params
      expect(response).to have_http_status(:unprocessable_entity)
      res = JSON.parse(response.body)
      expect(res['errors']).to include('password')
    end

    it 'does not grant authorization without registered account' do
      bad_params = attributes_for(:user)
                   .merge(confirm_success_url: 'http://dummy.com')
      post '/auth/sign_in', params: bad_params
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
