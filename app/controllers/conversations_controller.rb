class ConversationsController < ApplicationController
    before_action :set_conversation, only: [:show, :update, :destroy]
  
    # GET /conversations
    def index
      @conversations = Conversation.all
      render json: @conversations
    end
  
    # GET /conversations/1
    def show
      # Check if the conversation exists and if it has any messages
      if @conversation&.messages&.exists?
        # Check if the first message in the conversation belongs to the current user
        if @conversation.messages.first.user_id == @user.id || @conversation.messages.first.recipient_id == @user.id
          # Fetch and render the messages belonging to the conversation, ordered by created_at ascending
          render json: @conversation.messages.order(created_at: :asc)
        else
          # If the current user is not part of the conversation, return an unauthorized response
          render json: { error: 'Unauthorized' }, status: :unauthorized
        end
      else
        # If the conversation doesn't exist or has no messages, return an empty array
        render json: []
      end
    end
   
    # POST /conversations
    def create
        sender_id = @user.id
        recipient_id = params[:recipient_id].to_i
    
        # Check if a conversation exists between the sender and recipient
        conversation = Conversation.find_by_participants(sender_id, recipient_id)
    
        if conversation.nil?
          # If no conversation exists, create a new one with a UUID
          conversation = Conversation.create!
        end
    
        render json: { conversation_uuid: conversation.uuid, id: conversation.id }
      end
  
    # PATCH/PUT /conversations/1
    def update
      if @conversation.update(conversation_params)
        render json: @conversation
      else
        render json: @conversation.errors, status: :unprocessable_entity
      end
    end
  
    # DELETE /conversations/1
    def destroy
      @conversation.destroy
    end
  
    private
  
    def set_conversation
      @conversation = Conversation.find(params[:id])
    end
  
    def conversation_params
      params.require(:conversation).permit(:uuid)
    end
  end