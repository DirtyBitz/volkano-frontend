# frozen_string_literal: true

require 'rails_helper'

RSpec.describe FixturesController, type: :controller do
  describe 'POST #create' do
    it 'with a valid email address' do
      post :create, params: { email: 'test@example.com' }
      expect(response).to have_http_status(:created)
    end

    it 'with an invalid email address' do
      post :create, params: { email: 'test@test.com' }
      expect(response).to have_http_status(:bad_request)
    end
  end
end
