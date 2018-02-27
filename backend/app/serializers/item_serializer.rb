# frozen_string_literal: true

class ItemSerializer < ActiveModel::Serializer
  attributes :id, :title, :url, :tags,
             :categories, :created_at, :updated_at

  def tags
    object.tag_list
  end

  def categories
    object.category_list
  end
end
