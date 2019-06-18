json.messages do 
  @messages.each do |message|
    json.set! message.id do
      json.extract! message, :id, :body, :channel_id, :user_id, :created_at, :updated_at
    end
  end
end

json.channel do 
  json.extract! @channel, :id, :server_id, :title, :message_ids, :dm_id
end