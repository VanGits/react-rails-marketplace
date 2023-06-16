class Item < ApplicationRecord
    
    # associations
    has_many :listings 
    has_many :users, through: :listings 
    has_many :transactions
end
