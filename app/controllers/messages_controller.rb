class MessagesController < ApplicationController
  
  before_action :set_message, only: %i[ show update destroy ]

  # GET /messages
  def index
    # Find all messages where the recipient_id is equal to the current user's ID
    received_messages = Message.where(recipient_id: @user.id)

    # Extract unique sender IDs from the received messages
    sender_ids = received_messages.distinct.pluck(:user_id)

    # Find the users who sent the messages to the current user
    senders = User.where(id: sender_ids)

    # Prepare the response data as a hash with sender_id as the key
    messages_data = Hash.new { |hash, key| hash[key] = [] }

    received_messages.each do |message|
      sender_info = senders.find { |sender| sender.id == message.user_id }

      message_data = {
        id: message.id,
        body: message.body,
        sent_by: sender_info, # Include the entire sender object
        sent_to: @user,       # Include the entire current user object
        created_at: message.created_at
      }

      # Group the message data by sender_id
      messages_data[message.user_id] << message_data
    end

    render json: messages_data.values, status: :ok
  end

  # GET /messages/1
  def show
    render json: @message
  end

  # POST /messages
  def create
    # Get the recipient_id from the request parameters
    recipient_id = params[:recipient_id].to_i
  
    # Check if a conversation exists between the sender and recipient
    conversation = Conversation.find_by_participants(@user.id, recipient_id)
  
    if conversation.nil?
      # If no conversation exists, create a new one with a UUID
      conversation = Conversation.create!
    end
  
    # Create a new message record associated with the conversation
    message = @user.messages.new(
      body: params[:body],
      recipient_id: params[:recipient_id],
      user_id: params[:user_id],
      conversation_id: params[:conversation_id]
    )
  
    # Save the message to the database
    if message.save
    
      ActionCable.server.broadcast("chat_#{conversation.id}", MessageSerializer.new(message))
  
      render json: message, status: :created
    else
      render json: { error: "Failed to create message" }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /messages/1
  def update
    if @message.update(message_params)
      render json: @message
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end

  # DELETE /messages/1
  def destroy
    @message.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_message
      @message = Message.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def message_params
      params.require(:message).permit(:body)
    end
end
