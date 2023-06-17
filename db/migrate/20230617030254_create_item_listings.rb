class CreateItemListings < ActiveRecord::Migration[7.0]
  def change
    create_table :item_listings do |t|
      t.string :title
      t.text :description
      t.string :image_url
      t.string :location
      t.string :user_id

      t.timestamps
    end
  end
end
