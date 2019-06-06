import React from "react";
import ServerUserListItem from "./server_user_list_item";

class ServerConnectedUsers extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const users = this.props.servers.connected_user_ids
      .sort()
      .map(user_id => (
        <ServerUserListItem
          key={user_id}
          username={this.props.users[user_id].username}
        />
      ));

    return (
      <div className="server-users-container">
        <div className="server-users-scroller">
          <div className="server-users-wrapper">
            <div className="server-users-member-section">Users</div>
            {users}
          </div>
        </div>
      </div>
    );
  }
}

export default ServerConnectedUsers;
