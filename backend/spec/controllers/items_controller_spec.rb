# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ItemsController, type: :controller do
  let(:user) do
    create(:user, :confirmed)
  end

  before(:each) do
    allow_any_instance_of(WebCollector).to receive(:valid?)
      .and_return(true)
    allow_any_instance_of(WebCollector).to receive(:collect)
      .and_return(
        mediatype: 'image', size: 1337, categories: 'waddup'
      )

    request.headers.merge! user.create_new_auth_token
  end

  describe 'GET #index' do
    it 'returns a success response' do
      get :index
      expect(response).to have_http_status(:ok)
    end
  end

  describe 'GET #show' do
    it 'returns a success response' do
      item = create(:item, user: user)
      get :show, params: { id: item.to_param }
      expect(response).to have_http_status(:ok)
    end
  end

  describe 'POST #create' do
    context 'with valid params' do
      it 'creates a new Item' do
        expect do
          post :create, params: { item: attributes_for(:item) }
        end.to change(Item, :count).by(1)
      end

      it 'renders a JSON response with the new item' do
        post :create, params: { item: attributes_for(:item) }
        expect(response).to have_http_status(:created)
        expect(response.content_type).to eq('application/json')
        expect(response.location).to eq(item_url(Item.last))
      end
    end

    context 'with invalid params' do
      it 'renders a JSON response with errors for the new item' do
        post :create, params: { item: { title: '' } }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq('application/json')
        expect(response.body).to include("can't be blank")
      end
    end
  end

  describe 'PUT #update' do
    context 'with valid params' do
      it 'updates the requested item' do
        item = create(:item, user: user)
        new_attribs = attributes_for(:item)
        new_title = new_attribs[:title]
        put :update,
            params: { id: item.to_param, item: new_attribs }
        item.reload
        expect(item.title).to eq(new_title)
      end

      it 'renders a JSON response with the item' do
        item = create(:item, user: user)
        new_attribs = attributes_for(:item)

        put :update,
            params: { id: item.to_param, item: new_attribs }
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to eq('application/json')
      end
    end

    context 'with invalid params' do
      it 'renders a JSON response with errors for the item' do
        item = create(:item, user: user)
        invalid_attributes = { title: '' }
        put :update,
            params: { id: item.to_param, item: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq('application/json')
      end
    end
  end

  describe 'DELETE #destroy' do
    it 'destroys the requested item' do
      item = create(:item, user: user)
      expect do
        delete :destroy, params: { id: item.to_param }
      end.to change(Item, :count).by(-1)
    end
  end
end
