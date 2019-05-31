import * as ServerAPI from "../util/server_api_util";
//{fetchAllServers,  fetchServer,  createServer}
import { RECEIVE_ERRORS } from "./session_actions";

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

export const createServer = server => dispatch =>
  ServerAPI.createServer(server).then(
    server => dispatch(receiveServer(server)),
    errors => dispatch(receiveErrors(errors))
  );

const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors
});
