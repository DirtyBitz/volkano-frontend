# frozen_string_literal: true

FactoryBot.define do
  trait :confirmed do
    confirmed_at { Time.now.utc }
  end

  sequence :email do |n|
    "user-#{n}@example.com"
  end

  sequence :password do
    SecureRandom.alphanumeric(10)
  end

  factory :user do
    email
    password

    factory :user_with_items do
      confirmed

      transient do
        num_items 5
      end

      after(:create) do |user, evaluator|
        create_list(:item, evaluator.num_items, user: user)
      end
    end
  end
end
