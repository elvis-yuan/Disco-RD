class Api::MessagesController < ApplicationController
  def index
    @channel = Channel.includes(:messages).find(params[:channel_id])
    @messages = @channel.messages

    render :index
  end
end