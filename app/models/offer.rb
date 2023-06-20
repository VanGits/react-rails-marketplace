class Offer < ApplicationRecord
    belongs_to :user
    belongs_to :item_listing

    #validations

    validates :price, presence: true, numericality: true
    validates :contact, presence: true, format: { with: /\A([\w+\-.]+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z|\A\d{10}\z)/i }
end
