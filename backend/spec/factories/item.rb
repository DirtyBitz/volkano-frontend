# frozen_string_literal: true

FactoryBot.define do
  sequence :title do |n|
    "Item ##{n}"
  end

  sequence :image_url do |n|
    "http://example.com/images/#{n}.jpg"
  end

  factory :item do
    url { generate(:image_url) }
    title
    tag 'image'
    user
  end
end
