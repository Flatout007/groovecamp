class Api::UsersController < ApplicationController

    def create
        @user = User.new(params.require(:user).permit(:username, :password, :artist_check))

        if @user.save === false 
            render json: @user.errors.full_messages, status: 422
         else
           sign_in!(@user)
           render "api/users/show"
        end
    end
end
