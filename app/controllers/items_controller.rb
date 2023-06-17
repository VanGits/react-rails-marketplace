class ItemsController < ApplicationController

    def index
        items = Item.all
        render json: items, status: :ok
    end

    def show
        item = find_item
        render json: item, status: :ok
    end
    def create
        item = Item.new(item_params)
        listing = item.listings.build(user_id: @user.id)
        
        if item.save && listing.save
          render json: { message: 'Item and listing created successfully' }, status: :created
        else
          render json: { errors: item.errors.full_messages }, status: :unprocessable_entity
        end
    end
    
      private
    
      def item_params
        params.require(:item).permit(:name, :description, :image_url, :location)
      end
      def find_item
        Item.find(params[:id])
      end
end
