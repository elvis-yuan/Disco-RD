json.user do 
  json.partial! '/api/users/user', user: @user
end

json.channel do
  json.partial! 'api/channels/channel', channel: @channel
end