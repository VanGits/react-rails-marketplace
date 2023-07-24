class MessageSerializer < ActiveModel::Serializer
  belongs_to :user
  belongs_to :conversation
  attributes :id, :body
end
