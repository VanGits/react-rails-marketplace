class CreateOffers < ActiveRecord::Migration[7.0]
  def change
    create_table :offers do |t|
      t.integer :price
      t.string :contact

      t.timestamps
    end
  end
end
