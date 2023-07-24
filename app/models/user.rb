class User < ApplicationRecord
    has_secure_password
    has_one_attached :image
    # associations
    has_many :item_listings, dependent: :destroy
    has_many :offers, dependent: :destroy
    has_many :messages, dependent: :destroy
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
  require 'uri'

  def set_image_url
    if image.attached?
      signed_url = image.url
      image_url_auth = signed_url
      self.image_url = generate_public_url(signed_url)
    end
  end
  
  def generate_public_url(signed_url)
    uri = URI.parse(signed_url)
    public_url = "#{uri.scheme}://#{uri.host}#{uri.path}"
    public_url
  end

end
