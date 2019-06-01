import React from "react";
import { Link, NavLink } from "react-router-dom";
import ServerIconContainer from "./server_icon_container";
import { openModal } from "../../../actions/modal_actions";

class ServerIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   const { currentUser, fetchAllServers } = this.props;
  //   fetchAllServers(currentUser.id);
  // }

  render() {
    const { servers, modalOpen, history } = this.props;
    const serverList = servers
      ? servers.map((server, index) => (
          <ServerIconContainer server={server} key={index} />
        ))
      : null;
    const selected = history.location.pathname === "/servers" ? "selected" : "";

    const selectedServer = modalOpen ? "selected-server-green-icon" : "";

    let selectedGreen = modalOpen ? "selected-green" : "";

    return (
      <div className="server-index-container">
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
        <div className="server-seperator" />
        <ul className="server-ul">
          {serverList}
          <div className="server-icon-wrapper">
            <a
              className={`btn-flex server-btn ${selectedGreen}`}
              onClick={() => dispatch(openModal("main"))}
            >
              <div className={`server-selector ${selectedServer}`} />
              <h3 className="server-icon">+</h3>
            </a>
            <p className="server-btn-hover">Add a Server</p>
          </div>
          <div className="logout-seperator" />
          <div className="server-icon-wrapper">
            <a className="server-btn" onClick={this.props.logoutUser}>
              <div className="server-selector" />
              <i className="fas fa-sign-out-alt" />
            </a>
            <p className="server-btn-hover">Logout</p>
          </div>
        </ul>
      </div>
    );
  }
}

export default ServerIndex;