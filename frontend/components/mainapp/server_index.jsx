import React from "react";

class ServerIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { currentUser, fetchAllServers } = this.props;
    fetchAllServers(currentUser.id);
  }

  render() {
    const { servers } = this.props;
    const serverList = servers ? (
      servers.map((server, index) => (
        <li className="server-text" key={index}>
          {server.title}
        </li>
      ))
    ) : (
      <p>hello</p>
    );

    return (
      <div className="server-index-container">
        <ul>{serverList}</ul>
      </div>
    );
  }
}

export default ServerIndex;
