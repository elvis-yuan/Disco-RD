class Api::ChannelsController < ApplicationController

  def index
    @server = Server.find(params[:server_id])
    @channels = @server.channels

    render :index
  end

  def show 
    @channel = Channel.includes(:messages, :server).find(params[:id])
    @messages = @channel.messages.limit(30).order(created_at: :desc)
    @server = @channel.server
    @users = User.all

    render :show
  end

  def create
    @channel = Channel.new(channel_params)
    @channel.server_id = params[:server_id]
    if @channel.save
      @server = @channel.server
      @messages = @channel.messages
      
      render :create
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  def update
    @channel = Channel.includes(:server, :messages).find(params[:id])
    if @channel.update(channel_params)
      @messages = @channel.messages
      @server = @channel.server

      render :create
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  def destroy
    @channel = Channel.includes(:server, :messages).find(params[:id])
    @server = @channel.server
    @messages = @channel.messages
    @channel.destroy
    @channels = @server.channels
    
    render :create
  end

  def directmessage
    errors = []
    errors << 'yourself' if params[:username] == current_user.username
    @user = User.find_by(username: params[:username])

    if !errors.empty?
      render json: errors, status: 422
    elsif @user
      @oldchannel = Channel.find_by(server_id: current_user.direct_message_id, dm_id: @user.direct_message_id) || 
      Channel.find_by(server_id: @user.direct_message_id, dm_id: current_user.direct_message_id)

      if @oldchannel
        render json: ['already exists'], status: 422
      else 
        @channel = Channel.new(title: current_user.username, server_id: current_user.direct_message_id, dm_id: @user.direct_message_id)
        if @channel.save
          @server = Server.find(current_user.direct_message_id)
          render :direct_message
      # @channel = Channel.new(channel_params)
      # @channel.server_id = params[:server_id]
      # @channel.dm_id = params[:dm_id]
        end
      end
    else
      render json: ['no user'], status: 422
    end

  end

  def getMessages
    @channel = Channel.includes(:messages.find(params[:id]))
    @messages = @channel.messages.limit(30).order(created_at: :desc)

    render :show
  end

  private
  def channel_params
    params.require(:channel).permit(:title, :server_id, :dm_id)
  end
end