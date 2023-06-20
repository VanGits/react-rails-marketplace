class AddColumnsToOffer < ActiveRecord::Migration[7.0]
  def change
    add_column :offers, :user_id, :integer
    add_column :offers, :item_listing_id, :integer
  end
end
