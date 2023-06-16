class CreateItems < ActiveRecord::Migration[7.0]
  def change
    create_table :items do |t|
      t.string :name
      t.text :description
      t.string :image_url
      t.string :location

      t.timestamps
    end
  end
end
