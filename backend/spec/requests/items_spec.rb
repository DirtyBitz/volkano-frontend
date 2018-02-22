# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Items endpoint', type: :request do
  let(:user) { create(:user, :confirmed, password: 'password') }

  context 'with valid credentials' do
    before(:each) do
      post '/auth/sign_in', params: {
        email: user.email,
        password: 'password'
      }
      expect(response.content_type).to eq('application/json')
      expect(response).to have_http_status(:ok)
      @headers = response.headers.slice('token', 'client', 'uid')
    end

    it 'can get items' do
      get '/items', params: {}, headers: @headers
      expect(response).to have_http_status(:ok)
      expect(response.body).to eq('[]')
    end
  end

  context 'with invalid credentials' do
    it 'can not get items' do
      get '/items'
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
