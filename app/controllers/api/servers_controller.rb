class Api::ServersController < ApplicationController
  # before_action :ensure_logged_in

  INVITATION_CODE = (('a'..'z').to_a + (1..9).to_a + ("A".."Z").to_a)

  def index
    # @user = User.includes(:servers).find(params[:user_id])
    @servers = current_user.servers

    render :index
  end

  def create
    @server = Server.new(server_params)
    @server.invitation_code = INVITATION_CODE.sample(8).join
    @server.admin_id = current_user.id
    if @server.save
      @server.channels.create(title: "general")
      @server.user_servers.create(user_id: current_user.id)
      @channels = @server.channels
      @users = @server.connected_users
      
      render :show
    else
      render json: @server.errors.full_messages, status: 422
    end
  end

  def show
    @server = Server.includes(:channels, :connected_users, :user_servers).find(params[:id])
    @channels = @server.channels
    @users = @server.connected_users

    render :show
  end

  def update
    @server = Server.includes(:channels, :connected_users).find(params[:id])
    if @server.update(server_params)
      @channels = @server.channels
      @users = @server.connected_users

      render :show
    else
      render json: @server.errors.full_messages, status: 422
    end
  end

  def destroy
    @server = Server.includes(:channels, :connected_users).find(params[:id])
    if @server.admin_id == current_user.id
      @server.destroy
      @servers = current_user.servers
      @channels = @server.channels
    
      render :index
    else
      render json: "you are not an admin", status: 422
    end
  end

  def join
    errors = []
    errors.concat(['empty'])if params[:server][:invitation_code] === ""
    
    @server = Server.includes(:channels, :connected_users).find_by(invitation_code: params[:server][:invitation_code])

    if @server.connected_users.include?(current_user)
      render json: ['already joined the server'], status: 422
    elsif @server 
      @server.user_servers.create!(user_id: current_user.id, server_id: @server.id)
      @channels = @server.channels
      @users = @server.connected_users

      render :show
    elsif errors.length > 0
      render json: errors, status: 422
    elsif @server.nil?
      errors.concat(['no server found']) 
      render json: errors, status: 422
    else
      render json: ['already joined the server'], status: 422
    end
  end

  def leave
    @server = Server.includes(:user_servers).find(params[:id])
    @server.user_servers.find_by(user_id: current_user.id).destroy
    @servers = current_user.servers

    render :index
  end

  private 
  def server_params
    params.require(:server).permit(:title, :icon_url, :public, :invitation_code)
  end
end