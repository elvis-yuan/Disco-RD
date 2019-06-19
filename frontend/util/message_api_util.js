export const fetchMessages = channelId =>
  $.ajax({ method: "GET", url: `api/channels/${channelId}/messages` });

export const createDm = data =>
  $.ajax({
    method: "POST",
    url: `api/servers/${data.server_id}/channels/directmessage`,
    data: { username: data.username }
  });
