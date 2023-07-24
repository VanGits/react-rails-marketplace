class Conversation < ApplicationRecord
  has_many :messages

  before_create :generate_uuid

  def self.find_by_participants(user_id, recipient_id)
    conversation = joins(:messages)
                   .where("(user_id = :user_id AND recipient_id = :recipient_id) OR (user_id = :recipient_id AND recipient_id = :user_id)",
                          user_id: user_id, recipient_id: recipient_id)
                   .first

    # Return the conversation only if it has messages
    conversation if conversation&.messages&.any?
  end

  private

  def generate_uuid
    self.uuid ||= SecureRandom.uuid
  end
end