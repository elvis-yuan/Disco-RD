class ServerChannel < ApplicationCable::Channel
  def subscribed
    stream_for params[:server_id]
  end

  def findUser(data)
    server = data['server_id']
    user = User.find(data['user_id'])
    socket = { type: "user", user: user }
    
    ServerChannel.broadcast_to(server, socket)
  end

  def unsubscribed
  end
end 