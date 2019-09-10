class ChatChannel < ApplicationCable::Channel
  def subscribed
    user = User.find(params[:user_id])
    newUser = {id: user.id, username: user.username, email: user.email, direct_message_id: user.direct_message_id}
    socket = { type: "user", user: newUser }
    ChatChannel.broadcast_to(params[:channel_id], socket)
    
    stream_for params[:channel_id]
  end

  def speak(data)
    message = Message.create(body: data['body'], user_id: data['user_id'], channel_id: data['channel_id'])
    socket = { type: "message", message: {body: message.body, user_id: message.user_id, channel_id: message.channel_id, created_at: message.created_at, updated_at: message.updated_at}}

    ChatChannel.broadcast_to(data['channel_id'], socket)
  end

  def typing(data)
    ChatChannel.broadcast_to(data['channel_id'], {type: 'typing', user_id: data['user_id']})
  end

  def unsubscribed
  end
end
