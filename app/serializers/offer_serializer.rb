class OfferSerializer < ActiveModel::Serializer
  belongs_to :item_listing
  attributes :id, :price, :contact, :user_name, :user_image_url

  def user_name
    object.user&.name
  end

  def user_image_url
    object.user&.image_url
  end
end
