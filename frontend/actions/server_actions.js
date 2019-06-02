import * as ServerAPI from "../util/server_api_util";
//{fetchAllServers,  fetchServer,  createServer}
import { RECEIVE_ERRORS } from "./session_actions";

export const RECEIVE_ALL_SERVERS = "RECEIVE_ALL_SERVERS";
export const RECEIVE_SERVER = "RECEIVE_SERVER";
export const REMOVE_SERVER = "REMOVE_SERVER";
export const LEAVE_SERVER = "LEAVE_SERVER";

const receiveAllServers = servers => ({
  type: RECEIVE_ALL_SERVERS,
  servers
});

const receiveServer = action => ({
  type: RECEIVE_SERVER,
  server: action
});

const removeServer = action => ({
  type: REMOVE_SERVER,
  servers: action
});

const quitServer = action => ({
  type: LEAVE_SERVER,
  server: action
});

const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors
});

export const fetchAllServers = userId => dispatch =>
  ServerAPI.fetchAllServers(userId).then(servers => {
    dispatch(receiveAllServers(servers));
  });

export const fetchServer = id => dispatch =>
  ServerAPI.fetchServer(id).then(server => dispatch(receiveServer(server)));

export const createServer = server => dispatch =>
  ServerAPI.createServer(server).then(
    server => dispatch(receiveServer(server)),
    errors => dispatch(receiveErrors(errors))
  );

export const updateServer = server => dispatch =>
  ServerAPI.createServer(server).then(
    server => dispatch(receiveServer(server)),
    errors => dispatch(receiveErrors(errors))
  );

export const deleteServer = serverId => dispatch =>
  ServerAPI.deleteServer(serverId).then(servers =>
    dispatch(removeServer(servers))
  );

export const joinServer = server => dispatch =>
  ServerAPI.joinServer(server).then(
    server => dispatch(receiveServer(server)),
    errors => dispatch(receiveErrors(errors))
  );

export const leaveServer = server => dispatch =>
  ServerAPI.leaveServer(server).then(server => dispatch(quitServer(server)));
