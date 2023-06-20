class ItemListing < ApplicationRecord
    belongs_to :user
    has_many :favorites
  has_many :favorited_by_users, through: :favorites, source: :user
  
  has_many :offers
  #validations
  validates :title, presence: true, length: {maximum: 20}
  validates :price, presence: true
  validates :image_url, presence: true
  validates :description, presence: true
end
