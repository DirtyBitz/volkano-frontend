class AddAllowPasswordChangeToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :allow_password_change, :boolean, default: false
  end
end
