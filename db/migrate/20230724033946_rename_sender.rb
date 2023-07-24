class RenameSender < ActiveRecord::Migration[7.0]
  def change
    rename_column :messages, :sender_id, :user_id
  end
end
