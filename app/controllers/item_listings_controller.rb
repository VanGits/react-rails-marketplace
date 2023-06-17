class ItemListingsController < ApplicationController

  skip_before_action :authorize, only: [:index, :show]
    def index
        items = ItemListing.all
        render json: items, status: :ok
    end

    def show
        item = find_item
        render json: item, status: :ok
    end
    def create
        item = @user.item_listings.new(item_params)
        

        if item.save
          render json: { message: 'Item and listing created successfully' }, status: :created
        else
          render json: { errors: item.errors.full_messages }, status: :unprocessable_entity
        end
    end

      private

      def item_params
        params.permit(:title, :description, :image_url, :location, :price)
      end
      def find_item
        ItemListing.find(params[:id])
      end
end
