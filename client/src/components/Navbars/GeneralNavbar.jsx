import React from "react";
// reactstrap components

import { Navbar, Container } from "reactstrap";

const GeneralNavbar = (props) => {
  return (
    <>
      <Navbar expand="md" id="navbar-main">
        <Container>
          <h2>
            {props.brandText}
          </h2>

        </Container>
      </Navbar>
    </>
  );
};

export default GeneralNavbar;