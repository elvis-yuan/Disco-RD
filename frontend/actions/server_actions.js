import * as ServerAPI from "../util/server_api_util";
//{fetchAllServers,  fetchServer,  createServer}

export const RECEIVE_ALL_SERVERS = "RECEIVE_ALL_SERVERS";
export const RECEIVE_SERVER = "RECEIVE_SERVER";

const receiveAllServers = servers => ({
  type: RECEIVE_ALL_SERVERS,
  servers
});

const receiveServer = server => ({
  type: RECEIVE_SERVER,
  server
});

export const fetchAllServers = userId => dispatch =>
  ServerAPI.fetchAllServers(userId).then(servers => {
    dispatch(receiveAllServers(servers));
  });

export const fetchServer = id => dispatch =>
  ServerAPI.fetchServer(id).then(server => dispatch(receiveServer(server)));
