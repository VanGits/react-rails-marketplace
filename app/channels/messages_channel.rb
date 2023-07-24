class MessagesChannel < ApplicationCable::Channel
  def subscribed
    conversation = Conversation.find_by(id: params[:conversation_id])

    if conversation
      stream_from "chat_#{conversation.id}"
      puts "Subscribed to channel: chat_#{conversation.id}"
    else
      puts "Conversation not found with ID: #{params[:conversation_id]}"
    end
  end

  def unsubscribed
    stop_all_streams
    puts "Unsubscribed from MessagesChannel"
  end
end
