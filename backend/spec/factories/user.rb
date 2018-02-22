# frozen_string_literal: true

FactoryBot.define do
  sequence :email do |n|
    "user-#{n}@example.com"
  end

  factory :user do
    email
    password 'password'
  end

  trait :confirmed do
    confirmed_at { Time.now.utc }
  end

  factory :user_with_items do
    transient do
      num_items 5
    end

    after(:create) do |user, evaluator|
      create_list(:item, evaluator.num_items, user: user)
    end
  end
end
