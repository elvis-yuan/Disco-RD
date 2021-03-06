import React from "react";
import { Link, NavLink } from "react-router-dom";
import ServerIconContainer from "./server_icon_container";
import { openModal } from "../../../actions/modal_actions";

class ServerIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.createServerSockets();
    this.createPresenceSocket();
  }

  componentDidUpdate(prevProps) {
    const prevSockets = Object.values(prevProps.servers).map(
      server => server.id
    );

    const currentSockets = Object.values(this.props.servers).map(
      server => server.id
    );

    let exisitingSockets = [];
    let deleteSockets = [];
    let newSockets = [];

    const previousChannel = prevProps.match.params.channelId;
    const currentChannel = this.props.match.params.channelId;
    const history = this.props.history;

    if (prevSockets.length > 0) {
      prevSockets.forEach(server =>
        currentSockets.includes(server)
          ? exisitingSockets.push(server)
          : deleteSockets.push(server)
      );
    }

    if (this.props.prevUser !== this.props.currentUser) {
      exisitingSockets = [];
      deleteSockets = [];
      newSockets = [];
    }

    currentSockets.forEach(server => {
      if (!prevSockets.includes(server)) newSockets.push(server);
    });

    deleteSockets.forEach(server_id => {
      App.server[server_id].unsubscribe();
    });

    newSockets.forEach(server_id => {
      App.server[server_id] = App.cable.subscriptions.create(
        {
          channel: "ServerChannel",
          server_id: server_id,
          user_id: this.props.currentUser
        },
        {
          received: data => {
            if (data.type === "user") {
              this.props.receiveData(data);
            }
            if (data.type === "deleteUser") {
              this.props.removeData(data);
            }
            if (data.type === "newChannel") {
              this.props.channelAppeared(data.channel);
            }
            if (data.type === "deletedChannel") {
              if (
                parseInt(history.location.pathname.split("/")[3]) ===
                data.channel.id
              ) {
                history.push(`/servers/${data.channel.server_id}`);
              }
              this.props.channelDisappeared(data.channel);
            }
            if (data.type === "deleteServer") {
              if (
                parseInt(history.location.pathname.split("/")[2]) ===
                data.server.id
              ) {
                history.push("/servers/@me");
              }
              this.props.serverDisappeared(data.server);
            }
            if (data.type === "updateServer") {
              this.props.receiveServer(data.payload);
            }
          },
          channelAppeared: function(data) {
            return this.perform("channelAppeared", data);
          },
          channelDisappeared: function(data) {
            return this.perform("channelDisappeared", data);
          },
          deleteUser: function(data) {
            return this.perform("deleteUser", data);
          },
          deleteServer: function(data) {
            return this.perform("deleteServer", data);
          },
          updateServer: function(data) {
            return this.perform("updateServer", data);
          }
        }
      );
    });
  }

  componentWillUnmount() {
    if (App.cable.subscriptions.subscriptions.length > 0) {
      App.cable.subscriptions.subscriptions.forEach(sub => sub.unsubscribe());
    }
  }

  createPresenceSocket() {
    App.cable.subscriptions.create(
      {
        channel: "PresenceChannel",
        user_id: this.props.currentUser
      },
      {
        received: data => {
          switch (data.type) {
            case "CO_USER":
              if (this.props.users[data.user]) this.props.coUser(data.user);
              break;
            case "DC_USER":
              if (this.props.users[data.user]) this.props.dcUser(data.user);
              break;
            default:
              return null;
          }
        }
      }
    );
  }

  createServerSockets() {
    App.server[this.props.directMessageId] = App.cable.subscriptions.create(
      {
        channel: "ServerChannel",
        server_id: this.props.directMessageId,
        user_id: this.props.currentUser
      },
      {
        received: data => {
          if (data.type === "user") {
            this.props.receiveUser(data.user);
          }
          if (data.type === "newChannel") {
            this.props.channelAppeared(data.channel);
          }
          if (data.type === "deletedChannel") {
            if (previousChannel === data.channel.id) {
              history.push(`/servers/${data.channel.server_id}`);
            }
            this.props.channelDisappeared(data.channel);
          }
          if (data.type === "deleteServer") {
            if (
              parseInt(history.location.pathname.split("/")[2]) ===
              data.server.id
            ) {
              this.props.serverDisappeared(data.server);
              history.push("/servers/@me");
            }
          }
          if (data.type === "newDirectMessage") {
            this.props.newDM(data);
          }
          if (data.type === "videoCall") {
            if (!this.props.videoCall) {
              this.props.receiveVideoCall(data.payload);
              this.props.openModal();
            }
          }
        },
        channelAppeared: function(data) {
          return this.perform("channelAppeared", data);
        },
        channelDisappeared: function(data) {
          return this.perform("channelDisappeared", data);
        },
        deleteServer: function(data) {
          return this.perform("deleteServer", data);
        },
        deleteUser: function(data) {
          return this.perform("deleteUser", data);
        },
        newDirectMessage: function(data) {
          return this.perform("newDirectMessage", data);
        },
        videoCall: function(data) {
          return this.perform("videoCall", data);
        }
      }
    );
  }

  render() {
    const { servers, modalOpen, history, fetchServer } = this.props;
    const serverValues = servers ? Object.values(servers) : [];

    const serverList =
      serverValues.length > 0
        ? serverValues.map((server, index) => (
            <ServerIconContainer server={server} key={index} />
          ))
        : null;
    const selected = history.location.pathname.includes("/servers/@me")
      ? "selected"
      : "";

    const selectedServer = modalOpen ? "selected-server-green-icon" : "";

    let selectedGreen = modalOpen ? "selected-green" : "";

    return (
      // <div className="server-index-wrapper">
      <div className="server-index-container">
        <div className="server-index-scroller-wrapper">
          <div className="server-margin-wrapper">
            <NavLink
              className="button-flex server-btn blue-btn"
              to={`/servers/@me`}
              activeClassName={selected}
            >
              <img
                className="default-icon"
                src="https://i.ibb.co/42kLm6j/discord.png"
              />
              <div className="server-selector" />
            </NavLink>
          </div>
          <div className="server-seperator" />
          <ul className="server-ul">
            {serverList}
            <div className="server-icon-wrapper">
              <div className="server-margin-wrapper">
                <a
                  className={`btn-flex server-btn ${selectedGreen}`}
                  onClick={this.props.mainModal}
                >
                  <div className={`server-selector ${selectedServer}`} />
                  <h3 className="server-icon">+</h3>
                </a>
              </div>
              <p className="server-btn-hover">Add a Server</p>
            </div>
            <div className="logout-seperator" />
            <div className="server-icon-wrapper">
              <div className="server-margin-wrapper">
                <a className="server-btn" onClick={this.props.logoutModal}>
                  <div className="server-selector" />
                  <i className="fas fa-sign-out-alt" />
                </a>
              </div>
              <p className="server-btn-hover">Logout</p>
            </div>
          </ul>
        </div>
      </div>
    );
  }
}

export default ServerIndex;
