class SessionsController < ApplicationController
    before_action :authorize
    skip_before_action :authorize, only: :create
    
    def create
        user = User.find_by(name: params[:name])

        if user&.authenticate(params[:password])
            
            session[:user_id] = user.id
           
            render json: user, status: :created
          
        else
            render json: {errors: "Invalid username or password"}, status: :unauthorized

        end


    end

    def destroy
        session.delete :user_id
        head :no_content
    end

    private 

    def authorize
        user = User.find_by(id: session[:user_id])
        render json: {error: "Not authorized"}, status: :unauthorized unless user
    end
    
end
