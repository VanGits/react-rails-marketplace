class Api::V1::ItemListingsController < ApplicationController

  skip_before_action :authorize, only: [:index, :show, :topFour]
  def index
    if params[:search].present?
      search_query = params[:search].downcase
      items = ItemListing.where("LOWER(title) LIKE ?", "%#{search_query}%")
    else
      items = ItemListing.all
    end
  
    render json: items.order(created_at: :desc), status: :ok
  end

  def topFour
    top_items = ItemListing.all.order(price: :desc).limit(4)
    render json: top_items, status: :ok
  end

    def userIndex
      items = @user.item_listings.all.order(created_at: :desc)
      render json: items, status: :ok
    end

    def show
     
        item = find_item
        
        render json: item, status: :ok
    end

    def protected_show
      
      item = find_item
      
      if item.user.id === @user.id
        render json: item, status: :ok
      else
        render json: {error: "Not authorized"}, status: :unauthorized
      end

    end
    def create
 
      item = @user.item_listings.new(item_params)
      item.image.attach(params[:image]) # Attach the uploaded image file to the item
     
      if item.save
        
    
        render json: item, status: :created
      else
        render json: { errors: item.errors.full_messages }, status: :unprocessable_entity
      end
    end
    def update
      item = find_item
      if @user.id == item.user.id
        if item.update(item_params)
          render json: item, status: :ok
        else
          render json: { errors: item.errors.full_messages }, status: :unprocessable_entity
        end
      else
        render json: { error: "You are not authorized to update this listing" }, status: :unauthorized
      end
      
    end

    def destroy
      item = find_item
      if @user.id === item.user.id
        item.destroy
        head :no_content
      else
        render json: { error: "You are not authorized to delete this listing" }, status: :unauthorized
      end
    end

      private

      def item_params
        params.permit(:title, :description, :location, :price, :image, :user_id)
      end
      def find_item
        ItemListing.find(params[:id])
      end
end
