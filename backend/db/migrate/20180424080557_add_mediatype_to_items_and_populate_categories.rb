# frozen_string_literal: true

class AddMediatypeToItemsAndPopulateCategories < ActiveRecord::Migration[5.1]
  def up
    add_column :items, :mediatype, :string
    Item.all.each do |item|
      collected = Collector.new(item.url).collect
      item.mediatype = collected.fetch(:mediatype, 'invalid')
      item.category_list = collected[:categories]
      item.save!
    end
  end

  def down
    remove_column :items, :mediatype
    Item.all.each do |item|
      item.category_list = nil
      item.save!
    end
  end
end
