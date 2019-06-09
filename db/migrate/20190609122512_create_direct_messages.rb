class CreateDirectMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :direct_messages do |t|
      t.integer :dmer_id, null: false
      t.integer :dmee_id, null: false

      t.timestamps
    end

    add_index :direct_messages, :dmer_id
    add_index :direct_messages, :dmee_id
    add_index(:direct_messages, [:dmer_id, :dmee_id])
    
  end
end
