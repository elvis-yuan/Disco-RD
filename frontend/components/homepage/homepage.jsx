import React from "react";
import Navbar from "./navbar";
import MainContent from "./mainContent";
import Footer from "./footer";
import NavbarContainer from "./navbar_container";

class Homepage extends React.Component {
  render() {
    return (
      <>
        <NavbarContainer />
        <MainContent />
        <Footer />
      </>
    );
  }
}

export default Homepage;
