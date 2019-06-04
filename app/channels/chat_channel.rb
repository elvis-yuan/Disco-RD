class ChatChannel < ApplicationCable::Channel
  def subscribed
    # debugger
    user = User.find(params[:user_id])
    socket = { type: "user", user: user }
    ChatChannel.broadcast_to(params[:channel_id], socket)
    
    stream_for params[:channel_id]
  end

  def speak(data)
    message = Message.create(body: data['body'], user_id: data['user_id'], channel_id: data['channel_id'])
    socket = { type: "message", message: {body: message.body, user_id: message.user_id, channel_id: message.channel_id, created_at: message.created_at, updated_at: message.updated_at}}

    ChatChannel.broadcast_to(data['channel_id'], socket)
  end

  # def findUser(data)
  #   user = User.find(data['user_id'])
  #   socket = { type: "user", user: user }
  #   debugger
  #   ChatChannel.broadcast_to('chat_channel', socket)
  # end

  def unsubscribed
  end
end
