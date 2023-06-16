class AddItemIdToTransactions < ActiveRecord::Migration[7.0]
  def change
    add_column :transactions, :item_id, :integer
  end
end
