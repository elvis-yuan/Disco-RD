import * as ServerAPI from "../util/server_api_util";
//{fetchAllServers,  fetchServer,  createServer}
import { RECEIVE_ERRORS } from "./session_actions";

export const RECEIVE_ALL_SERVERS = "RECEIVE_ALL_SERVERS";
export const RECEIVE_SERVER = "RECEIVE_SERVER";
export const REMOVE_SERVER = "REMOVE_SERVER";
export const LEAVE_SERVER = "LEAVE_SERVER";
export const RECEIVE_DM = "RECEIVE_DM";
export const DELETE_SERVER = "DELETE_SERVER"

const receiveAllServers = servers => ({
  type: RECEIVE_ALL_SERVERS,
  servers
});

export const receiveServer = payload => ({
  type: RECEIVE_SERVER,
  server: payload
});

const removeServer = payload => ({
  type: REMOVE_SERVER,
  servers: payload
});

const receiveErrors = errors => {
  return {
    type: RECEIVE_ERRORS,
    errors
  };
};

const receiveDm = server => ({
  type: RECEIVE_DM,
  server
});

export const serverDisappeared = server => ({
  type: DELETE_SERVER,
  server
})

export const fetchDm = () => dispatch =>
  ServerAPI.fetchDm().then(server => dispatch(receiveDm(server)));

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
  ServerAPI.updateServer(server).then(
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

export const leaveServer = serverId => dispatch =>
  ServerAPI.leaveServer(serverId).then(servers =>
    dispatch(receiveAllServers(servers))
  );
