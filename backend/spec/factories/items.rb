# frozen_string_literal: true

FactoryBot.define do
  sequence :title do |n|
    "Item ##{n}"
  end

  sequence :image_url do |n|
    "http://example.com/images/#{n}.jpg"
  end

  factory :item do
    transient do
      tags 'image'
    end
    url { generate(:image_url) }
    title
    user

    after(:create) do |item, evaluator|
      item.tag_list.add(evaluator.tags, parse: true)
      item.save
      item.reload
    end
  end
end
