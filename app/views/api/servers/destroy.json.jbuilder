@servers.each do |server|
  json.set! server.id do
    json.partial! 'api/servers/server', server: server
  end
end


json.channels do
  @channels.each do |channel|
    json.set! channel.id do 
      json.partial! 'api/channels/channel', channel: channel
    end
  end
end