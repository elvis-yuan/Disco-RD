json.server do
  json.extract! @server, :id, :title, :admin_id, :channel_ids, :dm_ids
end

json.channels do
  @channels.each do |channel|
    json.set! channel.id do 
      json.partial! 'api/channels/channel', channel: channel
    end
  end
end

json.users do 
  dm_ids = []
  @channels.each{|channel| (dm_ids << channel.server_id) && (dm_ids << channel.dm_id)}
  @users.each do |user|
    if dm_ids.include?(user.direct_message_id)
      json.set! user.id do
       json.partial! 'api/users/user', user: user 
      end
    end
  end
end