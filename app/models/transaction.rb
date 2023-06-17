class Transaction < ApplicationRecord
    belongs_to :buyer, class_name: 'User'
belongs_to :seller, class_name: 'User' 
belongs_to :item_listing

end
