class ItemListing < ApplicationRecord
  has_one_attached :image
    belongs_to :user
    has_many :favorites , dependent: :destroy
  has_many :favorited_by_users, through: :favorites, source: :user
  
  has_many :offers, dependent: :destroy
  #validations
  validates :title, presence: true, length: {maximum: 20}
  validates :price, presence: true, numericality: { only_integer: true }
  validate :validate_image_presence
  validates :description, presence: true
  before_save :set_image_url

  private
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
  def validate_image_presence
    errors.add(:image, "must be attached") unless image.attached?
  end
end
