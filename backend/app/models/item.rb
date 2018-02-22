# frozen_string_literal: true

class Item < ApplicationRecord
  belongs_to :user

  validates :title, presence: true, length: { minimum: 1 }
  validates :url, presence: true, uniqueness: true
  validates :tag, presence: true
end
