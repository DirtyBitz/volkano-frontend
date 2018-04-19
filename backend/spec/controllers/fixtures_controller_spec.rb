# frozen_string_literal: true

require 'rails_helper'

RSpec.describe FixturesController, type: :controller do
  describe 'POST #create' do
    it 'returns http success' do
      post :create
      expect(response).to have_http_status(:created)
    end
  end
end
