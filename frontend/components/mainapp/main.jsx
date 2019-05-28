import React from "react";
import ServerIndexContainer from "./server_index_container";
import { Router } from "react-router-dom";

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ServerIndexContainer />
      </div>
    );
  }
}

export default Main;
