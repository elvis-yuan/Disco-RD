export const fetchAllChannels = serverId =>
  $.ajax({
    method: "GET",
    url: `api/servers/${serverId}/channels`
  });

export const fetchChannel = id =>
  $.ajax({
    method: "GET",
    url: `api/channels/${id}`
  });

export const createChannel = channel =>
  $.ajax({
    method: "POST",
    url: `api/servers/${channel.server_id}`,
    data: { channel }
  });
