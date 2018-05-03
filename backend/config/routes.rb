# frozen_string_literal: true

Rails.application.routes.draw do
  post 'fixtures', to: 'fixtures#create', as: 'fixture'

  resources :items
  mount_devise_token_auth_for 'User', at: 'auth'
end
