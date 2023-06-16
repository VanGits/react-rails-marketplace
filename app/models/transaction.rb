class Transaction < ApplicationRecord

    # associations

    belongs_to :buyer, class_name: 'User'
    belongs_to :seller, class_name: 'User' 
    belongs_to :item 

end
