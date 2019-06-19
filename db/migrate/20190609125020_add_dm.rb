class AddDm < ActiveRecord::Migration[5.2]
  def change
    add_column :channels, :dm_id, :integer
    add_column :users, :direct_message_id, :integer
  end
end