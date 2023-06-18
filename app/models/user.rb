class User < ApplicationRecord
    has_secure_password

    # associations
    has_many :item_listings
    
    has_many :transactions, foreign_key: :buyer_id 
    has_many :sold_items, through: :transactions, source: :item
    has_many :favorites
  has_many :favorited_items, through: :favorites, source: :item
    # validations

    validates :name, presence: true, uniqueness: true
    # validates :email, presence: true, uniqueness: true
    validates :password, presence: true, length: { minimum: 6 }
    validates :image_url, presence: true
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
