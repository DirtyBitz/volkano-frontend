class Item < ApplicationRecord
  validates :title, presence: true, length: { minimum: 1 }
  validates :url, presence: true
  validates :tag, presence: true
end
