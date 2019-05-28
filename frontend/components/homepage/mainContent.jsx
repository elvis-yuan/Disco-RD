import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../actions/session_actions";

const msp = ({ entities, session }) => ({
  currentUser: entities.users[session.id]
});

const mdp = dispatch => ({
  signin: user => dispatch(loginUser(user))
});

class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const user = { username: "DemoUser", password: "Password" };
    this.props.signin(user).then(() => this.props.history.push("/servers"));
  }

  render() {
    const button = this.props.currentUser ? (
      <Link to="/servers" className="signup-button fade-in">
        Open
      </Link>
    ) : (
      <Link to="/signup" className="signup-button fade-in">
        Signup
      </Link>
    );

    return (
      <section className="main-body">
        <div className="head-component">
          <h1>It's time to ditch Discord and Kaos.</h1>
          <p>Text chat app for all users with no fees or hassle</p>
          <div className="buttons">
            {button}
            <span onClick={this.handleClick} className="login fade-in">
              Demo
            </span>
          </div>
        </div>
        <div className="animated-section">
          <div className="shadow" />
          <img
            src="https://discordapp.com/assets/0a2fd7b3bab977b4619f466b81b426d4.svg"
            className="triangle1 ease-in opac"
          />
          <img
            src="https://discordapp.com/assets/0a2fd7b3bab977b4619f466b81b426d4.svg"
            className="triangle2 ease-in opac"
          />
          <img
            src="https://discordapp.com/assets/173ee5a6d2f1b6a19190465c41371a3b.svg"
            className="square1 ease-in opac"
          />
          <img
            src="https://discordapp.com/assets/173ee5a6d2f1b6a19190465c41371a3b.svg"
            className="square2 ease-in opac"
          />
          <img
            src="https://discordapp.com/assets/173ee5a6d2f1b6a19190465c41371a3b.svg"
            className="square3 ease-in opac"
          />
          <img
            src="https://discordapp.com/assets/a14c5b02487874dca7fae0481ef90dbb.svg"
            className="ex1 ease-in opac"
          />
          <img
            src="https://discordapp.com/assets/a14c5b02487874dca7fae0481ef90dbb.svg"
            className="ex2 ease-in opac"
          />
          <img
            src="https://discordapp.com/assets/f877364ca453abc089cf7fe8d22c9c3f.svg"
            className="dot1 ease-in opac"
          />
          <img
            src="https://discordapp.com/assets/f877364ca453abc089cf7fe8d22c9c3f.svg"
            className="dot2 ease-in opac"
          />
          <img
            src="https://discordapp.com/assets/f877364ca453abc089cf7fe8d22c9c3f.svg"
            className="dot3 ease-in opac"
          />
          <img
            src="https://discordapp.com/assets/f877364ca453abc089cf7fe8d22c9c3f.svg"
            className="dot4 ease-in opac"
          />
          <img
            src="https://discordapp.com/assets/f877364ca453abc089cf7fe8d22c9c3f.svg"
            className="dot5 ease-in opac"
          />
          <img
            src="https://discordapp.com/assets/afdfaaeb6d6639e24086ced7aa07975d.svg"
            className="circle1 ease-in opac"
          />
          <img
            src="https://discordapp.com/assets/afdfaaeb6d6639e24086ced7aa07975d.svg"
            className="circle2 ease-in opac"
          />
          <img
            src="https://discordapp.com/assets/afdfaaeb6d6639e24086ced7aa07975d.svg"
            className="circle3 ease-in opac"
          />
          <img
            src="https://discordapp.com/assets/81d74b2ebb053fbccee41865a47d48c3.svg"
            className="mystery-box ease-in"
          />
          <img
            src="https://discordapp.com/assets/eb301f28da3199edbd3ef19690d61674.svg"
            className="bomb ease-in float-2"
          />
          <img
            src="https://discordapp.com/assets/215346366a9a7d50924fc245ddb048d2.svg"
            className="game float-1"
          />
          <img
            src="https://discordapp.com/assets/9e05338bd66e0985fceb83317cb94b9c.svg"
            className="coin1 float-1"
          />
          <img
            src="https://discordapp.com/assets/9e05338bd66e0985fceb83317cb94b9c.svg"
            className="coin2 float-1"
          />
          <img
            src="https://discordapp.com/assets/15149ecb9d5cd8faa24e1bbf45d70e5b.svg"
            className="shield ease-in"
          />
          <img
            src="https://discordapp.com/assets/0b5a0339571e72656eea93eb55d73eae.svg"
            className="potion ease-in"
          />
          <img
            src="https://discordapp.com/assets/0d82411c439e3558f8b2f6fb12eccbc1.svg"
            className="monitor ease-in"
          />
          <img
            src="https://discordapp.com/assets/7edaed9d86e1b5dd9d4c98484372222b.svg"
            className="laptop ease-in"
          />
          <img
            src="https://discordapp.com/assets/69db64955960eb333f5ff831cc1c0294.svg"
            className="headphones"
          />
          <img
            src="https://discordapp.com/assets/c4bae281354a2b4e2db85415955e0994.svg"
            className="controller ease-in"
          />
          <img
            src="https://discordapp.com/assets/82fa4f388cfc9cf47a6972ae39ae90de.svg"
            className="iphone ease-in"
          />
          <img
            src="https://discordapp.com/assets/5a31f41848bf3ba1817a092ac28c623d.svg"
            className="android ease-in"
          />
        </div>
      </section>
    );
  }
}

export default withRouter(
  connect(
    msp,
    mdp
  )(MainContent)
);
