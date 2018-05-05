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
            },
            format: {
              with: URI::DEFAULT_PARSER.make_regexp,
              message: 'invalid URL'
            }

  validate do |item|
    collector = WebCollector.new(item.url)

    if collector.valid?
      collected = collector.collect
      item.mediatype = collected.fetch(:mediatype, 'invalid')
      item.size = collected[:size]
      item.category_list = collected[:categories]
    else
      item.errors[:url] << 'Invalid url'
    end
  end
end
