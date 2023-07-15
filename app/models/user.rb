class User < ApplicationRecord
    has_secure_password
    has_one_attached :image
    # associations
    has_many :item_listings, dependent: :destroy
    has_many :offers, dependent: :destroy
    
    has_many :favorites, dependent: :destroy
    has_many :favorited_items, through: :favorites, source: :item_listing
    # validations

    validates :name, presence: true, uniqueness: true
    # validates :email, presence: true, uniqueness: true
    validates :password, presence: true, length: { minimum: 6 }
    before_save :set_image_url
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
  def set_image_url
    self.image_url = image.url if image.attached?
  end

end
