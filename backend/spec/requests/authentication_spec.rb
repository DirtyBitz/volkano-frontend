# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'User authentication', type: :request do
  let(:valid_params) do
    { email: 'gallant@example.com',
      password: 'password',
      password_confirmation: 'password' }
  end
  let(:invalid_params) do
    { email: 'goofus@example.com',
      password: 'wrong',
      password_confirmation: 'password' }
  end

  it 'can sign up a new account' do
    post '/auth', params: valid_params

    expect(response).to be_success
    expect(ActionMailer::Base.deliveries).to eq([])
  end

  context 'with valid credentials' do
    it 'returns an auth token' do
      get '/auth/sign_in', params: valid_params

      expect(response).to be_success
      json = JSON.parse(response.body)
      expect(json).to include(:token)
    end
  end

  context 'with invalid credentials' do
    it 'does not grand authorization' do
      get '/auth/sign_in', params: invalid_params

      expect(response).to be_unauthorized
    end
  end
end
