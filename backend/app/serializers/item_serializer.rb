# frozen_string_literal: true

class ItemSerializer < ActiveModel::Serializer
  attributes :id, :title, :url, :created_at, :updated_at
  has_many :tags, include: true
  has_many :categories, include: true
end

module ActsAsTaggableOn
  class TagSerializer < ActiveModel::Serializer
    attributes :name, :taggings_count
  end
end
