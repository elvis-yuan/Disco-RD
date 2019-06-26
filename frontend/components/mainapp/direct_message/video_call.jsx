import React from "react";

class VideoCall extends React.Component {
  constructor(props) {
    super(props);
    this.handleJoin = this.handleJoin.bind(this);
    this.handleDecline = this.handleDecline.bind(this);
  }

  handleJoin() {
    const { history, videoCall, closeModal } = this.props;
    if (history.location.pathname !== `/servers/@me/${videoCall.channel_id}`)
      history.push(`/servers/@me/${videoCall.channel_id}`);
    document.getElementsByClassName("video-icon")[0].click();
    closeModal();
  }

  handleDecline() {
    this.props.closeModal();
  }

  render() {
    const { username } = this.props.videoCall;
    return (
      <div className="video-call-modal-container">
        <img
          src="https://discordapp.com/assets/0e291f67c9274a1abdddeb3fd919cbaa.png"
          alt=""
          className="video-caller-img"
        />
        <div className="video-call-modal-header">{username}</div>
        <div className="video-call-text">incoming video call</div>
        <div className="video-call-modal-buttons">
          <span onClick={this.handleJoin} className="video-call-modal-join">
            Join Call
          </span>
          <span
            onClick={this.handleDecline}
            className="video-call-modal-decline"
          >
            Decline
          </span>
        </div>
      </div>
    );
  }
}

export default VideoCall;
