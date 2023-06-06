import React from "react";
// reactstrap components

import { Navbar, Container } from "reactstrap";

const GeneralNavbar = (props) => {
  return (
    <>
      <Navbar expand="md" id="navbar-main">
        <Container fluid>
          <h2>
            {props.brandText}
          </h2>
        </Container>
        <div className="navbar-texture"></div>
      </Navbar>
    </>
  );
};

export default GeneralNavbar;