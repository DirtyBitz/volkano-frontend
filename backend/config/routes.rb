# frozen_string_literal: true

Rails.application.routes.draw do
  resources :items
  mount_devise_token_auth_for 'User', at: 'auth'
end
