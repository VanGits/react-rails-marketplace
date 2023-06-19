class UserSerializer < ActiveModel::Serializer
 
  has_many :item_listings
 
 has_many :favorited_items
  attributes :id, :name, :email, :image_url, :password_digest, :location
end
