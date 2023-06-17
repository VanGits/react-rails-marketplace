class AddPriceToItemListings < ActiveRecord::Migration[7.0]
  def change
    add_column :item_listings, :price, :float
  end
end
