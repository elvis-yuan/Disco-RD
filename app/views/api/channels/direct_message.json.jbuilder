json.user do 
  json.partial! '/api/users/user', user: @user
end

json.channel do
  json.partial! 'api/channels/channel', channel: @channel
end

json.server do 
  json.extract! @server, :id, :title, :admin_id, :channel_ids, :dm_ids
end