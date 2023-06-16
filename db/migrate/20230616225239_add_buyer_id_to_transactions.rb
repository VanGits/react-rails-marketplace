class AddBuyerIdToTransactions < ActiveRecord::Migration[7.0]
  def change
    add_column :transactions, :buyer_id, :integer
  end
end
