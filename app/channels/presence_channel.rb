class PresenceChannel < ApplicationCable::Channel
  def subscribed
    stream_for "presence_channel"
    user = User.find(params[:user_id])
    user.active = true
    user.save
    
    PresenceChannel.broadcast_to("presence_channel", {type: "CO_USER", user: user.id})
  end

  def unsubscribed
    user = User.find(params[:user_id])
    user.active = false
    user.save
    
    PresenceChannel.broadcast_to("presence_channel", {type: "DC_USER", user: user.id})
  end
end