import React from "react";
import { Link, NavLink } from "react-router-dom";
import ServerIcon from "./server_icon";

class ServerIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   const { currentUser, fetchAllServers } = this.props;
  //   fetchAllServers(currentUser.id);
  // }

  render() {
    const { servers } = this.props;
    const serverList = servers
      ? servers.map((server, index) => (
          <NavLink
            key={index}
            className="button-flex server-btn blue-btn"
            to={`/servers/${server.id}`}
          >
            <div className="sever-selector" />
            <h3 className="server-icon-text">
              {server.title.slice(0, 1).toLowerCase()}
            </h3>
            <p>{server.title}</p>
          </NavLink>
        ))
      : null;

    return (
      <div className="server-index-container">
        <ul className="server-ul">
          {serverList}
          <button className="server-btn">
            <h3 className="server-icon">+</h3>
            <p>Add a Server</p>
          </button>
        </ul>
      </div>
    );
  }
}

export default ServerIndex;
