class UsersController < ApplicationController

    wrap_parameters format: []
    skip_before_action :authorize, only: :create
    def create
        user = User.new(user_params)
        user.image.attach(params[:image]) # Attach the uploaded image file to the user
      
        if user.save
           
          session[:user_id] = user.id
          render json: user, status: :created
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      end

    def show
        render json: @user
    end

    private

    def user_params
        params.permit(:name, :email, :image,:password, :password_confirmation, :location)
    end
end
