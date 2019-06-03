import React from "react";
import { NavLink } from "react-router-dom";
import ChannelListItem from "./channel_list_item";
import { openModal } from "../../../actions/modal_actions";

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
  }

  componentDidMount() {
    this.props.fetchAllChannels(parseInt(this.props.match.params.serverId));
  }

  // componentDidUpdate() {
  //   if (this.state.currentServer !== this.props.match.params.serverId) {
  //     this.setState({ dropDownOpen: false });
  //   }
  // }
  componentDidUpdate() {}

  handleOpenModal() {
    this.setState({ dropDownOpen: false });
    dispatch(openModal("editServer"));
  }

  dropDownAnimation() {
    const newState = this.state.dropDownOpen === false ? true : false;
    this.setState({ dropDownOpen: newState });
  }

  deleteServer() {
    this.props.history.push("/servers");
    this.props.deleteServer(parseInt(this.props.match.params.serverId));
  }

  render() {
    // debugger;
    const currentServer = this.props.servers[
      parseInt(this.props.match.params.serverId)
    ];

    const serverTitle = currentServer.title;

    const dropDownOpen = this.state.dropDownOpen ? "drop-down-open" : "";

    const dropDownMenu = this.state.dropDownOpen ? (
      <div className="drop-down-menu-wrapper">
        <div className="drop-down-menu">
          <h1>Server Invitation Code</h1>
          <input
            type="text"
            className="invitation-code"
            value={currentServer.invitation_code}
            disabled
          />
          <div className="px-margin-wrapper">
            <div className="edit-server-button" onClick={this.handleOpenModal}>
              {" "}
              Edit Server{" "}
            </div>
          </div>

          {/* <div
            className="delete-server-button-wrapper"
            onClick={this.deleteServer}
          >
            <span className="delete-server-button">Delete Server</span>
          </div> */}
        </div>
      </div>
    ) : null;

    const { channels } = this.props;

    const channelNames = Object.values(
      currentServer.channel_ids.map(id => channels[id])
    );

    const channelTitles = !channelNames.includes(undefined)
      ? channelNames.map((channel, index) => (
          <ChannelListItem
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
              text channels{" "}
              <svg
                onClick={() => dispatch(openModal("createChannel"))}
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
          <div className="channel-conainner-user-information">
            <div className="channel-container-user-username">
              {this.props.currentUser.username}
            </div>
          </div>
          <div>buttons</div>
        </div>
      </div>
    );
  }
}

export default ChannelIndex;
