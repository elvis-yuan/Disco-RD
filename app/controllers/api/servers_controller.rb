class Api::ServersController < ApplicationController
  # before_action :ensure_logged_in

  INVITATION_CODE = (('a'..'z').to_a + (1..9).to_a + ("A".."Z").to_a)

  def index
    @user = User.includes(:servers).find(params[:user_id])
    @servers = @user.servers
    render :index
  end

  def create
    @server = Server.new(server_params)
    @server.invitation_code = INVITATION_CODE.sample(8).join
    @server.admin_id = current_user.id
    if @server.save
      render :show
    else
      render json: @server.errors.full_messages, status: 422
    end
  end

  def show
    @server = Server.includes(:channels, :messages, :users, :user_servers).find(params[:id])
    @channels = @server.channels
    @messages = @server.messages
    @users = @server.users
    render :show
  end

  def update
    @server = Server.find(params[:id])
    if @server.update(server_params)
      render :show
    else
      render json: @server.errors.full_messages, status: 422
    end
  end

  def delete
    @server = Server.find_by(params[:id])
    @server.delete
    render :show
  end

  private 
  def server_params
    params.require(:server).permit(:title, :icon_url, :public)
  end
end