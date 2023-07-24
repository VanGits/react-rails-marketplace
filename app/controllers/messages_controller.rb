class MessagesController < ApplicationController
  
  before_action :set_message, only: %i[ show update destroy ]

  # GET /messages
  def index
    @messages = Message.all

    render json: @messages
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
