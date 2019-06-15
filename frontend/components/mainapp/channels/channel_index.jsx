import React from "react";
import { NavLink } from "react-router-dom";
import ChannelListItemContainer from "./channel_list_item_container";
import DropDownMenuContainer from "./drop_down_menu_container";

class ChannelIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentServer: this.props.match.params.serverId,
      dropDownOpen: false
    };
    this.dropDownAnimation = this.dropDownAnimation.bind(this);
    this.deleteServer = this.deleteServer.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.closeDropDown = this.closeDropDown.bind(this);
  }

  componentDidMount() {
    this.props.fetchServer(parseInt(this.props.match.params.serverId));
  }

  componentDidUpdate(prevProps) {
    const { history, servers, match } = this.props;
    const path = history.location.pathname.split("/");
    if (prevProps.match.params.serverId !== match.params.serverId) {
      this.setState({ dropDownOpen: false });
      this.props.fetchServer(parseInt(this.props.match.params.serverId));
    }
    // debugger;
    // if (
    //   (path[3] === "" || path[3] === undefined) &&
    //   // match.params.channelId !== prevProps.match.params.channelId &&
    //   servers[match.params.serverId].channel_ids.length > 0
    // ) {
    //   debugger;
    //   const channels = servers[match.params.serverId].channel_ids.sort();
    //   const firstChannel = channels[0];
    //   history.push(`/servers/${match.params.serverId}/${firstChannel}`);
    // }
  }

  handleOpenModal() {
    this.setState({ dropDownOpen: false });
    this.props.editServer;
  }

  dropDownAnimation() {
    const newState = this.state.dropDownOpen === false ? true : false;
    this.setState({ dropDownOpen: newState });
  }

  closeDropDown() {
    this.setState({ dropDownOpen: false });
  }

  deleteServer() {
    this.props.history.push("/servers");
    this.props.deleteServer(parseInt(this.props.match.params.serverId));
  }

  render() {
    const currentServer = this.props.servers[
      parseInt(this.props.match.params.serverId)
    ];

    const serverTitle = currentServer.title;

    const dropDownOpen = this.state.dropDownOpen ? "drop-down-open" : "";

    const dropDownMenu = this.state.dropDownOpen ? (
      <DropDownMenuContainer
        handleOpenModal={this.handleOpenMdal}
        currentServer={currentServer}
        deleteServer={this.deleteServer}
        closeDropDown={this.closeDropDown}
        currentUser={this.props.currentUser}
      />
    ) : null;

    let { channels } = this.props;

    let channelNames = Object.values(
      currentServer.channel_ids.sort().map(id => channels[id])
    );
    let channelTitles = !channelNames.includes(undefined)
      ? channelNames.map((channel, index) => (
          <ChannelListItemContainer
            channel={channel}
            match={this.props.match}
            key={index}
          />
        ))
      : null;

    return (
      <div className="channel-index-container">
        <div className="channel-name-links">
          <div className="channel-container-server-information">
            {dropDownMenu}
            <div
              className="channel-container-server-dropdown"
              onClick={this.dropDownAnimation}
            >
              <div className="channel-container-server-name-header">
                <span className="channel-container-server-name">
                  {serverTitle}
                </span>
                <svg
                  width="18"
                  height="18"
                  className={`drop-down-button ${dropDownOpen}`}
                >
                  <g fill="none" fillRule="evenodd">
                    <path d="M0 0h18v18H0" />
                    <path
                      stroke="#FFF"
                      d="M4.5 4.5l9 9"
                      strokeLinecap="round"
                    />
                    <path
                      stroke="#FFF"
                      d="M13.5 4.5l-9 9"
                      strokeLinecap="round"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="channel-list-container-scroll">
          <div className="channel-text-channel-catagory">
            <div className="channel-text-channel">
              text channels
              <svg
                onClick={this.props.createModal}
                className="add-button-icon"
                aria-hidden="false"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <polygon
                  fillRule="nonzero"
                  fill="#ffffff"
                  points="15 10 10 10 10 15 8 15 8 10 3 10 3 8 8 8 8 3 10 3 10 8 15 8"
                />
              </svg>
              <p className="plus-icon-hover">Create Channel</p>
            </div>
          </div>
          <div className="channel-list-container">{channelTitles}</div>
        </div>
        <div className="channel-container-user-information">
          <div className="channel-container-user-icon-container">
            <div className="channel-container-user-icon" />
          </div>
          <div className="channel-username-container">
            <div className="channel-container-user-username">
              {this.props.currentUser.username}
            </div>
          </div>
          <div className="channel-button-container">
            <div className="mute-button channel-communication-buttons" />
            <div className="defen-button channel-communication-buttons" />
          </div>
        </div>
      </div>
    );
  }
}

export default ChannelIndex;
