json.users do
  @users.each do |user|
    json.set! user.id do
      json.partial! 'api/users/user', user: user
      json.authored_messages []
    end
  end
end
json.server do 
  json.partial! 'api/servers/server', server: @server
  json.channels []
  json.connect_users []
end
json.channels do 
  @channels.each do |channel|
    json.set! channel.id do
      json.partial! 'api/channels/channel', channel: channel
      json.messages []
    end
  end
end
