# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Items endpoint', type: :request do
  context 'as a new user' do
    let(:user) { create(:user, :confirmed) }

    it 'can get items' do
      get '/items', headers: user.create_new_auth_token
      expect(response).to have_http_status(:ok)
      expect(response.body).to eq('[]')
    end
  end

  context 'as an experienced user' do
    let(:user) { create(:user_with_items) }

    it 'can get items' do
      items = user.items.to_json
      get '/items', headers: user.create_new_auth_token
      expect(response).to have_http_status(:ok)
      expect(response.body).to eq(items)
    end

    it 'can not delete others items'
    it 'can not view others items'
  end

  context 'with invalid credentials' do
    it 'can not get items' do
      get '/items'
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
