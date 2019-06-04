import React from "react";
import { Link, NavLink } from "react-router-dom";
import ServerIconContainer from "./server_icon_container";
import { openModal } from "../../../actions/modal_actions";

class ServerIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.props.servers.forEach(server => {
    //   App.cable.subscriptions.create(
    //     {
    //       channel: "ServerChannel",
    //       server_id: this.props.match.params.serverId
    //     },
    //     {
    //       received: data => {
    //         dispatch(receiveUser(data.user));
    //       },
    //       findUser: function(data) {
    //         return this.perform("findUser", data);
    //       }
    //     }
    //   );
    // });
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
