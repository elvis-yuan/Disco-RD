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
    @channel = Channel.new(channel_params)

  end

  private
  def channel_params
    params.require(:channel).permit(:title, :server_id, :dm_id)
  end
end