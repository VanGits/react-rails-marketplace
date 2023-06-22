class User < ApplicationRecord
    has_secure_password

    # associations
    has_many :item_listings, dependent: :destroy
    has_many :offers, dependent: :destroy
    
    has_many :favorites, dependent: :destroy
    has_many :favorited_items, through: :favorites, source: :item_listing
    # validations

    validates :name, presence: true, uniqueness: true
    # validates :email, presence: true, uniqueness: true
    validates :password, presence: true, length: { minimum: 6 }
    validates :image_url, presence: true, format: { with: /\.(png|jpg|jpeg|gif)\z/i, message: "must be a URL for PNG, JPG, JPEG, or GIF image" }
    validate :valid_location

  def valid_location
    unless location_valid?
      errors.add(:location, 'is not a valid location')
    end
  end

  def location_valid?
    location_regex = /\A[\p{L}\s']+,\s*\p{L}+,\s*\p{L}+\z/
    return false unless location =~ location_regex
    true
  end

end
