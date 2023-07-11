class UsersController < ApplicationController

    wrap_parameters format: []
    before_action :authorize
    skip_before_action :authorize, only: :create
    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created

    end

    def show
        render json: @user
    end

    private

    def user_params
        params.permit(:name, :email, :image_url,:password, :password_confirmation, :location)
    end
    def authorize
    user = User.find_by(id: session[:user_id])
    render json: {error: "Not authorized"}, status: :unauthorized unless user
    end
end
