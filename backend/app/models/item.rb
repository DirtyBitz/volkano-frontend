# frozen_string_literal: true

class Item < ApplicationRecord
  belongs_to :user

  validates :title, presence: true
  validates :url, presence: true, uniqueness: { scope: %i[user url] }
  validates :tag, presence: true
end
