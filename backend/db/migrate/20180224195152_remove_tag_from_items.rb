class RemoveTagFromItems < ActiveRecord::Migration[5.1]
  def change
    remove_column :items, :tag
  end
end
