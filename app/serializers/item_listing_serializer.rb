class ItemListingSerializer < ActiveModel::Serializer
  belongs_to :user
  attributes :id, :title, :description, :image_url, :location, :user_id, :price
end
