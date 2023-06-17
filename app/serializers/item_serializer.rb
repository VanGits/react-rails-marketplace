class ItemSerializer < ActiveModel::Serializer
  has_many :users
  attributes :id, :name, :description, :image_url, :location
end
