# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Items endpoint', type: :request do
  before(:each) do
    allow_any_instance_of(WebCollector).to receive(:valid?)
      .and_return(true)
    allow_any_instance_of(WebCollector).to receive(:collect)
      .and_return(
        mediatype: 'image', size: 1337, categories: 'waddup'
      )
  end

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
      item_hashes = user.items.map do |item|
        ItemSerializer.new(item).serializable_hash
      end.to_json
      get '/items', headers: user.create_new_auth_token
      expect(response).to have_http_status(:ok)
      expect(response.body).to eq(item_hashes)
    end

    it 'can get items by tag' do
      item = create(:item, user: user, tag_list: 'hilarious')
      serializer = ItemSerializer.new(item)
      expected = [serializer.serializable_hash].to_json
      get '/items',
          params: { tags: 'hilarious' },
          headers: user.create_new_auth_token
      expect(response).to have_http_status(:ok)
      expect(response.body).to eq(expected)
    end

    it 'can get items by multiple tags' do
      funny_cat = create(:item, user: user, tag_list: 'funny, cats')
      grumpy_cat = create(:item, user: user, tag_list: 'grumpy, cats')
      cat_titles = [funny_cat, grumpy_cat].map(&:title)
      create(:item, user: user, tag_list: 'funny, dogs')

      get '/items',
          params: { tags: 'cats' },
          headers: user.create_new_auth_token
      expect(response).to have_http_status(:ok)
      response_titles = JSON.parse(response.body).map { |o| o['title'] }
      expect(response_titles).to match_array(cat_titles)
    end

    it 'can not get others items' do
      secret_item = create(:item)
      get '/items', headers: user.create_new_auth_token
      expect(response.body).not_to include(secret_item.title)
    end

    it 'can not get others items even when searching by tag' do
      item_titles = user.items.pluck(:title)
      get '/items',
          params: { tags: create(:item).tag_list.first },
          headers: user.create_new_auth_token
      expect(response).to have_http_status(:ok)
      response_titles = JSON.parse(response.body).map { |o| o['title'] }
      expect(response_titles).to match_array(item_titles)
    end

    it 'can not view others items' do
      secret_item = create(:item)
      get "/items/#{secret_item.id}", headers: user.create_new_auth_token
      expect(response).to have_http_status(:not_found)
      expect(response.body).not_to include(secret_item.title)
    end

    it 'can not delete others items' do
      secret_item = create(:item)
      delete "/items/#{secret_item.id}", headers: user.create_new_auth_token
      expect(response).to have_http_status(:not_found)
      expect(response.body).not_to include(secret_item.title)
    end
  end

  context 'with invalid credentials' do
    it 'can not get items' do
      get '/items'
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
