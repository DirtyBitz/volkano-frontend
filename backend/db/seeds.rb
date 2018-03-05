# frozen_string_literal: true

require 'factory_bot'
FactoryBot.create(:user_with_items,
                  email: 'test@example.com',
                  password: 'password',
                  num_items: 100)