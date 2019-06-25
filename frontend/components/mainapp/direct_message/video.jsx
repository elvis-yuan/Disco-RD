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
    App.video[this.userId].unsubscribe();
    this.remoteVideoContainer.innerHTML = "";
    broadcastData({ type: LEAVE_CALL, from: this.userId });
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
        <div className="video-chat-container">
          <div id="remote-video-container" />
          <video id="local-video" autoPlay />
        </div>
        {this.state.joined ? (
          <button onClick={this.leaveCall}>Leave Call</button>
        ) : (
          <button onClick={this.joinCall}>Join Call</button>
        )}
      </div>
    );
  }
}
export default Video;
