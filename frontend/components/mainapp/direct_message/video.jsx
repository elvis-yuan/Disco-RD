import React from "react";
import {
  broadcastData,
  JOIN_CALL,
  LEAVE_CALL,
  EXCHANGE,
  ice
} from "../../../util/video_util";

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = { joined: false };
    this.pcPeers = {};
    this.userId = this.props.user_id;
    this.joinCall = this.joinCall.bind(this);
    this.leaveCall = this.leaveCall.bind(this);
  }

  componentDidMount() {
    this.remoteVideoContainer = document.getElementById(
      "remote-video-container"
    );
    this.localVideo = document.getElementById("local-video");
    navigator.mediaDevices
      .getUserMedia({ audio: false, video: true })
      .then(stream => {
        this.localStream = stream;
        this.localVideo.srcObject = stream;
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentWillUnmount() {
    this.localStream.getTracks()[0].stop();
    if (App.video[this.userId]) {
      App.video[this.userId].unsubscribe();
      this.remoteVideoContainer.innerHTML = "";
      broadcastData({ type: LEAVE_CALL, from: this.userId });
    }
  }

  join(data) {
    this.createPC(data.from, true);
  }

  joinCall(e) {
    this.setState({ joined: true });
    App.video[this.userId] = App.cable.subscriptions.create(
      {
        channel: "CallChannel",
        channel_id: this.props.currentChannelId
      },
      {
        connected: () => {
          broadcastData({ type: JOIN_CALL, from: this.userId });
        },
        received: data => {
          console.log("RECEIVED: ", data);
          if (data.from === this.userId) return;
          switch (data.type) {
            case JOIN_CALL:
              return this.join(data);
            case EXCHANGE:
              if (data.to !== this.userId) return;
              return this.exchange(data);
            case LEAVE_CALL:
              return this.removeUser(data);
            default:
              return;
          }
        }
      }
    );
  }

  createPC(userId, offerBool) {
    const pc = new RTCPeerConnection(ice);
    this.pcPeers[userId] = pc;
    this.localStream
      .getTracks()
      .forEach(track => pc.addTrack(track, this.localStream));
    if (offerBool) {
      pc.createOffer().then(offer => {
        pc.setLocalDescription(offer).then(() => {
          setTimeout(() => {
            broadcastData({
              type: EXCHANGE,
              from: this.userId,
              to: userId,
              sdp: JSON.stringify(pc.localDescription)
            });
          }, 0);
        });
      });
    }
    pc.onicecandidate = e => {
      broadcastData({
        type: EXCHANGE,
        from: this.userId,
        to: userId,
        sdp: JSON.stringify(e.candidate)
      });
    };
    pc.ontrack = e => {
      const remoteVid = document.createElement("video");
      remoteVid.id = `remoteVideoContainer`;
      remoteVid.autoplay = "autoplay";
      remoteVid.srcObject = e.streams[0];
      this.remoteVideoContainer.appendChild(remoteVid);
    };
    pc.oniceconnectionstatechange = e => {
      if (pc.iceConnectionState === "disconnected") {
        broadcastData({ type: LEAVE_CALL, from: userId });
      }
    };
    return pc;
  }

  exchange(data) {
    let pc;
    if (this.pcPeers[data.from]) {
      pc = this.pcPeers[data.from];
    } else {
      pc = this.createPC(data.from, false);
    }
    if (data.candidate) {
      let candidate = JSON.parse(data.candidate);
      pc.addIceCandidate(new RTCIceCandidate(candidate));
    }
    if (data.sdp) {
      const sdp = JSON.parse(data.sdp);
      if (sdp && !sdp.candidate) {
        pc.setRemoteDescription(sdp).then(() => {
          if (sdp.type === "offer") {
            pc.createAnswer().then(answer => {
              pc.setLocalDescription(answer).then(() => {
                broadcastData({
                  type: EXCHANGE,
                  from: this.userId,
                  to: data.from,
                  sdp: JSON.stringify(pc.localDescription)
                });
              });
            });
          }
        });
      }
    }
  }

  leaveCall(e) {
    this.props.toggleVideo();
    const pcKeys = Object.keys(this.pcPeers);
    for (let i = 0; i < pcKeys.length; i++) {
      this.pcPeers[pcKeys[i]].close();
    }
    this.pcPeers = {};
    if (this.localVideo) {
      this.localVideo.srcObject.getTracks().forEach(function(track) {
        track.stop();
      });
    }

    if (this.localVideo) this.localVideo.srcObject = null;
    App.video[this.userId].unsubscribe();
    this.remoteVideoContainer.innerHTML = "";
    broadcastData({ type: LEAVE_CALL, from: this.userId });
  }

  removeUser(data) {
    let video = document.getElementById(`remoteVideoContainer`);
    video && this.props.toggleVideo();
    let peers = this.pcPeers;
    delete peers[data.from];
  }

  render() {
    return (
      <div className="video-chat-component">
        <div className="channel-heading-wrapper background-black">
          <div className="channel-heading-channel-title">
            <div className="channel-icon-wrapper">
              <div className="direct-message-at">
                <svg
                  x="0"
                  y="0"
                  name="Nova_At"
                  className="at-symbol"
                  aria-hidden="false"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 2C6.486 2 2 6.486 2 12C2 17.515 6.486 22 12 22C14.039 22 15.993 21.398 17.652 20.259L16.521 18.611C15.195 19.519 13.633 20 12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12V12.782C20 14.17 19.402 15 18.4 15L18.398 15.018C18.338 15.005 18.273 15 18.209 15H18C17.437 15 16.6 14.182 16.6 13.631V12C16.6 9.464 14.537 7.4 12 7.4C9.463 7.4 7.4 9.463 7.4 12C7.4 14.537 9.463 16.6 12 16.6C13.234 16.6 14.35 16.106 15.177 15.313C15.826 16.269 16.93 17 18 17L18.002 16.981C18.064 16.994 18.129 17 18.195 17H18.4C20.552 17 22 15.306 22 12.782V12C22 6.486 17.514 2 12 2ZM12 14.599C10.566 14.599 9.4 13.433 9.4 11.999C9.4 10.565 10.566 9.399 12 9.399C13.434 9.399 14.6 10.565 14.6 11.999C14.6 13.433 13.434 14.599 12 14.599Z"
                  />
                </svg>
              </div>
              <h2 className="channel-header-channel-title">
                {this.props.username}
              </h2>
            </div>
          </div>
        </div>
        <div className="video-chat-container">
          <div id="remote-video-container" />
          <video id="local-video" autoPlay />
        </div>
        <div className="video-button-container">
          {this.state.joined ? (
            <button className="leave-call-button" onClick={this.leaveCall}>
              Leave Call
            </button>
          ) : (
            <button
              className="leave-call-button join-call-button"
              onClick={this.joinCall}
            >
              Join Call
            </button>
          )}
        </div>
      </div>
    );
  }
}
export default Video;
