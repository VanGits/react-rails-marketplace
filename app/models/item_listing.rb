class ItemListing < ApplicationRecord
    belongs_to :user
    has_many :favorites , dependent: :destroy
  has_many :favorited_by_users, through: :favorites, source: :user
  
  has_many :offers, dependent: :destroy
  #validations
  validates :title, presence: true, length: {maximum: 20}
  validates :price, presence: true, numericality: { only_integer: true }
  validates :image_url, presence: true
  validates :description, presence: true
end
