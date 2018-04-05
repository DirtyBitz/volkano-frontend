# frozen_string_literal: true

class Item < ApplicationRecord
  belongs_to :user
  acts_as_taggable_on :tags
  acts_as_taggable_on :categories

  validates :title, presence: true
  validates :url,
            presence: true,
            uniqueness: {
              scope: %i[user url],
              message: 'already exists in collection'
            }
end
