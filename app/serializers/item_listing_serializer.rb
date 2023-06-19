class ItemListingSerializer < ActiveModel::Serializer
  belongs_to :user
  has_many :favorited_by_users
  attributes :id, :title, :description, :image_url, :location, :user_id, :price, :created_at
end
