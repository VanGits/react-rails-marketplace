class UserSerializer < ActiveModel::Serializer
  has_many :listings 
  has_many :items
  has_many :transactions
  has_many :sold_items
  attributes :id, :name, :email, :image_url, :password_digest
end
