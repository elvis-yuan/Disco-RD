class Api::UsersController < ApplicationController
    def create
        errors = []
        errors.concat(['username']) if params[:user][:username] == ""
        errors.concat(['password']) if params[:user][:password] == ""
        errors.concat(['email']) if params[:user][:email] == ""

        @user = User.new(user_params)
        
        if @user.save
            @direct_message_id = @user.created_servers.create(title: @user.username, invitation_code: SecureRandom.urlsafe_base64(8))
            @user.direct_message_id = @direct_message_id.id
            login!(@user)

            render :create
        elsif !errors.empty?
            render json: errors, status: 422
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    def show
        @user = User.find(params[:id])
        @alias = @user.user_servers
        render :show
    end

    private

    def user_params
        params.require(:user).permit(:username, :password, :email)
    end
end