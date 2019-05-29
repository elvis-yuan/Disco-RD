import React from "react";
import { Link } from "react-router-dom";
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
          <button
            onClick={() => this.props.history.push(`/servers/${server.id}`)}
            key={index}
            className="button-flex server-btn blue-btn"
          >
            <h3 className="server-icon-text">
              {server.title.slice(0, 1).toLowerCase()}
            </h3>
            <p>{server.title}</p>
          </button>
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
