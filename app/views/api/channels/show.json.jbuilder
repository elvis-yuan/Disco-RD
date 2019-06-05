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

json.users do 
  message_hash = Hash.new(0)
  @messages.each {|message| message_hash[message.user_id] += 1}
  user_hash = Hash.new(0)
  @users.each {|user| user_hash[user.id] = user}
  message_authors = message_hash.keys.map{|user_id| user_hash[user_id]}
  message_authors.each do |user|
    json.set! user.id do 
      json.extract! user, :id, :username, :email
    end
  end
end
