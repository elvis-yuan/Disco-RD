class ServerChannel < ApplicationCable::Channel
  def subscribed
    user = User.find(params[:user_id])
    socket = { type: "user", user: user }
    ServerChannel.broadcast_to(params[:server_id], socket)

    stream_for params[:server_id]
  end

  def channelDisappeared(data)
    channel = {id: data['id'], server_id: data['server_id'], title: data['title']}
    socket = {type: "deletedChannel", channel: channel}

    ServerChannel.broadcast_to(data['server_id'], socket)
  end

  def channelAppeared(data)
    # debugger
    channel = {id: data['id'], server_id: data['server_id'], title: data['title']}
    socket = {type: "newChannel", channel: channel}

    ServerChannel.broadcast_to(data['server_id'], socket)
  end

  def unsubscribed
  end
end 