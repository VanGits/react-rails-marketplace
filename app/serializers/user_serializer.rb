class UserSerializer < ActiveModel::Serializer
 
  has_many :item_listings
 
  attributes :id, :name, :email, :image_url, :password_digest, :location
end
