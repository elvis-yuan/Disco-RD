class CreateServers < ActiveRecord::Migration[5.2]
  def change
    create_table :servers do |t|
      t.string :title, null: false
      t.string :invitation_code, null: false
      t.string :icon_url
      t.boolean :public, default: true
      t.integer :admin_id, null: false

      t.timestamps
    end
  end
end
