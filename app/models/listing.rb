class Listing < ApplicationRecord

    # associations (join table)
    belongs_to :user 
    belongs_to :item


end
