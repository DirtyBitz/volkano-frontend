# frozen_string_literal: true

class AddMediatypeAndSizeToItemsAndPopulateCategories < ActiveRecord::Migration[5.1]
  def up
    add_column :items, :mediatype, :string
    add_column :items, :size, :integer
    Item.find_each do |item|
      collected = WebCollector.new(item.url).collect
      item.mediatype = collected.fetch(:mediatype, 'invalid')
      item.category_list = collected[:categories]
      item.size = collected[:size]
      item.save!
    end
  end

  def down
    remove_column :items, :mediatype
    remove_column :items, :size
    Item.find_each do |item|
      item.category_list = nil
      item.save!
    end
  end
end
