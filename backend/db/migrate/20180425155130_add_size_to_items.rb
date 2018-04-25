class AddSizeToItems < ActiveRecord::Migration[5.1]
  def up
    add_column :items, :size, :integer
    Item.all.each do |item|
      item.size = Collector.new(item.url).size
      item.save!
    end
  end
  
  def down
    remove_column :items, :size
  end    
end
