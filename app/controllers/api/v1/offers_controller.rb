class Api::V1::OffersController < ApplicationController
    wrap_parameters format: []
    def show
        item = find_item
        if item.user.id == @user.id
            render json: item.offers, status: :ok
        else
            render json: {error: "Not authorized"}, status: :unauthorized
        end
        
    end

    def index 
      offers = @user.offers
      render json: offers, status: :ok

    end


    def create
        item = find_item_listing
        if @user.id != item.user.id
          offer = @user.offers.build(offer_params)
          offer.item_listing = item
    
          if offer.save
            render json: offer, status: :created
          else
            render json: { error: offer.errors.full_messages }, status: :unprocessable_entity
          end
        else
          render json: { error: "You cannot send an offer for your own item listing" }, status: :unprocessable_entity
        end
      end


    private

    def find_item_listing
        ItemListing.find_by(id: params[:item_listing_id])
    end

    def find_item
        ItemListing.find_by(id: params[:id])
    end

    def offer_params
        params.permit(:contact, :price, :user_id, :item_listing_id)
    end
end
