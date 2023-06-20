class DropTransactionsTable < ActiveRecord::Migration[7.0]
  def change
    drop_table :transactions
  end
end
