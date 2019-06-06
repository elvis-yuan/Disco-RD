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
  }

  componentDidUpdate(prevProps) {
    const prevSockets = Object.values(prevProps.servers).map(
      server => server.id
    );

    const currentSockets = Object.values(this.props.servers).map(
      server => server.id
    );

    const exisitingSockets = [];
    const deleteSockets = [];
    const newSockets = [];

    const previousChannel = prevProps.match.params.channelId;
    const currentChannel = this.props.match.params.channelId;
    const history = this.props.history;

    prevSockets.forEach(server =>
      currentSockets.includes(server)
        ? exisitingSockets.push(server)
        : deleteSockets.push(server)
    );

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
          },
          channelAppeared: function(data) {
            return this.perform("channelAppeared", data);
          },
          channelDisappeared: function(data) {
            return this.perform("channelDisappeared", data);
          }
        }
      );
    });
  }

  createServerSockets() {
    const serverList = Object.values(this.props.servers);
    if (serverList.length > 0) {
      serverList.forEach(server => {
        App.server[server.id] = App.cable.subscriptions.create(
          {
            channel: "ServerChannel",
            server_id: server.id,
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
            },
            channelAppeared: function(data) {
              return this.perform("channelAppeared", data);
            },
            channelDisappeared: function(data) {
              return this.perform("channelDisappeared", data);
            }
          }
        );
      });
    }
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
    const selected = history.location.pathname === "/servers" ? "selected" : "";

    const selectedServer = modalOpen ? "selected-server-green-icon" : "";

    let selectedGreen = modalOpen ? "selected-green" : "";

    return (
      // <div className="server-index-wrapper">
      <div className="server-index-container">
        <div className="server-margin-wrapper">
          <NavLink
            className="button-flex server-btn blue-btn"
            to={`/servers`}
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
      // </div>
    );
  }
}

export default ServerIndex;
