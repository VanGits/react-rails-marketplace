class Api::V1::OffersController < ApplicationController
 
    def show
        item = find_item
        user = User.find_by(id: session[:user_id])
        if item.user.id == user.id
            render json: item.offers, status: :ok
        else
            render json: {error: "Not authorized"}, status: :unauthorized
        end
        
    end

    def index 
      user = User.find_by(id: session[:user_id])
      offers = user.offers
      render json: offers, status: :ok

    end


    def create
        item = find_item_listing
        user = User.find_by(id: session[:user_id])
        if user.id != item.user.id
          offer = user.offers.build(offer_params)
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
    def authorize
      user = User.find_by(id: session[:user_id])
      render json: {error: "Not authorized"}, status: :unauthorized unless user
  end
end
