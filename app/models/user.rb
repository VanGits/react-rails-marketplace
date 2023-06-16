class User < ApplicationRecord
    has_secure_password
    validates :name, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true
    validates :password, presence: true, length: { minimum: 6 }
    validates :image_url, presence: true
end
