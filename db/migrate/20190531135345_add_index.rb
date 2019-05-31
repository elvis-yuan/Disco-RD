class AddIndex < ActiveRecord::Migration[5.2]
  def change
    add_index :servers, :invitation_code
  end
end
