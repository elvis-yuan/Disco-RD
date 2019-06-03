class Api::ChannelsController < ApplicationController

  def index

    @server = Server.find(params[:server_id])
    @channels = @server.channels
    render :index
  end

  def show 
    @channel = Channel.includes(:message).find(params[:id])
    @messages = @channel.messages
    render :show
  end

  def create
    @channel = Channel.new(channel_params)
    @channel.server_id = params[:server_id]
    if @channel.save
      @server = @channel.server
      render :show
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  def update
    @channel = Channel.find(params[:id])
    if @channel.update(channel_params)
      @server = @channel.server
      render :show
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  def destroy
    @channel = Channel.includes(:server).find(params[:id])
    @server = @channel.server
    @channel.destroy
    @channels = @server.channels
    render :show
  end

  private
  def channel_params
    params.require(:channel).permit(:title, :server_id)
  end
end