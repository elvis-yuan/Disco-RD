json.server do
  json.partial! 'api/servers/server', server: @server
end

json.channel do
  json.partial! 'api/channels/channel', channel: @channel
end