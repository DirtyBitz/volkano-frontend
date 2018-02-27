# frozen_string_literal: true

class ItemSerializer < ActiveModel::Serializer
  attributes :id, :title, :url, :tag_list,
             :category_list, :created_at, :updated_at
end
