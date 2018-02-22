# frozen_string_literal: true

require 'rails_helper'
RSpec.describe ItemsController, type: :controller do
  let(:valid_attributes) do
    { title: 'Valid item', url: 'http://img.com/image.jpg', tag: 'exampletag' }
  end

  let(:invalid_attributes) do
    { title: '', url: 'http://img.com/image.jpg' }
  end

  let(:valid_session) { {} }

  let(:user) do
    User.create(email: 'test@example.com', password: 'password', confirmed_at: Time.now)
  end

  before(:each) do
    request.headers.merge! user.create_new_auth_token
  end

  describe 'GET #index' do
    it 'returns a success response' do
      Item.create! valid_attributes
      get :index, params: {}
      expect(response).to be_success
    end
  end

  describe 'GET #show' do
    it 'returns a success response' do
      item = Item.create! valid_attributes
      get :show, params: { id: item.to_param }
      expect(response).to be_success
    end
  end

  describe 'POST #create' do
    context 'with valid params' do
      it 'creates a new Item' do
        expect do
          post :create, params: { item: valid_attributes }
        end.to change(Item, :count).by(1)
      end

      it 'renders a JSON response with the new item' do
        post :create, params: { item: valid_attributes }
        expect(response).to have_http_status(:created)
        expect(response.content_type).to eq('application/json')
        expect(response.location).to eq(item_url(Item.last))
      end
    end

    context 'with invalid params' do
      it 'renders a JSON response with errors for the new item' do
        post :create, params: { item: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq('application/json')
      end
    end
  end

  describe 'PUT #update' do
    context 'with valid params' do
      let(:new_attributes) do
        { title: 'Updated', url: 'http://img.com/image.jpg', tag: 'new-tag' }
      end

      it 'updates the requested item' do
        item = Item.create! valid_attributes
        put :update,
            params: { id: item.to_param, item: new_attributes }
        item.reload
        expect(item.title).to eq('Updated')
      end

      it 'renders a JSON response with the item' do
        item = Item.create! valid_attributes

        put :update,
            params: { id: item.to_param, item: valid_attributes }
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to eq('application/json')
      end
    end

    context 'with invalid params' do
      it 'renders a JSON response with errors for the item' do
        item = Item.create! valid_attributes

        put :update,
            params: { id: item.to_param, item: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq('application/json')
      end
    end
  end

  describe 'DELETE #destroy' do
    it 'destroys the requested item' do
      item = Item.create! valid_attributes
      expect do
        delete :destroy, params: { id: item.to_param }
      end.to change(Item, :count).by(-1)
    end
  end
end
