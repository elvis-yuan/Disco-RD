import React from "react";
import { Link, NavLink } from "react-router-dom";
import ServerIcon from "./server_icon";
import { openModal } from "../../actions/modal_actions";

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
          <ServerIcon server={server} key={index} />
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
          <a
            className={`btn-flex server-btn ${selectedGreen}`}
            onClick={() => dispatch(openModal("main"))}
          >
            <div className={`server-selector ${selectedServer}`} />
            <h3 className="server-icon">+</h3>
            <p className="server-btn-hover">Add a Server</p>
          </a>
          <div className="logout-seperator" />
          <a className="server-btn" onClick={this.props.logoutUser}>
            <div className="server-selector" />
            <i className="fas fa-sign-out-alt" />
            <p className="server-btn-hover">Logout</p>
          </a>
        </ul>
      </div>
    );
  }
}

export default ServerIndex;
