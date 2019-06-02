export const fetchAllServers = userId => {
  return $.ajax({
    method: "GET",
    url: `api/users/${userId}/servers`
  });
};

export const fetchServer = id =>
  $.ajax({
    method: "GET",
    url: `api/servers/${id}`
  });

export const createServer = server =>
  $.ajax({
    method: "POST",
    url: `api/servers`,
    data: { server }
  });

export const updateServer = server =>
  $.ajax({
    method: "PATCH",
    url: `api/servers/${server.id}`,
    data: { server }
  });

export const joinServer = server =>
  $.ajax({
    method: "POST",
    url: `api/servers/join`,
    data: { server }
  });

export const leaveServer = server =>
  $.ajax({
    method: "DELETE",
    url: `api/servers/leave`,
    data: {server}
  });

export const deleteServer = serverId =>
  $.ajax({
    method: "DELETE",
    url: `api/servers/${serverId}`
  });
