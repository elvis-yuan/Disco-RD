class Api::ChannelsController < ApplicationController

  def index
    @server = Server.find(params[:server_id])
    @channels = @server.channels

    render :index
  end

  def show 
    @channel = Channel.includes(:messages, :server).find(params[:id])
    @messages = @channel.messages
    @server = @channel.server

    render :show
  end

  def create
    @channel = Channel.new(channel_params)
    @channel.server_id = params[:server_id]
    if @channel.save
      @server = @channel.server
      @messages = @channel.messages

      render :show
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  def update
    @channel = Channel.includes(:servers, :messages).find(params[:id])
    if @channel.update(channel_params)
      @messages = @channel.messages
      @server = @channel.server
      render :show
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
    
    render :show
  end

  private
  def channel_params
    params.require(:channel).permit(:title, :server_id)
  end
end