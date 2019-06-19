class ServerChannel < ApplicationCable::Channel
  def subscribed
    user = User.find(params[:user_id])
    newUser = {id: user.id, username: user.username, email: user.email}
    socket = { type: "user", user: newUser, server_id: params[:server_id] }

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
    channel = {id: data['id'], server_id: data['server_id'], title: data['title'], message_ids: []}
    socket = {type: "newChannel", channel: channel}

    ServerChannel.broadcast_to(data['server_id'], socket)
  end

  def deleteUser(data)
    user = data['user']
    socket = {type: 'deleteUser', server_id: data['server_id'], user: data['user']}

    ServerChannel.broadcast_to(data['server_id'], socket)
  end

  def deleteServer(data)
    server = data['server']
    socket = {type: 'deleteServer', server: server}

    ServerChannel.broadcast_to(server.id, socket)
  end

  def unsubscribed
  end
end 