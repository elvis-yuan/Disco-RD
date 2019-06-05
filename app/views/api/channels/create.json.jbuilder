json.server do
  json.partial! 'api/servers/server', server: @server
end

json.channel do
  json.partial! 'api/channels/channel', channel: @channel
end

json.messages do 
  @messages.each do |message|
    json.set! message.id do
      json.extract! message, :id, :body, :channel_id, :user_id, :created_at, :updated_at
    end
  end
end