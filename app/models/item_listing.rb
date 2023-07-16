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
  def set_image_url
    if image.attached?
      self.image_url = image.url(expire_at: 1.year.from_now)
    end
  end
  def validate_image_presence
    errors.add(:image, "must be attached") unless image.attached?
  end
end
