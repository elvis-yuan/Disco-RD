class Api::SessionsController < ApplicationController
    def create
        errors = []
        errors.concat(['username']) if params[:user][:username] == ""
        errors.concat(['password']) if params[:user][:password] == ""

        @user = User.find_by_credentials(params[:user][:username], params[:user][:password])

        if @user
            login!(@user)
            render :create
        elsif !errors.empty?
            render json: errors, status: 422
        else
            render json: ['Invalid Username or Password'], status: 422
        end
    end

    def destroy
        if current_user
            logout!

            render json: {}
        else
            render json: "Cannot logout if not logged in", status: 404
        end
    end
end